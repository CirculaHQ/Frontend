import { ReactNode, createContext, useContext, useState } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  userId: number;
  setUserId: (state: any) => void;
};

const theGlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(theGlobalContext);
}

export function GlobalContextProvider({ children }: GlobalProviderProps) {
  // Define actions here
  const [userId, setUserId] = useState<number>(1);

  return (
    <theGlobalContext.Provider value={{ setUserId, userId }}>
      {children}
    </theGlobalContext.Provider>
  );
}