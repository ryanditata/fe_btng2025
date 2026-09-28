import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation} from "react-router";
import { useNavigate } from "react-router-dom";

// Assume these icons are imported from an icon library
import {
  CalenderIcon,
  GridIcon,
  UserCircleIcon,

} from "../../icons";

import { Info, LogOut, MegaphoneIcon, Smartphone } from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";
import { useUserActions } from "../../hooks/api/participant/useUserAction";
import Modal from "@/_mock/modal";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Beranda",
    path: "/participant/dashboard",
  },
  {
    icon: <CalenderIcon />,
    name: "Kelas",
    path: "/participant/class",
  },
  {
    icon: <MegaphoneIcon />,
    name: "Pengumuman",
    path: "/participant/announcement",
  },
  {
    icon: <UserCircleIcon />,
    name: "Profile",
    path: "/participant/profile",
  },
  {
    icon: <LogOut />,
    name: "Keluar",
    path: "/participant/logout",
  }
];

const AppSidebarParticipant: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsMobileOpen } = useSidebar();
  const location = useLocation();
  const { logOut } = useUserActions();
  const [modalLogoutOpen, setModalLogoutOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);


  const isActive = useCallback(
    (path: string) => location.pathname.includes(path),
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main"].forEach((_) => {
      navItems.forEach((nav) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        if (isMobileOpen) {
          setIsMobileOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location, isActive, isMobileOpen, setIsMobileOpen]);

  const { resetSidebar } = useSidebar();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logOut();
    // hapus token user
    localStorage.removeItem("token");

    // reset sidebar biar langsung collapse/hide
    resetSidebar();

    // redirect ke login tanpa refresh
    navigate("/signin/participant");
  };

  const renderMenuItems = (items: NavItem[], _: "main" | "others") => (
    <ul className="flex flex-col gap-4 text-sm">
      {items.map((nav) => {
        if (nav.name == "Keluar") {
          return (
            <li key={nav.name}>
              {(
                nav.path && (
                  <p onClick={() => setModalLogoutOpen(true)}
                    className={`flex items-center gap-4 p-3 rounded-lg font-semibold ${isActive(nav.path) ? "bg-btng-green text-btng-black" : "menu-item-inactive hover:bg-white/20"
                      }`}
                  >
                    <span
                      className={`menu-item-icon-size ${isActive(nav.path)
                        ? "text-btng-black"
                        : "text-white"
                        }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className={
                        isActive(nav.path) ? "text-btng-black" : "text-white"
                      }>{nav.name}</span>
                    )}
                  </p>
                )
              )}
            </li>
          )
        }
        return (
          <li key={nav.name}>
            {(
              nav.path && (
                <Link
                  to={nav.path}
                  className={`flex items-center gap-4 p-3 rounded-lg font-semibold ${isActive(nav.path) ? "bg-btng-green text-btng-black" : "menu-item-inactive hover:bg-white/20"
                    }`}
                >
                  <span
                    className={`menu-item-icon-size ${isActive(nav.path)
                      ? "text-btng-black"
                      : "text-white"
                      }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className={
                      isActive(nav.path) ? "text-btng-black" : "text-white"
                    }>{nav.name}</span>
                  )}
                </Link>
              )
            )}
          </li>
        )
      })}
    </ul>
  );

  const renderContactPerson = () => (
    <div className="p-4 border border-white/40 bg-white/10 rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        {(isExpanded || isHovered || isMobileOpen) && (
          <div>
            <div className="flex gap-2 items-center mb-2">
              <Info className="text-white w-5 h-5" />
              <p className="text-base font-semibold text-white">
                Butuh bantuan?
              </p>
            </div>
            <p className="text-xs text-white/80">Hubungi contact person kami</p>
          </div>
        )}
      </div>
      {(isExpanded || isHovered || isMobileOpen) && (
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/6289666900321"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg text-xs">
              <Smartphone className="text-white w-4 h-4" />
              <div>
                <p className=" font-semibold text-white">Zendry</p>
              </div>
            </div>
          </a>
          <a
            href="https://wa.me/6281392130582"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg text-xs">
              <Smartphone className="text-white w-4 h-4" />
              <div>
                <p className=" font-semibold text-white">Aldi</p>
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed flex flex-col justify-between mt-10 lg:mt-0 top-0 px-6 left-0 bg-btng-black text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[240px]"
            : isHovered
            ? "w-[240px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="">
          <div
            className={`py-10 flex ${
              !isExpanded && !isHovered ? "justify-center" : "justify-center"
            }`}
          >
            <Link to="/">
              {isExpanded || isHovered || isMobileOpen ? (
                <>
                  <img
                    src="/images/btng/images/LOGOBTNG.webp"
                    alt="Logo BTNG"
                    className="w-36"
                  />
                </>
              ) : (
                <>
                  {" "}
                  <img
                    src="/images/btng/images/LOGOBTNG.webp"
                    alt="Logo BTNG"
                    className="w-36"
                  />{" "}
                </>
              )}
            </Link>
          </div>
          <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
            <nav className="mb-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  ></h2>
                  {renderMenuItems(navItems, "main")}
                </div>
                <div className="">
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  ></h2>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="py-5">{renderContactPerson()}</div>
      </aside>
      <Modal
        open={modalLogoutOpen}
        onClose={() => setModalLogoutOpen(false)}
        title="Konfirmasi Logout"
      >
        <p className="mb-4 text-sm">Apakah Anda yakin ingin logout?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setModalLogoutOpen(false)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm"
          >
            Batal
          </button>
          <button
            onClick={handleConfirmLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AppSidebarParticipant;
