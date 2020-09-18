import React, { useState } from "react";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;
  
}) => {

  let txt = '';
  const { id, place, selectMarker } = props;

  return (
    <div
      onClick={() => {
        selectMarker(id);
      }}
    >
      <div className="name">{place.place_name}</div>
      <div>{txt}</div>
      {/* <div className="name">{place.place_name}</div> */}
      {/* <a href={"tel:" + place.phone}>전화: {place.phone}</a> */}
    </div>
  );
};

export default MapItem;