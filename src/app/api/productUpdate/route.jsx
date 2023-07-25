import { NextResponse } from "next/server";
import { prisma } from "@/db";

export const POST = async (req) => {
  const data = await req.json();

  if (!data.ID) {
    return NextResponse.json({
      responseMsg: "更新失敗",
      responseError: "404",
    });
  }

  await prisma.Product.update({
    where: {
      ID: data.ID,
    },
    data: {
      ProductName: data.updateData.ProductName,
      Price: data.updateData.Price,
      Deatils: data.updateData.Deatils,
      Discount: data.updateData.Discount,
    },
  });

  return NextResponse.json({
    responseCode: "0",
    responseMsg: "更新成功",
  });
};

export const DELETE = async (req) => {
  const id = await req.json();
  if (!id) {
    return NextResponse.json({
      responseMsg: "空值",
      responseCode: "1",
    });
  }

  await prisma.Product.delete({
    where: {
      ID: id,
    },
  });

  return NextResponse.json({
    responseMsg: "刪除成功",
    responseCode: "0",
  });
};
