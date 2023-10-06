"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
export default function AddPage() {
  const [files, setFiles] = useState([]);
  const router = useRouter();

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
      console.log(size);
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
    addAPI(values);
  };
  const addAPI = async (data) => {
    const newData = { ...data, img: files };
    try {
      const response = await fetch("http://localhost:3000/api/addProduct", {
        method: "POST",
        body: JSON.stringify(newData),
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
  useEffect(() => {
    console.log(files);
    console.log(files[0]?.link);
  }, [files]);
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
