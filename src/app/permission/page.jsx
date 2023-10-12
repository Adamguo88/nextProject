"use client";
import React from "react";
import { Button } from "antd";
import Link from "next/link";
export default function PermissionPage() {
  const readFile = async () => {
    const response = await fetch("http://localhost:3000/api/readFile", {
      method: "POST",
      body: JSON.stringify({ a: "hello", b: "world" }),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div
      className="width100 pl-30 pr-30 mt-10"
      style={{ maxWidth: "calc(100vw - 276px)" }}
    >
      <Button type="primary" className="mr-20">
        <Link href="/permission/productList">列表</Link>
      </Button>
      <Button type="primary" className="mr-20">
        <Link href="/permission/add">新商商品</Link>
      </Button>
      <Button type="primary" onClick={readFile}>
        資料流測試
      </Button>
    </div>
  );
}
