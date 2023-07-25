import React from "react";
import { cookies } from "next/dist/client/components/headers";
import { prisma } from "../db";
export default function Home() {
  const getDBData = async () => {
    "uer server";
    const dataBase = await prisma.Product.findMany()
    console.log(dataBase);
    const ck = cookies()
    console.log(ck.getAll());
    return dataBase;
  };
  getDBData();
  return <div>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
    <h1>首頁</h1>
  </div>;
}
