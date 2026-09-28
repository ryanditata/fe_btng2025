import { useAuthAdministrator } from "@/hooks/api/administrator.ts/useAuthAdministrator";
import { useClasses } from "@/hooks/api/administrator.ts/useClasses";
import React, { createContext, useContext } from "react";

type GlobalDataContextType = {
  auth: ReturnType<typeof useAuthAdministrator>;
  classes: ReturnType<typeof useClasses>;
};

const GlobalDataAdministratorContext = createContext<GlobalDataContextType | null>(null);

export const GlobalDataAdministratorProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthAdministrator();
  const classes = useClasses();

  return (
    <GlobalDataAdministratorContext.Provider value={{ auth, classes }}>
      {children}
    </GlobalDataAdministratorContext.Provider>
  );
};

export const useDataAdministrator = () => {
  const ctx = useContext(GlobalDataAdministratorContext);
  if (!ctx) {
    throw new Error("useDataAdministrator must be used within GlobalDataProvider");
  }
  return ctx;
};
