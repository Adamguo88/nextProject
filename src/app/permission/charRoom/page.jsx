"use client";
import React, { useContext, useEffect, useState } from "react";

import { SocketContext } from "../layout";

export default function page() {
  const { isSocket, isUser } = useContext(SocketContext);

  const [isMessage, setIsMessage] = useState("");
  const [isMessageList, setIsMessageList] = useState([]);

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
      });
      isSocket.addEventListener("close", () => {
        console.log("即將被斷開連線");
      });
    }
  }, [isSocket]);
  return (
    <div
      className="width100 pl-20 pr-20"
      style={{ maxWidth: "calc(100vw - 276px)" }}
    >
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
