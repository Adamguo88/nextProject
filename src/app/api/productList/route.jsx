import { NextResponse } from "next/server";
import { prisma } from "@/db";
export const GET = async () => {
  const newData = await prisma.Product.findMany({
    include: { Files: true },
  });

  return NextResponse.json({
    responseCode: "讀取成功",
    data: newData,
  });
};
