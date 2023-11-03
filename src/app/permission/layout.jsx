"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import JsCookie from "js-cookie";
import { v4 } from "uuid";
import BackEndNavBar from "./_components/BackEndNavBar";
import { notification } from "antd";

export const SocketContext = createContext(null);

export default function layout({ children }) {
  const [api, contextHolder] = notification.useNotification(); // antd
  const messageRef = useRef();

  const [isSocket, setIsSocket] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [isRepeatLogin, setIsRepeatLogin] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const openNotification = {
    leaveMessage: (data) => {
      api.open({
        message: "離開通知",
        description: data,
        duration: 3,
        placement: "top",
      });
    },
    enterMessage: (data) => {
      api.open({
        message: "進入通知",
        description: data,
        duration: 3,
        placement: "top",
      });
    },
    repeatLoginMessage: (data) => {
      api.open({
        message: "裝置被重複登入",
        description: data,
        duration: 3,
        placement: "top",
      });
    },
  };
  messageRef.current = openNotification;

  useEffect(() => {
    const getCookie = JsCookie.get("loginToken");
    const socketData = {
      modifyCode: null,
      onlyCode: null,
    };
    if (!!getCookie) {
      const getStatus = async () => {
        const responseData = await fetch(
          "http://localhost:3000/api/loginAPI/getLoginStatus",
          {
            method: "POST",
            body: JSON.stringify({ token: JsCookie.get("loginToken") }),
          }
        );
        const { responseCode } = await responseData.json();
        if (!!responseCode && responseCode === "N") {
          JsCookie.remove("loginToken");
          window.location.reload("/login");
        } else {
          findUserCode();
        }
      };
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
          socketData.modifyCode = responseCode;
          setIsUser(responseCode);
          const getOnlyCode = localStorage.getItem("onlyCode");
          socketData.onlyCode = getOnlyCode;
          if (!getOnlyCode) {
            const onlyCode = v4();
            localStorage.setItem("onlyCode", onlyCode);
            socketData.onlyCode = onlyCode;
          }

          const socket = new WebSocket(
            `ws://localhost:8080?modifyCode=${socketData.modifyCode}&onlyCode=${socketData.onlyCode}`
          );
          if (!!socket) {
            console.log(socket);
            setIsSocket(socket);
            setIsLoading(false);
          }
        }
      };
      getStatus();
    }
  }, []);

  useEffect(() => {
    if (!!isSocket) {
      isSocket.addEventListener("message", (msg) => {
        const message = JSON.parse(msg.data);
        if (message.type === "repeatLogin") {
          setIsRepeatLogin(message.data);
          setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie =
              "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.replace("/");
          }, 3000);
        }
      });
      isSocket.addEventListener("close", () => {
        console.log("即將被登出");
      });
      isSocket.addEventListener("error", (error) => {
        console.log("出錯拉", error);
      });
    }
  }, [isSocket]);

  useEffect(() => {
    if (!!isRepeatLogin) {
      messageRef.current.repeatLoginMessage(isRepeatLogin);
      setTimeout(() => {
        setIsRepeatLogin(null);
      }, 3000);
    }
  }, [isRepeatLogin]);
  return (
    <div className=" flex">
      {loading ? (
        <>
          <h1>loading...</h1>
        </>
      ) : (
        <>
          {contextHolder}
          <>
            <BackEndNavBar />
          </>
          <SocketContext.Provider value={{ isSocket, isUser }}>
            {children}
          </SocketContext.Provider>
        </>
      )}
    </div>
  );
}
