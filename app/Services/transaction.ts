import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../Types/Interfaces/IOrders";
import { ITransaction } from "../Types/Interfaces/ITransactions";


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

  
    }),
});

export const {useGetTransactionsQuery} = transactionsApi
