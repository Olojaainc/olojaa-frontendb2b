import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../Types/Interfaces/IOrders";
import { IDispute, IDisputePayload, IDisputeTypes, ITransaction, ITransactionBreakdown, TransactionFilterType } from "../Types/Interfaces/ITransactions";


export const transactionsApi = createApi({
    reducerPath: 'transactionsApi',
    baseQuery: fetchBaseQuery({
      baseUrl: '/api/proxy',
      credentials: 'include', 
    }),
    endpoints: (builder) => ({
  
      getTransactions: builder.query<ApiResponse<ITransaction[]>, { 
        filter?: TransactionFilterType
        from?: string; 
        to?: string; 
      }>({
        query: ({ filter, from, to } = {}) => {
          const params = new URLSearchParams();
          if (filter) {
            params.append('filter', filter);
            if (filter === 'date_range' && from && to) {
              params.append('from', from);
              params.append('to', to);
            }
          }
          return `/transactions${params.toString() ? `?${params.toString()}` : ''}`;
        },
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
