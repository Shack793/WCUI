import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Checkbox = ({ className = "", checked, onChange, ...props }: CheckboxProps) => (
  <input
    type="checkbox"
    className={`form-checkbox ${className}`}
    checked={checked}
    onChange={onChange}
    {...props}
  />
);

export default Checkbox;