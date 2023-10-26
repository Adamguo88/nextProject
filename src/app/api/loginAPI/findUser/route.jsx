import { NextResponse } from "next/server";
import { prisma } from "@/db";

export const POST = async (req) => {
  const { id } = await req.json();
  try {
    const loginDBResult = await prisma.User.findUnique({
      where: {
        ID: id,
      },
    });

    if (!loginDBResult) {
      return NextResponse.json({
        responseCode: "無此用戶",
      });
    }
    return NextResponse.json({
      responseCode: loginDBResult.Username,
    });
  } catch (error) {
    return NextResponse.json({
      responseCode: error,
    });
  }
};
