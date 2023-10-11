import { NextResponse } from "next/server";
import { prisma } from "@/db";
export const POST = async (req) => {
  const getID = await req.json();

  const getData = await prisma.Product.findUnique({
    where: {
      ID: getID,
    },
  });

  const getImage = await prisma.ProductImage.findMany({
    where:{
      productID:getID
    }
  })

  

  if (!getData) {
    return NextResponse.json({
      responseCode: "找不到此筆資料",
    });
  }

  return NextResponse.json({
    responseCode: "讀取成功",
    responseData: getData,
    responseImage:getImage
  });
};
