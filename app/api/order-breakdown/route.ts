/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { apiPostCall } from '../utility';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { data, status } = await apiPostCall('http://olojaa-testing-489e280a2994.herokuapp.com/api/v1/business/order-breakdown', body);
    return NextResponse.json(data, { status });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
  

}