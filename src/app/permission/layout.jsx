"use client";
import React, { createContext, useEffect, useState } from "react";
import JsCookie from "js-cookie";
import { v4 } from "uuid";
import BackEndNavBar from "./_components/BackEndNavBar";

export const SocketContext = createContext(null);

export default function layout({ children }) {
  const [isSocket, setIsSocket] = useState(null);
  const [isUser, setIsUser] = useState(null);
  useEffect(() => {
    const getCookie = JsCookie.get("loginToken");
    if (!!getCookie) {
      const findUserCode = async () => {
        const findUser = await fetch(
          "http://localhost:3000/api/loginAPI/findUser",
          {
            method: "POST",
            body: JSON.stringify({ id: getCookie }),
          }
        );
        const { responseCode } = await findUser.json();
        if (!!responseCode) {
          localStorage.setItem("isUser", responseCode);
          setIsUser(responseCode);
          const getOnlyCode = localStorage.getItem("onlyCode");
          if (!getOnlyCode) {
            const onlyCode = v4();
            localStorage.setItem("onlyCode", onlyCode);
          }
        }
      };
      findUserCode();

      const getOnlyCode = localStorage.getItem("onlyCode");
      const getIsUser = !!isUser || localStorage.getItem("isUser");

      const socket = new WebSocket(
        `ws://localhost:8080?modifyCode=${getIsUser}&onlyCode=${getOnlyCode}`
      );
      if (!!socket) {
        setIsSocket(socket);
      }
    }
  }, []);
  return (
    <div className=" flex">
      <>
        <BackEndNavBar />
      </>
      <SocketContext.Provider value={{ isSocket, isUser }}>
        {children}
      </SocketContext.Provider>
    </div>
  );
}
