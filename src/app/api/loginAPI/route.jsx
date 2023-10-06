import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const { username, password } = await req.json();
  try {
    const loginDBResult = await prisma.User.findUnique({
      where: {
        Username: username,
        Password: password,
      },
    });

    if (!loginDBResult) {
      return NextResponse.json({
        responseCode: "無此用戶",
      });
    }
    const ck = cookies();
    ck.set("loginToken", loginDBResult.ID);
    return NextResponse.json({
      responseCode: "登入成功",
      loginDBResult,
    });
  } catch (error) {
    return NextResponse.json({
      responseCode: error,
    });
  }
};

export const GET = async () => {
  const data = await prisma.User.findMany();

  return NextResponse.json({
    data,
  });
};
