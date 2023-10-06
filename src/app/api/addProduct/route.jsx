import { NextResponse } from "next/server";
import { prisma } from "@/db";
export const POST = async (req) => {
  const addData = await req.json();
  const getResult = await prisma.Product.create({
    data: {
      ProductName: addData.ProductName,
      Price: addData.Price,
      Deatils: addData.Deatils,
      Discount: addData.Discount,
    },
  });

  if (!getResult) {
    console.log(1);
    return NextResponse.json({
      responseCode: "新增失敗",
      responseMsg: "必填欄位-有空值",
    });
  } else {
    const saveID = getResult.ID;
    if (saveID) {
      // addData.img.forEach(async (item) => {
      //   await prisma.ProductImage.create({
      //     data: {
      //       Name: item.name,
      //       link: item.link,
      //       productID: saveID,
      //     },
      //   });
      // });

      addData.img.forEach(async (item) => {
        await prisma.ProductImage.create({
          data: {
            Name: item.name,
            link: item.link,
            productID: saveID,
          },
        });
      });
      // console.log(test_);

      console.log(2);
      return NextResponse.json({
        responseCode: "新增成功",
        responseMsg: "必填欄位-有圖片",
      });
    } else {
      console.log(3);
      return NextResponse.json({
        responseCode: "新增成功",
        responseMsg: "必填欄位-無圖片",
      });
    }
  }
};
