/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';

export async function apiPostCall(url: string, body: any) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('authToken')?.value;

  if (!token) {
    throw new Error('Unauthorized');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); 

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    return { data, status: response.status };
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}