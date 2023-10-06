import { NextResponse } from "next/server";
import { prisma } from "@/db";

export const POST = async (req) => {
  const getToken = await req.json();

  if (!getToken?.token) {
    console.log(req.url);

    return NextResponse.json({
      responseCode: "1",
      responseMsg: "無Token",
    });
  }

  const searchDB = await prisma.User.findUnique({
    where: {
      ID: getToken.token,
    },
  });
  if (!searchDB.ID) {
    return NextResponse.json({
      responseCode: "2",
      responseMsg: "查無此人",
    });
  } else {
    return NextResponse.json({
      responseCode: "0",
      responseMsg: "匹配成功",
    });
  }
};
