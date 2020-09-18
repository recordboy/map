import React, { useState } from "react";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;

}) => {

  const { id, place, selectMarker } = props;


  console.log(place.category_name);
  // 관련 태그
  let tagArr: string[] = [];
  let tag: string = place.category_name;
  tag = tag.replace(/(\s*)/g, "");
  tagArr = tag.split('>');

  // 전화번호
  let phone: string = '';
  place.phone !== '' && (phone += place.phone);

  return (
    <div
      onClick={() => {
        selectMarker(id);
      }}
    >
      <div className="tag">
        <span>{tagArr[0]}</span>
        <span>{tagArr[1]}</span>
        <span>{tagArr[2]}</span>
      </div>
      <div className="name">{place.place_name}</div>
      <div className="address">{place.road_address_name}</div>
      <a href={'tel:' + phone} className="phone">{phone}</a>
      <a href={place.place_url} className="url" target="_balnk">More</a>
      {/* <div className="name">{place.place_name}</div> */}
      {/* <a href={"tel:" + place.phone}>전화: {place.phone}</a> */}
    </div>
  );
};

export default MapItem;