"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Pagination } from "antd";

import { changePage } from "@/utils/ChangePage";
import MyPagination from "./MyPagination";

export default function page() {
  const [isTableData, setIsTableData] = useState([]); // 所有資料
  const [isShowData, setIsShowData] = useState([]); // 頁數
  const [cachePage, setCachePage] = useState(1); // 一次展示數量

  const handleChangePage = useCallback(
    (e = parseInt(cachePage || 1), pagesSize = 10) => {
      if (!isTableData?.length) return;
      const response = changePage({
        tableData: isTableData, // 所有資料
        e, // 頁數
        pagesSize, // 一次展示數量
      });
      setIsShowData(response.data);
      setCachePage(response.cachePage);
    },
    [isTableData, setCachePage, cachePage]
  );

  const myHandleChangePage = (value) => {
    console.log(value);
  };
  useEffect(() => {
    const fakeDataArray = Array.from({ length: 100 }, (_, i) => ({
      CusName: i + 1,
      ConsName: i + 1,
    }));
    setIsTableData(fakeDataArray);
    setIsShowData(fakeDataArray.slice(0, 10));
    // handleChangePage();
  }, []);
  return (
    <div className="width100 ">
      <div className="max-width1500 mr-auto">
        <div className="mt-10">
          <table
            style={{
              width: "100%",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <thead>
              <tr>
                <th className="t-center width50">類型</th>
                <th className="t-center width50">契約編號</th>
              </tr>
            </thead>
            <tbody>
              {isShowData?.map((table) => {
                return (
                  <tr key={table.CusName} className="width100">
                    <td className="t-center">
                      <div className="width100">{table.CusName}</div>
                    </td>
                    <td className="t-center">
                      <div className="width100">{table.ConsName}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex-center mt-20">
            <Pagination
              defaultCurrent={cachePage}
              current={cachePage}
              total={isTableData.length}
              onChange={handleChangePage}
              defaultPageSize={10}
              showSizeChanger={false}
            />
          </div>
          <div className="flex-center mt-20">
            <MyPagination
              total={isTableData.length}
              defaultPage={1}
              currentPage={1}
              onChange={myHandleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
