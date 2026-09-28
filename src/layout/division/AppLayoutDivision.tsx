import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { Navigate, Outlet } from "react-router";
import AppHeader from "./AppHeaderDivision";
import AppSidebar from "./AppSidebarDivision";
import { GlobalDataDivisionProvider, useDataDivision } from "@/context/GlobalDataDivisionContext";

const LayoutContentDivision: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const {auth} = useDataDivision();

  if (auth.loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>;
  }


  if (!auth.isAuthenticated) {
    return <Navigate to="/login/divisi" replace />;
  }

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayoutDivision: React.FC = () => {
  return (
    <GlobalDataDivisionProvider>
      <SidebarProvider>
        <LayoutContentDivision />
      </SidebarProvider>
    </GlobalDataDivisionProvider>
  );
};

export default AppLayoutDivision;
