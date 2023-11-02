"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "antd";
import { useSession, signOut } from "next-auth/react";
export default function Header() {
  const { data: session } = useSession();
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
  useLayoutEffect(() => {
    const getLoginCookie = document.cookie?.split("loginToken=")?.[1];
    const items = [
      {
        label: <span>{!!session ? session?.user?.name : "無登入"}</span>,
        key: "87",
      },
      {
        label: <Link href="/">首頁</Link>,
        key: "/",
      },
      (() => {
        if (!getLoginCookie && !session) {
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
      {
        label: <Link href="/map">地圖</Link>,
        key: "/map",
      },
      (() => {
        if (!!getLoginCookie || !!session) return null;

        return {
          label: <Link href="/login">登入</Link>,
          key: "/login",
        };
      })(),

      (() => {
        if (!getLoginCookie && !session) return null;

        return {
          label: "登出",
          key: "logout",
          onClick: async () => {
            if (!!session) {
              await signOut({ callbackUrl: "/login" });
            } else {
              localStorage.clear();
              document.cookie =
                "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              window.location.replace("/");
            }
          },
        };
      })(),
    ];
    setIsMenuItem(items);
  }, [session]);
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[savePathname]}
      mode="horizontal"
      items={isMenuItem}
    />
  );
}
