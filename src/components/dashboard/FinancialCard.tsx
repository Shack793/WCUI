import React from "react";
const FinancialCard: React.FC<{
  title: string;
  amount: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}> = ({ title, amount, icon, bgColor, textColor }) => (
  <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold mb-1">₵{amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}</div>
        <div className="text-sm opacity-90">{title}</div>
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </div>
);
export default FinancialCard;