import React from "react";
import BackEndNavBar from "./_components/BackEndNavBar";
export default function layout({ children }) {
  return (
    <div className=" flex">
      <>
        <BackEndNavBar />
      </>
      {children}
    </div>
  );
}
