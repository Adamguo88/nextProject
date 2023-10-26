"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("後台首頁", "1"),
  getItem("列表", "2"),
  getItem("新增商品", "3"),
  getItem("聊天室", "4"),
];
const BackEndNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuActive, setMenuActive] = useState(["1"]);
  const handleChangePage = (e) => {
    switch (e.key) {
      case "1":
        setMenuActive(["1"]);
        router.push("/permission");
        return;
      case "2":
        setMenuActive(["2"]);
        router.push("/permission/productList");
        return;
      case "3":
        setMenuActive(["3"]);
        router.push("/permission/add");
        return;
      case "4":
        setMenuActive(["4"]);
        router.push("/permission/charRoom");
        return;

      default:
        router.push("/permission");
        return;
    }
  };
  useEffect(() => {
    const newPathname = pathname.split("/")?.[2];
    switch (newPathname) {
      case "productList":
        setMenuActive(["2"]);
        return;
      case "add":
        setMenuActive(["3"]);
        return;
      case "charRoom":
        setMenuActive(["4"]);
        return;
      default:
        setMenuActive(["1"]);
        return;
    }
  }, [pathname]);
  return (
    <Menu
      style={{
        minHeight: "calc(100vh - 46px)",
        height: "100vh",
        width: "276px",
        position: "sticky",
        top: "0",
      }}
      defaultSelectedKeys={menuActive}
      selectedKeys={menuActive}
      mode="inline"
      theme="dark"
      items={items}
      onClick={handleChangePage}
    />
  );
};
export default BackEndNavBar;
