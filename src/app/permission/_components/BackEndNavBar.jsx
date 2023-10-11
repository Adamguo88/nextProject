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
      default:
        setMenuActive(["1"]);
        return;
    }
  }, [pathname]);
  return (
    <Menu
      style={{ height: "100vh", width: "276px", position: "sticky", top: "0" }}
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
