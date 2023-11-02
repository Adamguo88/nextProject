"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";

export default function OpenPage() {
  const [data, setData] = useState([]);

  const handleDownload = async (file) => {
    const downloadResponse = await fetch(
      "http://localhost:3000/api/downLoadFile",
      {
        method: "POST",
        body: JSON.stringify({ name: file }),
        responseType: "blob",
      }
    );
    const expressBlob = await downloadResponse.blob();
    if (expressBlob) {
      const blobTest = new Blob([expressBlob], {
        type: "application/pdf;charset=UTF-8",
      });
      const url = URL.createObjectURL(blobTest);

      let downloadBtn = document.createElement("a");
      downloadBtn.href = url;
      downloadBtn.download = file;
      downloadBtn.click();
      URL.revokeObjectURL(url);
      downloadBtn = null;
      return;
    }
  };
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
                  {item.Files.map((file, index) => {
                    return (
                      <Button
                        key={index}
                        type="primary"
                        block
                        style={{ marginTop: 5 }}
                        onClick={() => handleDownload(file.FileName)}
                      >
                        {file.FileName}
                      </Button>
                    );
                  })}
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
