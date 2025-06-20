import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../Types/Interfaces/IOrders";
import { IDispute, IDisputePayload, IDisputeTypes, ITransaction, ITransactionBreakdown } from "../Types/Interfaces/ITransactions";


export const transactionsApi = createApi({
    reducerPath: 'transactionsApi',
    baseQuery: fetchBaseQuery({
      baseUrl: '/api/proxy',
      credentials: 'include', 
    }),
    endpoints: (builder) => ({
  
      getTransactions: builder.query<ApiResponse<ITransaction[]>, void>({
        query: () => '/transactions',
      }),

       getTransactionsBreakdown: builder.query<ApiResponse<ITransactionBreakdown>, void>({
        query: () => 'business/transaction-breakdown',
      }),

      getDisputeTypes: builder.query<ApiResponse<IDisputeTypes[]>, void>({
        query: () => 'business/dispute-types'
      }),

      createDispute: builder.mutation<ApiResponse<IDispute>, {disputePayload:IDisputePayload}>({
          query: ({disputePayload}) => ({
            url: 'business/create-dispute',
            method: 'POST',
            body: disputePayload
          })
      })
    }),
});

export const {useGetTransactionsQuery,useGetDisputeTypesQuery, 
  useCreateDisputeMutation, useGetTransactionsBreakdownQuery} = transactionsApi
