"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import City from "../_components/City";

const Maps = dynamic(() => import("@/app/_components/Maps"), {
  loading: () => <h1>Loading...</h1>,
  ssr: false,
});
export default function page() {
  const [isMarkerList, setIsMarkerList] = useState([]);

  return (
    <div className="width100 flex">
      <div className="width20 p-10">
        <City setIsMarkerList={setIsMarkerList} />
      </div>
      <div className="react_Map width80">
        <Maps isMarkerList={isMarkerList} />
      </div>
    </div>
  );
}
