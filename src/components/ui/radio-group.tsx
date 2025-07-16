import React from "react";
export const RadioGroup = ({ value, onValueChange, children }) => (
  <div onChange={e => onValueChange(e.target.value)}>{children}</div>
);
export const RadioGroupItem = ({ value, id, ...props }) => (
  <input type="radio" value={value} id={id} name={id} {...props} />
); 