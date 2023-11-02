const express = require("express");
const { v4 } = require("uuid");
const cors = require("cors");
const SocketServer = require("ws").Server;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = express().listen("8080", () => {
  console.log("8080 start");
});

const wss = new SocketServer({ server });
let userList = {};
const messageList = [];
let count = 0;
wss.on("connection", (ws, req) => {
  const url = new URL(req.url, "http://localhost:8080");
  const param1 = url.searchParams.get("modifyCode");
  const param2 = url.searchParams.get("onlyCode");
  ws.express_UUID = v4();
  // console.log(param1, param2);
  if (userList[param1]) {
    if (userList[param1].onlyCode !== param2) {
      userList[param1].rooms.forEach((item) => {
        item.send(
          JSON.stringify({
            type: "repeatLogin",
            data: "有人登入您的裝置，您即將被自動登出",
          })
        );
        item.close();
      });
      delete userList[param1];
      userList[param1] = {
        rooms: [ws],
        onlyCode: param2,
      };
    } else {
      userList[param1] = {
        rooms: [ws, ...userList[param1].rooms],
        onlyCode: param2,
      };
      console.log("重複登入");
    }
  } else {
    if (Object.keys(userList).length >= 1) {
      Object.entries(userList).forEach((item) => {
        item[1].rooms.forEach((room) => {
          room.send(
            JSON.stringify({ type: "enter", data: `${param1} - 已進入` })
          );
        });
      });
    }
    console.log("第一次登入");
    userList[param1] = {
      rooms: [ws],
      onlyCode: param2,
    };
  }

  count += 1;
  console.log("目前連線數量", count);
  ws.send(JSON.stringify({ type: "allPerson", data: Object.keys(userList) }));
  if (Object.keys(userList).length > 1) {
    Object.entries(userList).forEach((item) => {
      if (item[0] !== param1) {
        item[1].rooms.forEach((room) => {
          room.send(JSON.stringify({ type: "newPerson", data: param1 }));
        });
      }
    });
  }

  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    if (message.type === "chat") {
      const data = message.data;
      messageList.push(data);
      console.log(userList);
      Object.entries(userList).forEach((item) => {
        item[1].rooms.forEach((room) => {
          room.send(JSON.stringify({ type: "getMessage", data: data }));
        });
      });
    }
  });

  ws.on("close", async () => {
    count -= 1;
    console.log(`連線人數 - ${count}`);
    userList[param1] = {
      ...userList[param1],
      rooms: userList[param1]?.rooms?.filter(
        (room) => ws.express_UUID !== room.express_UUID
      ),
    };
    if (userList[param1]?.rooms?.length <= 0) {
      const saveUserName = param1;
      delete userList[param1];

      setTimeout(async () => {
        if (userList[saveUserName]?.rooms?.length <= 0 || !userList[saveUserName]?.rooms?.length) {
          const findAndUpdate = await fetch(
            "http://localhost:3000/api/loginAPI/updateLoginStatus",
            {
              method: "POST",
              body: JSON.stringify({ username: saveUserName }),
            }
          );
          const response = await findAndUpdate.json();
          console.log(response);
        }
      }, 3000);

      Object.entries(userList).forEach((item) => {
        item[1].rooms.forEach((room) => {
          room.send(
            JSON.stringify({ type: "leave", data: `${param1} - 已離開` })
          );
        });
      });
    }
  });
});
