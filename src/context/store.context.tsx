import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../stores/auth.store';

export interface IStoreContext {
  authStore: AuthStore;
}

const StoreContext = createContext<IStoreContext | undefined>(undefined);

export function StoreContextProvider({ children }: { children: ReactNode }) {
  const [authStore] = useState(() => new AuthStore(new AuthService()));

  const ctxValue = useMemo(() => ({ authStore }), [authStore]);

  return (
    <StoreContext.Provider value={ctxValue}>{children}</StoreContext.Provider>
  );
}

export function useStoreContextValue() {
  const ctx = useContext(StoreContext);

  if (ctx == undefined)
    throw new Error(
      'useStoreContextValue must be called inside StoreContextProvider with a value'
    );

  return ctx;
}
