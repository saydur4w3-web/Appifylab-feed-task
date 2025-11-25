import { createContext, useContext, type ReactNode } from "react";


export function createCtx<T>(errorMessage: string) {

  const Context = createContext<T|null>(null);

  const useCtx = () => {
    const ctx = useContext(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };


  const Provider = ({ children, value }: { children: ReactNode; value: T }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return {
    Provider, 
    useCtx
  };
}
