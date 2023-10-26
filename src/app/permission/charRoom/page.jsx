"use client";
import React, { useContext, useEffect, useRef, useState } from "react";

import { notification } from "antd";
import { SocketContext } from "../layout";

export default function page() {
  const { isSocket, isUser } = useContext(SocketContext); // 接收父元件socket參數
  const messageRef = useRef(); // 套件ref
  const leaveRef = useRef(); // 離開計時器
  const enterRef = useRef(); // 進入計時器
  const [api, contextHolder] = notification.useNotification(); // antd

  const [isMessage, setIsMessage] = useState(""); // 傳送訊息
  const [isMessageList, setIsMessageList] = useState([]); // 聊天室List

  const [isLeave, setIsLeave] = useState(null); // 離開通知
  const [isEnter, setIsEnter] = useState(null); // 進入通知

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
  };
  messageRef.current = openNotification;

  const newMessage = (e) => {
    if (e.keyCode === 13 && isMessage.trim().length >= 1) {
      const sendData = { user: isUser, message: isMessage };
      isSocket.send(
        JSON.stringify({
          type: "chat",
          data: sendData,
        })
      );
      setIsMessage("");
    }
  };
  useEffect(() => {
    if (!!isSocket) {
      isSocket.addEventListener("open", () => {
        console.log("已啟動連線");
      });
      isSocket.addEventListener("message", (msg) => {
        const message = JSON.parse(msg.data);
        if (message.type === "getMessage") {
          setIsMessageList((data) => [...data, message.data]);
        }
        if (message.type === "leave") {
          setIsLeave(message.data);
        }
        if (message.type === "enter") {
          setIsEnter(message.data);
        }
      });
      isSocket.addEventListener("close", () => {
        console.log("即將被斷開連線");
      });
    }
  }, [isSocket]);
  useEffect(() => {
    if (!!isEnter) {
      messageRef.current.enterMessage(isEnter);
      enterRef.current = setTimeout(() => {
        setIsLeave(null);
      }, 3000);
    }
    return () => {
      clearTimeout(enterRef.current);
    };
  }, [isEnter]);

  useEffect(() => {
    if (!!isLeave) {
      messageRef.current.leaveMessage(isLeave);
      leaveRef.current = setTimeout(() => {
        setIsLeave(null);
      }, 3000);
    }
    return () => {
      clearTimeout(leaveRef.current);
    };
  }, [isLeave]);
  return (
    <div
      className="width100 pl-20 pr-20"
      style={{ maxWidth: "calc(100vw - 276px)" }}
    >
      {contextHolder}
      <div className="max-width1500 ">
        <div
          style={{
            height: "500px",
            maxHeight: "500px",
            overflow: "auto",
            backgroundColor: "black",
            color: "white",
            padding: "10px ",
          }}
        >
          {isMessageList.map((item, index) => {
            return (
              <div key={index} className="width100">
                {item.user === isUser ? (
                  <div className="flex flex-column alignEnd">
                    <span>{item.user}：</span>
                    <span>{item.message}</span>
                  </div>
                ) : (
                  <div className="flex flex-column alignStart">
                    <span>{item.user}：</span>
                    <span>{item.message}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="width100">
          <input
            type="text"
            className="width100"
            style={{ height: "50px", textAlign: "end", paddingRight: "10px" }}
            autoFocus
            value={isMessage}
            onChange={(e) => setIsMessage(e.target.value)}
            onKeyDown={newMessage}
          />
        </div>
      </div>
    </div>
  );
}
