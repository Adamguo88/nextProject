"use client";
import React, { useEffect, useState } from "react";

export default function MyPagination({
  total,
  currentPage = 2,
  defaultPage = 1,
  defaultPageList = 10,
  onChange,
}) {
  const [dataLength, setIsDataLength] = useState([]);

  const handleChange = (value) => {
    console.log(value);
  };

  useEffect(() => {
    const buttonLength = Math.ceil(total / defaultPageList);
    const buttonArray = Array.from(
      { length: buttonLength },
      (_, index) => index + 1
    );
    setIsDataLength(buttonArray);
  }, [total, defaultPageList]);

  return (
    <ul className="flex">
      <li onClick={() => handleChange(currentPage - 1, "decrement")}>
        <button
          className={`btn-style bg-transparent p-6-10 ${
            currentPage === 1 || defaultPage === 1 ? "btn-disable" : ""
          }`}
          disabled={currentPage === 1 || defaultPage === 1}
        >
          {"<"}
        </button>
      </li>
      {dataLength?.map((num) => {
        return (
          <li key={num} onClick={() => handleChange(num)}>
            <button
              className={`btn-style bg-transparent p-6-10 ${
                num === currentPage ? "pagination-border color-btn-blue" : ""
              }`}
            >
              {num}
            </button>
          </li>
        );
      })}
      <li onClick={() => handleChange(currentPage + 1, "increment")}>
        <button
          className={`btn-style bg-transparent p-6-10 ${
            currentPage >= dataLength.length ? "btn-disable" : ""
          }`}
          disabled={currentPage === dataLength.length}
        >
          {">"}
        </button>
      </li>
    </ul>
  );
}
