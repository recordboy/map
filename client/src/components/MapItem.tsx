import React, { useState } from "react";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;
  
}) => {

  const { id, place, selectMarker } = props;
  const getItemInfo = (url: string) => {

    // 장소 id
    const urlId: string = url.substr(27, 20);

    // 로컬 서버에 요청
    fetch(`http://localhost:3001/api?id=${urlId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // debugger
      });
  }

  getItemInfo(place.place_url);

  return (
    <div
      onClick={() => {
        selectMarker(id);
      }}
    >
      <div className="name">{place.place_name}</div>
      {/* <div className="name">{place.place_name}</div> */}
      {/* <a href={"tel:" + place.phone}>전화: {place.phone}</a> */}
    </div>
  );
};

export default MapItem;