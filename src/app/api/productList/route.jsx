import { NextResponse } from "next/server";
import { prisma } from "@/db";
export const GET = async () => {
  const data = await prisma.Product.findMany();

  return NextResponse.json({
    responseCode: "讀取成功",
    data,
  });
};
