import { NextResponse } from "next/server";
import { prisma } from "@/db";
const path = require("path");
const fs = require("fs");
export const POST = async (req) => {
  const formData = await req.formData();
  const getProductData = JSON.parse(formData.get("basicData"));
  const getFiles = formData.getAll("File");
  const getAllFilesName = getFiles.map((item) => item.name);

  try {
    const isReadFile = () =>
      fs.readdirSync(
        path.join(process.cwd(), "public", "files"),
        async (err, _) => {
          if (err) {
            throw new Error({
              responseCode: "999",
              responseMsg: "讀取失敗",
            });
          }
        }
      );
    const isRepeatPrisma = await prisma.ProductFiles.findMany();
    const isPrismaAllFiles = isRepeatPrisma.map((item) => item.FileName);
    const isRepeat = getAllFilesName.filter(
      (item) => isReadFile().indexOf(item) !== -1
    );
    const isPrismaRepeat = isPrismaAllFiles.filter(
      (item) => getAllFilesName.indexOf(item) !== -1
    );

    if (isRepeat?.length >= 1 || isPrismaRepeat?.length >= 1) {
      return NextResponse.json({
        responseCode: "999",
        responseMsg: "寫入失敗-有重複檔案",
      });
    }
    const getResult = await prisma.Product.create({
      data: {
        ProductName: getProductData.ProductName,
        Price: getProductData.Price,
        Deatils: getProductData.Deatils,
        Discount: getProductData.Discount,
      },
    });

    if (!getResult) {
      return NextResponse.json({
        responseCode: "新增失敗",
        responseMsg: "必填欄位-有空值",
      });
    } else {
      const saveID = getResult.ID;
      if (saveID) {
        if (getProductData?.img?.length >= 1) {
          getProductData?.img?.forEach(async (item) => {
            await prisma.ProductImage.create({
              data: {
                Name: item.name,
                link: item.link,
                productID: saveID,
              },
            });
          });
        }
        if (getFiles?.length >= 1) {
          getFiles.forEach(async (item) => {
            await prisma.ProductFiles.create({
              data: {
                FileName: item.name,
                productID: saveID,
              },
            });
            const buffer = Buffer.from(await item.arrayBuffer());
            const filePath = path.join(
              process.cwd(),
              "public",
              "files",
              item.name
            );
            fs.writeFileSync(filePath, buffer);
          });
        }
        return NextResponse.json({
          responseCode: "新增成功",
          responseMsg: "必填欄位-有圖片-檔案",
        });
      } else {
        return NextResponse.json({
          responseCode: "新增成功",
          responseMsg: "必填欄位-無圖片",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      responseCode: "catch Error",
      responseMsg: error,
    });
  }
};
