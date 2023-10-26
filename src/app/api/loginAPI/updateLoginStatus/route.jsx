import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const { username } = await req.json();
  try {
    const loginDBResult = await prisma.User.findUnique({
      where: {
        Username: username,
      },
    });

    if (!loginDBResult) {
      return NextResponse.json({
        responseCode: "無此用戶",
      });
    }

    await prisma.User.update({
      where: { ID: loginDBResult.ID },
      data: { IsLogin: "N" },
    });
    const ck = cookies();
    ck.delete("loginToken");

    return NextResponse.json({
      responseCode: "success",
    });
  } catch (error) {
    return NextResponse.json({
      responseCode: error,
    });
  }
};
