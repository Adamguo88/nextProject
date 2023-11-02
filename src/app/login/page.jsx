"use client";
import React, { useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button, Form, Input } from "antd";

export default function LoginPage() {
  useEffect(() => {
    localStorage.clear();
    document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }, []);
  const onFinish = (values) => {
    const { username, password } = values;

    if (!username && !password) {
      alert("帳號或密碼不得為空");
    } else {
      login(values);
    }
  };

  const login = async (values) => {
    const { username, password } = values;
    const obj = { username, password };

    const fetchResponse = await fetch("http://localhost:3000/api/loginAPI", {
      method: "POST",
      body: JSON.stringify(obj),
    });
    const { responseCode, loginDBResult } = await fetchResponse.json();

    if (responseCode === "登入成功") {
      alert("登入成功");
      window.location.href = "/permission";
      window.location.reload();
    } else {
      alert("登入失敗");
    }
  };
  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex flex-column">
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        initialValues={{
          remember: true,
        }}
        labelAlign="left"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="帳號"
          name="username"
          rules={[
            {
              required: true,
              message: "輸入帳號",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密碼"
          name="password"
          rules={[
            {
              required: true,
              message: "輸入密碼",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登入
          </Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        style={{ backgroundColor: "#850303" }}
        onClick={() => signIn("google", { callbackUrl: "/map" })}
      >
        Google
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#000", marginTop: "10px" }}
        onClick={() => signIn("github", { callbackUrl: "/map" })}
      >
        Github
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "blue", marginTop: "10px" }}
        onClick={() => signIn("facebook", { callbackUrl: "/map" })}
      >
        Facebook
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#850303", marginTop: "10px" }}
        onClick={logout}
      >
        登出
      </Button>
    </div>
  );
}
