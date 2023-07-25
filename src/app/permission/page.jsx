"use client";
import React from "react";
import { Button } from "antd";
import Link  from "next/link";
export default function PermissionPage() {
  return (
    <div
      className="width100 pl-30 pr-30"
      style={{ maxWidth: "calc(100vw - 276px)" }}
    >
      <Button type="primary" className="mr-20">
        <Link href="/permission/productList">列表</Link>
      </Button>
      <Button type="primary" >
        <Link href="/permission/add">新商商品</Link>
      </Button>
    </div>
  );
}
