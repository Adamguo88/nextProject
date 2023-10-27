import { NextResponse } from "next/server";
import { prisma } from "@/db";

export const POST = async (req) => {
  const { token } = await req.json();
  if (!!token) {
    try {
      const loginDBResult = await prisma.User.findUnique({
        where: {
          ID: token,
        },
      });

      if (!loginDBResult) {
        return NextResponse.json({
          responseCode: "無此用戶",
        });
      }
      return NextResponse.json({
        responseCode: loginDBResult.IsLogin,
      });
    } catch (error) {
      return NextResponse.json({
        responseCode: error,
      });
    }
  } else {
    return NextResponse.json({
      responseCode: "nothing",
    });
  }
};
