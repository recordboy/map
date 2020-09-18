import React, { useState } from "react";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;

}) => {

  const { id, place, selectMarker } = props;

  // 관련 태그
  let tagArr: string[] = [];
  let tag: string = place.category_name;
  tag = tag.replace(/(\s*)/g, "");
  tagArr = tag.split('>');

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
      {/* <div className="name">{place.place_name}</div> */}
      {/* <a href={"tel:" + place.phone}>전화: {place.phone}</a> */}
    </div>
  );
};

export default MapItem;