import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const HEROKU_BASE_URL = process.env.HEROKU_BASE_URL;

async function proxyRequest(req: NextRequest, context: { params: Promise<{ path: string[] }> }, method: string) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;
  const herokuPath = params.path.join('/');
  const queryString = req.nextUrl.searchParams.toString();
  const targetUrl = `${HEROKU_BASE_URL}/${herokuPath}${queryString ? `?${queryString}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const body = ['POST', 'PUT', 'PATCH'].includes(method) ? await req.text() : undefined;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json' },
    });
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      return NextResponse.json({ status: false, message: 'Request timeout' }, { status: 408 });
    }
    return NextResponse.json({ status: false, message: 'Internal server error' }, { status: 500 });
  }
}

// Handle GET
export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, context, 'GET');
}

// Handle POST
export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, context, 'POST');
}

// Handle PUT
export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, context, 'PUT');
}

// Handle PATCH
export async function PATCH(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, context, 'PATCH');
}

// Handle DELETE
export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, context, 'DELETE');
}