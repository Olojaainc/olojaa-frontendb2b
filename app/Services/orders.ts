import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, ApiResponse, IOrderManagement, IOrderBreakdown, IOrderDetails } from '../Types/Interfaces/IOrders';

export const ordersApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/proxy',
    credentials: 'include', 
  }),
  endpoints: (builder) => ({

    getOrders: builder.query<ApiResponse<Order[]>, { per_page?: number; order_status?: string; delivery_start_date?: string; delivery_end_date?: string } | undefined>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        if (params.per_page) searchParams.append('per_page', params.per_page.toString());
        if (params.order_status) searchParams.append('order_status', params.order_status);
        if (params.delivery_start_date) searchParams.append('delivery_start_date', params.delivery_start_date);
        if (params.delivery_end_date) searchParams.append('delivery_end_date', params.delivery_end_date);
        
        const queryString = searchParams.toString();
        return `business/orders${queryString ? `?${queryString}` : ''}`;
      },
    }),

    getOrderManagement: builder.query<ApiResponse<IOrderManagement>, void>({
      query: () => 'business/order-management'
    }),

    getOrderBreakdown: builder.mutation<ApiResponse<IOrderBreakdown>, { gas_type_id: number; quantity: number }>({
      query: (payload) => ({
        url: 'business/order-breakdown',
        method: 'POST',
        body: payload
      })
    }),
    createOrder: builder.mutation<ApiResponse<{ authorization_url: string; access_code: string; reference: string }>, IOrderDetails>({
      query: (orderDetails) => ({
        url: 'business/create-order',
        method: 'POST',
        body: orderDetails,
      }),
    }),

  }),
});

export const { useGetOrdersQuery, useGetOrderManagementQuery, useGetOrderBreakdownMutation, useCreateOrderMutation } = ordersApi;