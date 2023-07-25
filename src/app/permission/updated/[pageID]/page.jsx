"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Input, Button } from "antd";
export default function UpdatedPage() {
  const router = useRouter();
  const params = useParams();
  const [apiData, setApiData] = useState({});
  const [form] = Form.useForm();
  const onFinish = (values) => {
    updatedFetchData(values);
  };

  const updatedFetchData = async (values) => {
    const url = "http://localhost:3000/api/productUpdate";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ID: apiData.ID,
        updateData: values,
      }),
    });
    const { responseCode } = await response.json();

    if (responseCode === "0") {
      router.back();
      return;
    }
    alert("更新失敗");
  };

  useEffect(() => {
    const myQuery = params.pageID.split("pageID%3D")[1];
    const findAPIData = async () => {
      const res = await fetch("http://localhost:3000/api/productDetails", {
        method: "POST",
        body: JSON.stringify(myQuery),
      });
      const data = await res.json();
      console.log(data);
      const responseData = data.responseData;
      form.setFieldsValue({
        ProductName: responseData.ProductName,
        Price: responseData.Price,
        Deatils: responseData.Deatils,
        Discount: responseData.Discount,
      });
      setApiData(responseData);
    };
    findAPIData();
  }, []);
  return (
    <div
      className="width100"
      style={{ maxWidth: "calc(100vh - 276px)", paddingTop: "20px" }}
    >
      <div className="max-width1500 mr-auto">
        <Form
          form={form}
          name="basic"
          labelAlign="left"
          colon={false}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="產品名稱" name="ProductName">
            <Input />
          </Form.Item>

          <Form.Item label="價格" name="Price">
            <Input />
          </Form.Item>
          <Form.Item label="產品簡述" name="Deatils">
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item label="折扣" name="Discount">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              送出
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
