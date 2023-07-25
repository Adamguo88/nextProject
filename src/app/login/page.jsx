"use client";
import React from "react";
import { Button, Form, Input } from "antd";
export default function LoginPage() {
  const onFinish = (values) => {
    loginAPI(values);
  };
  const loginAPI = async (values) => {
    const response = await fetch("http://localhost:3000/api/loginAPI", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });
    const responseStatus = await response.json();
    console.log(responseStatus);

    if (responseStatus.responseCode === "登入成功") {
      alert("登入成功");
      window.location.href = '/'
      return;
    } else {
      alert("登入失敗");
      return;
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
