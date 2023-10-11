"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Input, Button, Row, Col } from "antd";
export default function UpdatedPage() {
  const router = useRouter();
  const params = useParams();
  const [apiData, setApiData] = useState({});
  const [isApiImage, setIsApiImage] = useState([]);
  const [isDeleteList, setIsDeleteList] = useState([]);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    updatedFetchData(values);
  };
  const deleteImage = (id) => {
    setIsDeleteList([...isDeleteList, id]);
    const newImageList = isApiImage.filter((item) => item.ID !== id);
    setIsApiImage(newImageList);
  };

  const updatedFetchData = async (values) => {
    console.log(isDeleteList);
    const url = "http://localhost:3000/api/productUpdate";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ID: apiData.ID,
        updateData: values,
        imgList: isDeleteList,
      }),
    });
    const { responseCode, responseMsg } = await response.json();

    if (responseCode === "0") {
      alert(responseCode + "," + responseMsg);
      setIsDeleteList([]);
      router.back();
      return;
    }
    alert(responseCode + "," + responseMsg);
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
      setIsApiImage(data.responseImage);
    };
    findAPIData();
  }, []);
  return (
    <div
      className="width100"
      style={{ maxWidth: "calc(100vw - 276px)", paddingTop: "20px" }}
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

          <Row
            gutter={[10, 10]}
            className="width100 flex flex-wrap "
            justify={{
              xxl: "flex-start",
              xl: "flex-start",
              lg: "flex-start",
              md: "flex-start",
              sm: "flex-start",
              xs: "center",
            }}
          >
            {isApiImage?.map((item) => {
              return (
                <Col
                  className="width100 flex flex-column"
                  key={item.ID}
                  xxl={6}
                  xl={6}
                  lg={8}
                  md={12}
                  sm={12}
                  xs={18}
                >
                  <img
                    className="p-5"
                    src={item.link}
                    alt={item.Name}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteImage(item.ID)}
                  >
                    delete
                  </Button>
                </Col>
              );
            })}
          </Row>

          <Form.Item className="mt-20 flex justifyEnd">
            <Button type="primary" htmlType="submit">
              送出
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
