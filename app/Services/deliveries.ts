import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Order } from "../Types/Interfaces/IOrders";
import { IDeliveryManagement } from "../Types/Interfaces/IDeliveries";


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

      getDeliveryManagement: builder.query<ApiResponse<IDeliveryManagement>, void>({
        query: () => '/business/delivery-breakdown',
      })
  
    }),
});

export const {useGetDeliveriesQuery, useGetDeliveryManagementQuery} = deliveriesApi
