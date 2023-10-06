"use client";
import React from "react";

import { Button, Form, Input } from "antd";

export default function LoginPage() {
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

    const fetchResponse = await fetch("http://localhost:3000/api/loginApi", {
      method: "POST",
      body: JSON.stringify(obj),
    });
    const { responseCode, loginDBResult } = await fetchResponse.json();

    if (responseCode === "登入成功") {
      alert("登入成功");
      window.location.href = "/permission";
    } else {
      alert("登入失敗");
    }
  };

  return (
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
  );
}
