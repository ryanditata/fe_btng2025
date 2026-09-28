import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/api/participant/useAuth";
import { useUsers } from "../hooks/api/participant/useUsers";
import { useDivisions } from "../hooks/api/participant/useDivision";

type GlobalDataContextType = {
  auth: ReturnType<typeof useAuth>;
  users: ReturnType<typeof useUsers>;
  divisions: ReturnType<typeof useDivisions>;
};

const GlobalDataPesertaContext = createContext<GlobalDataContextType | null>(null);

export const GlobalDataPesertaProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const users = useUsers();
  const divisions = useDivisions();

  return (
    <GlobalDataPesertaContext.Provider value={{ auth, users, divisions }}>
      {children}
    </GlobalDataPesertaContext.Provider>
  );
};

export const useDataPeserta = () => {
  const ctx = useContext(GlobalDataPesertaContext);
  if (!ctx) {
    throw new Error("useDataPeserta must be used within GlobalDataProvider");
  }
  return ctx;
};
