import { NextResponse } from "next/server";
import { prisma } from "@/db";
export const POST = async (req) => {
  const addData = await req.json();
  console.log(addData);
  const addProductAPI = await prisma.Product.create({
    data: addData,
  });
  return NextResponse.json({
    responseCode: "新增成功",
  });
};
