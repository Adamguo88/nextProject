import { NextResponse } from "next/server";

export const POST = async () => {
  console.log("hello world");

  return NextResponse.json({
    responseCode: "0",
    responseMsg: "測試用",
  });
};
