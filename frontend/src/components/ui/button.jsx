// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, className = "", variant, ...props }) => {
  let base = "px-4 py-2 rounded font-semibold text-white";

  let styles =
    variant === "destructive"
      ? "bg-red-600 hover:bg-red-700"
      : variant === "outline"
      ? "bg-transparent border border-gray-400 text-gray-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};
