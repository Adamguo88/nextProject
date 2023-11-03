import { prisma } from "@/db";
import { NextResponse } from "next/server";
const fs = require("fs");
const path = require("path");

export const POST = async (req) => {
  const { fileName,fileID } = await req.json();

  try {
    const readFile = fs.readdirSync(
      path.join(process.cwd(), "public", "files"),
      (err, _) => {
        throw new Error(`讀取檔案失敗-${err}`);
      }
    );
    const isExist = readFile.find((item) => item === fileName);

    if (!!isExist) {
      const deleteStatus = await prisma.ProductFiles.delete({
        where: {
          ID: fileID,
        },
      });
      if (!!deleteStatus) {
        fs.unlinkSync(path.join(process.cwd(), "public", "files", fileName));
        return NextResponse.json({
          responseCode: "0",
          responseMsg: "刪除成功",
        });
      }
    } else {
      return NextResponse.json({
        responseCode: "-1",
        responseMsg: "找不到這個檔案",
      });
    }
  } catch (error) {
    return NextResponse.json({
      responseCode: "-1",
      responseMsg: "catch Error",
      responseError: error,
    });
  }
};
