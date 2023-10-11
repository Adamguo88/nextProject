"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Input, Button, Row, Col } from "antd";
export default function UpdatedPage() {
  const router = useRouter();
  const params = useParams();
  const [apiData, setApiData] = useState({}); // 讀取API資料
  const [isApiImage, setIsApiImage] = useState([]); // 讀取API照片BASE64
  const [isDeleteList, setIsDeleteList] = useState([]); // 已刪除BASE64的編號
  const [files, setFiles] = useState([]); // 即將上傳的新照片

  const [form] = Form.useForm();

  const handleFunction = {
    compressImageQuality: (base64) => {
      let img = new Image();
      let quality = 0.5;
      img.src = base64;

      img.onload = function () {
        let maxWidth = 200;
        let maxHeight = 200;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var compressImg = canvas.toDataURL("/image/jpeg", quality);
        return compressImg;
      };
    },
    compressImage: (myFile) => {
      let img = new Image();
      let quality = 0.5;
      img.src = myFile.base64;

      img.onload = function () {
        let maxWidth = 200;
        let maxHeight = 200;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var myBase64 = canvas.toDataURL("/image/jpeg", quality);
        handleFunction.updatedCompressImg(myBase64, myFile.name);
      };
    },
    // 裁切後需要使用迴調函數才能取得新的值
    updatedCompressImg: (compressBase64, fileName) => {
      setFiles((data) => [...data, { name: fileName, link: compressBase64 }]);
    },
    roundToTwo: (num) => {
      return +(Math.round(num + "e+2") + "e-2");
    },
  };

  const handleUploadPDF = (file) => {
    const allFiles = [...file.target.files];
    allFiles.forEach((item) => {
      const size = handleFunction.roundToTwo(item.size / 1024 / 1024);
      if (size > 2) {
        return null;
      } else {
        let readerImgFile = new FileReader();
        readerImgFile.readAsDataURL(item);
        readerImgFile.onload = function (e) {
          const saveData = { name: item.name, base64: e.target.result };
          handleFunction.compressImage(saveData);
        };
      }
    });
  };

  const onFinish = (values) => {
    updatedFetchData(values);
  };

  const deleteImage = (id, type) => {
    if (type === "add") {
      const newImageList = files.filter((item) => item.name !== id);
      setFiles(newImageList);
    }

    if (type === "update") {
      setIsDeleteList([...isDeleteList, id]);
      const newImageList = isApiImage.filter((item) => item.ID !== id);
      setIsApiImage(newImageList);
    }
  };

  const updatedFetchData = async (values) => {
    const url = "http://localhost:3000/api/productUpdate";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ID: apiData.ID,
        updateData: values,
        newImg: files,
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

          <label
            htmlFor="img"
            className="color-white bg-green br-5 btn-pointer"
            style={{ padding: "6px 15px" }}
          >
            上傳檔案
          </label>
          <input
            type="file"
            name="img"
            id="img"
            accept="image/*"
            multiple
            style={{ zIndex: "-1", width: 0 }}
            onChange={handleUploadPDF}
          />

          {files.length <= 0 ? null : (
            <div className="width100">
              <span className="fz-24 fw-800">新增照片</span>
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
                {files?.map((item, index) => {
                  return (
                    <Col
                      className="width100 flex flex-column"
                      key={index}
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
                        alt={item.name}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <Button
                        type="primary"
                        danger
                        onClick={() => deleteImage(item.name, "add")}
                      >
                        delete
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}

          {isApiImage.length <= 0 ? null : (
            <div className="width100">
              <span className="fz-24 fw-800">原有照片</span>
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
                        onClick={() => deleteImage(item.ID, "update")}
                      >
                        delete
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}

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
