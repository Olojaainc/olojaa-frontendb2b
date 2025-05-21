/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ApiErrorResponse } from '../Types/Interfaces/IOrders';

export interface ApiResponse<T> {
  data: T | null;
  status: number;
  message?: string;
}

export function useApiPost<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse>()
  const [data, setData] = useState<T | null>(null);

  const postApi = async (url: string, payload: any): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json?.message || 'An error occurred');
      } else {
        setData(json.data);
      }
      return { data: json.data, status: response.status, message: json.message };
    } catch (err: any) {
      setError(err.message || 'Network error');
      return { data: null, status: 500, message: err.message || 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, postApi };
}