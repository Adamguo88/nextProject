import { NextResponse } from "next/server";
const fs = require("fs");
const path = require("path");
export const POST = async (req) => {
  const { name } = await req.json();

  const fileLink = path.join(process.cwd(), "public", "files", name);
  const readFile = fs.readFileSync(fileLink);

  if (!!readFile) {
    return new Response(readFile, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${name}`,
        "Content-Length": readFile.length,
      },
    });
  }
  return NextResponse.json({
    responseCode: "-1",
    responseFile: "error",
  });
};
