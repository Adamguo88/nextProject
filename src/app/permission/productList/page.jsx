"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button } from "antd";

const ProductListPage = () => {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();

  const columns = [
    {
      title: "產品名稱",
      dataIndex: "ProductName",
    },
    {
      title: "價格",
      dataIndex: "Price",
    },
    {
      title: "折扣",
      dataIndex: "Discount",
    },
    {
      title: "修改",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => edit(record.ID)}>
            編輯
          </Button>
          <Button
            className="ml-10"
            type="primary"
            onClick={() => removeData(record.ID)}
            danger
          >
            刪除
          </Button>
        </>
      ),
    },
  ];
  const edit = (recordID) => {
    router.push(`/permission/updated/pageID=${recordID}`, {
      query: { id: recordID },
    });
  };
  const removeData = async (recordID) => {
    const url = "http://localhost:3000/api/productUpdate";
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(recordID),
    });
    const result = await response.json();
    if (result.responseCode === "0") {
      alert("刪除成功");
      const newTableData = tableData.filter((item) => item.key !== recordID);
      setTableData(newTableData);
    } else {
      alert("刪除失敗");
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/productList", {
          method: "GET",
        });
        const result = await response.json();

        if (result.responseCode === "讀取成功") {
          const newData = result.data.map((item) => {
            return { key: item.ID, ...item };
          });
          setTableData(newData);
        } else {
          alert("讀取失敗");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div
        style={{ maxWidth: "calc(100vw - 276px)" }}
        className="pl-20 pr-20 width100"
      >
        <Table columns={columns} dataSource={tableData} />
      </div>
    </>
  );
};
export default ProductListPage;
