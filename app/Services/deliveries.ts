import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Order } from "../Types/Interfaces/IOrders";


export const deliveriesApi = createApi({
    reducerPath: 'deliveriesApi',
    baseQuery: fetchBaseQuery({
      baseUrl: '/api/proxy',
      credentials: 'include', 
    }),
    endpoints: (builder) => ({
  
      getDeliveries: builder.query<ApiResponse<Order[]>, void>({
        query: () => '/business/deliveries',
      }),

  
    }),
});

export const {useGetDeliveriesQuery} = deliveriesApi
