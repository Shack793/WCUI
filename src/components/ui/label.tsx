import React from "react";
export const Label = ({ children, className = "", ...props }) => (
  <label className={`block font-medium text-sm ${className}`} {...props}>{children}</label>
);
export default Label; 