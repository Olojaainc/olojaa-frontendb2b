import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from '../Services/orders';
import { transactionsApi } from '../Services/transaction';
import { deliveriesApi } from '../Services/deliveries';

export const Store = () =>
  configureStore({
    reducer: {
      [ordersApi.reducerPath]: ordersApi.reducer,
      [transactionsApi.reducerPath]: transactionsApi.reducer,
      [deliveriesApi.reducerPath]: deliveriesApi.reducer
    },
    middleware: (gDM) => gDM().concat(...[ordersApi.middleware, transactionsApi.middleware, deliveriesApi.middleware]),
  });

export type RootState = ReturnType<ReturnType<typeof Store>['getState']>;
export type AppDispatch = ReturnType<typeof Store>['dispatch'];