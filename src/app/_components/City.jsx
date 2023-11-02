"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Select, Button } from "antd";
import cityCountyData from "@/assets/Json/cityCountyData.json";

export default function City({ setIsMarkerList }) {
  const [isTaiwan, setIsTaiwan] = useState({ all: [], city: [] });
  const [isSelectValue, setIsSelectValue] = useState({ city: "", area: "" });
  const [isArea, setIsArea] = useState([]);

  const handleSearch = () => {
    if (!isSelectValue.city && !isSelectValue.area) {
      console.log("不得為空");
      return;
    }

    if (!!isSelectValue.city && !isSelectValue.area) {
      const findMarker = isTaiwan.all.find(
        (item) => item.COU_NAME === isSelectValue.city
      ).areas;
      setIsMarkerList(findMarker);
    }

    if (!!isSelectValue.city && !!isSelectValue.area) {
      const findMarker = isTaiwan.all
        .find((item) => item.COU_NAME === isSelectValue.city)
        .areas.find((item) => item.AREA_NAME === isSelectValue.area);
      setIsMarkerList([findMarker]);
    }
  };
  useEffect(() => {
    const taiwan = cityCountyData.data;
    const allCity = taiwan.map((item) => ({
      label: item.COU_NAME,
      value: item.COU_NAME,
    }));
    setIsTaiwan({
      all: taiwan,
      city: allCity,
    });
  }, []);
  return (
    <Row gutter={[0, 15]}>
      <Col span={24}>
        <Select
          placeholder="縣市"
          style={{
            width: "150px",
          }}
          options={isTaiwan.city}
          onChange={(e) => {
            const findArea = isTaiwan.all
              .find((item) => item.COU_NAME === e)
              .areas.map((item) => ({
                ...item,
                label: item.AREA_NAME,
                value: item.AREA_NAME,
              }));
            setIsSelectValue({ city: e, area: "" });
            setIsArea(findArea);
          }}
          allowClear
        />
      </Col>
      <Col span={24}>
        <Select
          placeholder="鄉鎮市區"
          style={{
            width: "150px",
          }}
          value={isSelectValue.area}
          onChange={(e) => setIsSelectValue({ ...isSelectValue, area: e })}
          options={isArea}
          allowClear
        />
      </Col>
      <Col span={24}>
        <Button type="primary" block onClick={handleSearch}>
          確定
        </Button>
      </Col>
    </Row>
  );
}
