import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { Navigate, Outlet } from "react-router";
import AppSidebar from "./AppSidebarParticipant";
import AppHeaderParticipant from "./AppHeaderParticipant";
import { GlobalDataPesertaProvider, useDataPeserta } from "@/context/GlobalDataPesertaContext";

const LayoutContentParticipant: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { auth } = useDataPeserta();

  if (auth.loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/signin/participant" replace />;
  }

  return (
    <div className="min-h-screen xl:flex font-family-inter">
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[250px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <div className="lg:hidden">
          <AppHeaderParticipant />
        </div>
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayoutParticipant: React.FC = () => {
  return (
    <GlobalDataPesertaProvider>
      <SidebarProvider>
        <LayoutContentParticipant />
      </SidebarProvider>
    </GlobalDataPesertaProvider>
  );
};

export default AppLayoutParticipant;
