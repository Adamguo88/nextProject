"use client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";

export default function OpenPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCardAPI = async () => {
      const url = "http://localhost:3000/api/productList";
      const response = await fetch(url);
      const apiData = await response.json();
      setData(apiData.data);
    };
    getCardAPI();
  }, []);
  return (
    <div
      className="width100 pt-20 pb-20 bg-gray"
      style={{ minHeight: "calc(100vh - 46px)" }}
    >
      <div className="max-width1500 mr-auto">
        <Row gutter={[24, 24]}>
          {data.map((item) => {
            return (
              <Col span={8} key={item.ID}>
                <Card title={item.ProductName} bordered={false}>
                  <span>{item.Deatils}</span>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
