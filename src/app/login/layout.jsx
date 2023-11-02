import React from "react";

export default function LoginLayout({ children }) {
  return (
    <div
      style={{ height: "calc(100vh - 46px)" }}
      className="width100 flex-center"
    >
      {children}
    </div>
  );
}
