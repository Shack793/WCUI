import React from "react";

export const Progress = ({ value = 0, className = "", ...props }) => (
  <div className={`w-full bg-gray-200 rounded ${className}`} {...props}>
    <div
      className="bg-green-500 h-2 rounded"
      style={{ width: `${value}%`, transition: "width 0.3s" }}
    />
  </div>
);
