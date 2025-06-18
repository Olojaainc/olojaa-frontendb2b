import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, ApiResponse, IOrderManagement } from '../Types/Interfaces/IOrders';

export const ordersApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/proxy',
    credentials: 'include', 
  }),
  endpoints: (builder) => ({

    getOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => 'business/orders',
    }),

    getOrderManagement: builder.query<ApiResponse<IOrderManagement>, void>({
      query: () => 'business/order-management'
    })

  }),
});

export const { useGetOrdersQuery, useGetOrderManagementQuery } = ordersApi;