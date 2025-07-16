import * as React from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  children?: React.ReactNode;
}

export function Avatar({ src, alt, children, className, ...props }: AvatarProps) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 ${className || ""}`} {...props}>
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="object-cover w-full h-full" />
      ) : (
        children
      )}
    </div>
  );
}

export function AvatarImage({ src, alt }: { src?: string | null; alt?: string }) {
  if (!src) return null;
  return <img src={src} alt={alt || "Avatar"} className="object-cover w-full h-full" />;
}

export function AvatarFallback({ children }: { children?: React.ReactNode }) {
  return (
    <span className="flex items-center justify-center w-full h-full text-gray-500 text-lg font-semibold">
      {children}
    </span>
  );
}
