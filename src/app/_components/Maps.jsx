// "use client";
// import React, { useEffect, useRef } from "react";
// import LeaFlet from "leaflet";
// import { Icon } from "leaflet";
// import "leaflet/dist/leaflet.css";

// export default function page() {
//   const mapRef = useRef();

//   useEffect(() => {
//     const position = [22.656922947200943, 120.30353546688235];
//     const myMap = LeaFlet.map(mapRef.current).setView(position, 13);
//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(myMap);

//     const myIcon = L.icon({

//     })

//     L.marker(position)
//       .addTo(myMap)
//       .bindPopup("A pretty CSS popup.<br> Easily customizable.")
//       .openPopup();
//   }, []);
//   return <div className="width100 react_Map height100vh" ref={mapRef}></div>;
// }

"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Maps({ isMarkerList }) {
  const [isPosition, setIsPosition] = useState([
    22.656575851229302, 120.31144823068438,
  ]);
  let DefaultIcon = L.icon({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default
      .src,
    iconUrl: require("leaflet/dist/images/marker-icon.png").default.src,
    shadowUrl: require("leaflet/dist/images/marker-shadow.png").default.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const MapEvent = (props) => {
    const map = useMap({});

    if (isMarkerList?.length >= 1) {
      map.flyTo(isPosition, 15, {
        animate: true,
        duration: 1.5,
      });
    } else {
      map.flyTo([22.656575851229302, 120.31144823068438]);
    }
    // console.log(props);
    return null;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setIsPosition([latitude, longitude]);
        console.log(`緯度：${latitude}，經度：${longitude}`);
      });
    } else {
      console.log("瀏覽器不支持地理定位");
    }
  }, []);

  useEffect(() => {
    if (isMarkerList.length >= 1) {
      const lat = isMarkerList?.[0]?.LATITUDE;
      const long = isMarkerList?.[0]?.LONGITUDE;
      setIsPosition([lat, long]);
    }
  }, [isMarkerList]);

  return (
    <div className="width100 height100vh">
      <MapContainer center={isPosition} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvent center={isPosition} zoom={15} />

        {isMarkerList.length >= 1 ? (
          isMarkerList.map((item, index) => {
            return (
              <Marker position={[item.LATITUDE, item.LONGITUDE]} key={index}>
                <Popup>
                  區域:{item.AREA_NAME}
                  <br />
                  郵遞區號:{item.ZIPCODE}
                </Popup>
              </Marker>
            );
          })
        ) : (
          <Marker position={isPosition}>
            <Popup>您現在的座標</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
