import React from "react";
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}> = ({ title, value, icon, bgColor, textColor }) => (
  <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm opacity-90">{title}</div>
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </div>
);
export default StatCard;