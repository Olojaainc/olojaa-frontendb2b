'use client';

import { Provider } from 'react-redux';
import { Store } from '../Store';


const store = Store();

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}