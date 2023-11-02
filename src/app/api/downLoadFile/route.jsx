import { NextResponse } from "next/server";
const fs = require("fs");
const path = require("path");
export const POST = async (req) => {
  const { name } = await req.json();
  const requestHeader = new Headers(req.headers);
  requestHeader.set("Content-Type", "application/pdf");
  requestHeader.set("Content-Disposition", `attachment; filename=${name}`);

  const fileLink = path.join(process.cwd(), "public", "files", name);
  const readFile = fs.readFileSync(fileLink);

  if (!!readFile) {
    return new Response(readFile)
  }
  return NextResponse.json({
    responseCode: "-1",
    responseFile: "error",
  });
};
