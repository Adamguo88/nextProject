const express = require("express");
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
const userList = {
  // adam: {
  //   rooms: [],
  //   onlyCode: "1",
  // },
};
const messageList = [];
let count = 0;
wss.on("connection", (ws, req) => {
  const url = new URL(req.url, "http://localhost:8080");
  const param1 = url.searchParams.get("modifyCode");
  const param2 = url.searchParams.get("onlyCode");
  // console.log(param1, param2);
  if (userList[param1]) {
    if (userList[param1].onlyCode !== param2) {
      userList[param1].rooms.forEach((item) => {
        item.close();
      });
    } else {
      userList[param1] = {
        rooms: [ws, ...userList[param1].rooms],
        onlyCode: param2,
      };
      console.log("重複登入");
    }
  } else {
    userList[param1] = {
      rooms: [ws],
      onlyCode: param2,
    };
    console.log("第一次登出");
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

  ws.on("close", () => {
    count -= 1;
    console.log(`連線人數 - ${count}`);
    console.log("斷線囉");
  });
});
