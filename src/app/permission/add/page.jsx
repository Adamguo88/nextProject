"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
export default function AddPage() {
  const router = useRouter();
  const onFinish = (values) => {
    addAPI(values);
  };
  const addAPI = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/addProduct", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.responseCode === "新增成功") {
        alert("新增成功");
        router.push("/permission/productList");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="width100 pl-20 pr-20"
      style={{ maxWidth: "calc(100vw - 276px)" }}
    >
      <div className="max-width1500 mr-auto pt-50">
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          labelAlign="right"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="產品名稱"
            name="ProductName"
            rules={[
              {
                required: true,
                message: "輸入產品名稱",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="產品價格"
            name="Price"
            rules={[
              {
                required: true,
                message: "輸入產品價格",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="產品資訊" name="Deatils">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="折扣" name="Discount">
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
