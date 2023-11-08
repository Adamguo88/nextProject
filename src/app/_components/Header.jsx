"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "antd";
import { useSession, signOut } from "next-auth/react";
export default function Header() {
  const { data: session } = useSession();

  const isExpiredDone = useRef(null);
  const isLogout = useRef(null);
  const pathname = usePathname();

  const [savePathname, setSavePathname] = useState("/");
  const [isMenuItem, setIsMenuItem] = useState([]);

  const onClick = (e) => {
    setSavePathname(e.key);
  };
  useEffect(() => {
    const getToken = localStorage.getItem("isUser");
    const getTokenExpired = localStorage.getItem("tokenExpired");
    if (!!getToken) {
      isExpiredDone.current = setInterval(() => {
        console.log("觸發判斷是否到期");
        clearTimeout(isLogout.current);
        if (getTokenExpired <= new Date().valueOf()) {
          isLogout.current = setTimeout(() => {
            console.log("觸發登出");
            localStorage.clear();
            document.cookie =
              "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            clearInterval(isExpiredDone.current);
            clearTimeout(isLogout.current);
          }, 0);
        }
      }, 5000);
    }
    return () => {
      clearInterval(isExpiredDone.current);
      clearTimeout(isLogout.current);
    };
  }, []);
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
    const getLoginUser = localStorage.getItem("isUser");
    const items = [
      {
        label: (
          <span>
            {!!session
              ? session?.user?.name
              : !!getLoginUser
              ? getLoginUser
              : "無登入"}
          </span>
        ),
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
      {
        label: <Link href="/table">表格</Link>,
        key: "/table",
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
