"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "antd";
export default function Header() {
  const pathname = usePathname();
  const [savePathname, setSavePathname] = useState("/");
  const [isMenuItem, setIsMenuItem] = useState([]);

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
  useEffect(() => {
    const getLoginCookie = document.cookie?.split("loginToken=")?.[1];
    const items = [
      {
        label: <Link href="/">首頁</Link>,
        key: "/",
      },
      (() => {
        if (!getLoginCookie) {
          return null;
        } else {
          return {
            label: <Link href="/permission">後台</Link>,
            key: "/permission",
          };
        }
      })(),
      {
        label: <Link href="/open">倉庫</Link>,
        key: "/open",
      },
      (() => {
        if (getLoginCookie) return null;

        return {
          label: <Link href="/login">登入</Link>,
          key: "/login",
        };
      })(),

      (() => {
        if (!getLoginCookie) return null;

        return {
          label: "登出",
          key: "logout",
          onClick: () => {
            localStorage.clear();
            document.cookie =
              "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.replace("/");
          },
        };
      })(),
    ];
    setIsMenuItem(items);
  }, []);
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[savePathname]}
      mode="horizontal"
      items={isMenuItem}
    />
  );
}
