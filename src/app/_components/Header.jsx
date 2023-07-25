"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "antd";
const Header = () => {
  const pathname = usePathname();
  const [savePathname, setSavePathname] = useState("/");
  const items = [
    {
      label: <Link href="/">首頁</Link>,
      key: "/",
    },
    {
      label: <Link href="/permission">後台</Link>,
      key: "/permission",
    },
    {
      label: <Link href="/open">倉庫</Link>,
      key: "/open",
    },
    {
      label: <Link href="/login">登入</Link>,
      key: "/login",
    },
    {
      label: "登出",
      key: "logout",
      onClick: () => {
        document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
      },
    },
  ];
  const onClick = (e) => {
    setSavePathname(e.key);
  };
  useEffect(() => {
    if (pathname !== savePathname) {
      setSavePathname(pathname);
      return;
    } else {
      setSavePathname(pathname);
      return;
    }
  }, [pathname]);
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[savePathname]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
