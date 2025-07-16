import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "", ...props }: CardProps) => (
  <div className={`bg-white rounded-lg shadow ${className}`} {...props}>{children}</div>
);

export const CardContent = ({ children, className = "", ...props }: CardProps) => (
  <div className={`p-4 ${className}`} {...props}>{children}</div>
);
