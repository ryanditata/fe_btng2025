import React from "react";
import { LucideProps } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  Icon: React.ComponentType<LucideProps>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon }) => {
  return (
    <div className="rounded-lg border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black">
            {value}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;