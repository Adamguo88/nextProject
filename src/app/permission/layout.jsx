import React from "react";
import BackEndNavBar from "./_components/BackEndNavBar";
export default function layout({ children }) {
  return (
    <div
      className=" flex flex-column flex-wrap"
      style={{ height: "calc(100vh - 46px)" }}
    >
      <div>
        <BackEndNavBar />
      </div>
      {children}
    </div>
  );
}
