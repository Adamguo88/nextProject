import { NextResponse } from "next/server";

export const POST = async (req) => {
  const formData = await req.formData();
  const file = formData.get('file');
  console.log("form data", formData, file);

  return NextResponse.json({
    status: 500,
  });
};
