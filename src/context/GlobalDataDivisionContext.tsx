import React, { createContext, useContext } from "react";
import { useAuthDivision } from "@/hooks/api/division/useAuthDivisi";
import { useDataDivisi } from "@/hooks/api/division/useDataDivisi";

type GlobalDataContextType = {
  auth: ReturnType<typeof useAuthDivision>;
  division: ReturnType<typeof useDataDivisi>;
};

const GlobalDataDivisionContext = createContext<GlobalDataContextType | null>(null);

export const GlobalDataDivisionProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthDivision();
  const division = useDataDivisi(
    !auth.loading && auth.user?.id_divisi_managed ? auth.user.id_divisi_managed : null
  );

  return (
    <GlobalDataDivisionContext.Provider value={{ auth, division }}>
      {children}
    </GlobalDataDivisionContext.Provider>
  );
};

export const useDataDivision = () => {
  const ctx = useContext(GlobalDataDivisionContext);
  if (!ctx) {
    throw new Error("useDataDivision must be used within GlobalDataProvider");
  }
  return ctx;
};
