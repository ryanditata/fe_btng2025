import React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  to: string;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, text }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        onClick={() => navigate(to)}
        className="inline-flex items-center gap-2 text-black dark:text-white">
        <ChevronLeft />
        <span>{text}</span>
      </button>
    </div>
  );
};

export default BackButton;
