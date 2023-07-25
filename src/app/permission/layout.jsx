import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import BackEndNavBar from "./_components/BackEndNavBar";
export default function layout({ children }) {
  const ck = cookies();
  const getToken = ck.get("loginToken")?.value;
  console.log(getToken);
  if (getToken !== "loginInThePrisma") {
    redirect("/login");
  }

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
