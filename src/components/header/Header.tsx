import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/api/participant/useAuth";

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header
      className="w-full top-0 fixed z-9999 flex items-center justify-between px-4 py-4 md:px-8 md:pt-[20px] md:pb-[16px] lg:px-[200px] lg:pt-[24px] lg:pb-[20px] xl:pt-[16px] xl:pb-[12px] h-fit"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)",
      }}
    >

      {/* Logo */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scrollToSection("hero-section");
        }}
        className="cursor-pointer object-cover w-20 md:w-25 lg:h-[80px] lg:w-[140px]"
      >
        <img
          src="images/btng/images/LOGOBTNG.webp"
          alt="Logo"
          className="w-full"
        />
      </button>

      <div className="flex md:hidden flex-row gap-4">
        <Link
          to="/signin/participant"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-[80px] h-[35px] bg-white text-black rounded-3xl text-sm font-bold hover:bg-[#BDEE63] transition duration-300 ease-in-out"
        >
          Masuk
        </Link>

        {/* Burger Menu (Mobile) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Desktop */}
      <nav className="hidden md:flex items-center md:gap-6 lg:gap-12 text-white font-raleway font-semibold">
        <a
          onClick={() => scrollToSection("about-section")}
          className="relative cursor-pointer group"
        >
          About
          <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
        </a>

        <a
          onClick={() => scrollToSection("timeline-section")}
          className="relative cursor-pointer group"
        >
          Timeline
          <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
        </a>

        <a
          onClick={() => scrollToSection("benefits-section")}
          className="relative cursor-pointer group"
        >
          Benefits
          <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r  from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
        </a>

        <a
          onClick={() => scrollToSection("divisi")}
          className="relative cursor-pointer group"
        >
          Divisions
          <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
        </a>
      </nav>

      {/* Login Button Desktop */}
      <Link
        to={isAuthenticated ? "/participant" : "/signin/participant"}
        className="hidden md:flex items-center justify-center px-4 h-[43px] bg-white text-black rounded-3xl hover:bg-[#BDEE63] transition duration-300 ease-in-out"
      >
        <p className={`font-raleway font-bold`}>
          {isAuthenticated ? "Dashboard" : "Masuk"}
        </p>
      </Link>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen font-bold font-raleway bg-black/50 backdrop-blur-md flex flex-col items-center justify-center text-white gap-8 z-50">
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
          <a
            onClick={() => {
              setIsOpen(false);
              scrollToSection("about-section");
            }}
            className="relative cursor-pointer group"
          >
            About
            <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
          </a>
          <a
            onClick={() => {
              setIsOpen(false);
              scrollToSection("timeline-section");
            }}
            className="relative cursor-pointer group"
          >
            Timeline
            <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
          </a>
          <a
            onClick={() => {
              setIsOpen(false);
              scrollToSection("benefits-section");
            }}
            className="relative cursor-pointer group"
          >
            Benefits
            <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
          </a>
          <a
            onClick={() => {
              setIsOpen(false);
              scrollToSection("divisi");
            }}
            className="relative cursor-pointer group"
          >
            Divisions
            <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-black to-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400 ease-out"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[2px] bg-gradient-to-r from-white to-black scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-400 ease-out"></span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
