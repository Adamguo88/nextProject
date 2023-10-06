"use client";
import React, { useState } from "react";
export default function page() {
  const [files, setFiles] = useState({});
  const handleUploadPDF = (file) => {
    console.log(file);
    const fileData = file.target.files?.[0];
    const fileName = fileData.name;
    setFiles(fileData);
  };

  const data = {
    userName: "hello world",
    password: "123456",
    age: "99",
    amount: 1,
  };

  const apiPost = async () => {
    const myFormData = new FormData();
    myFormData.append("pdf", files);
    myFormData.append("info", JSON.stringify(data));

    const url = "http://localhost:3000/api/pdfTest";
    const result = await fetch(url, {
      method: "POST",
      body: myFormData,
    });
    const response = await result.json();
    console.log(response);
  };
  return (
    <>
      <label
        htmlFor="uploadPDF"
        className="color-white bg-green br-5 btn-pointer"
        style={{ padding: "6px 15px" }}
      >
        上傳檔案
      </label>
      <input
        type="file"
        name="uploadPDF"
        id="uploadPDF"
        accept=".pdf"
        multiple="multiple"
        style={{ zIndex: "-1", width: 0 }}
        onChange={handleUploadPDF}
      />
      <button onClick={apiPost}>上傳</button>
    </>
  );
}
