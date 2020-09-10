import React from "react";
import MapItem from "./MapItem";

const MapList = (props: {
  itemList: any;
  selectMarker: (id: number) => void;
}) => {
  const { itemList, selectMarker } = props;
  const list = itemList.map((item: any) => {
    return <MapItem key={item.id} id={item.id} place={item.place} selectMarker={selectMarker}  />;
  });
  return <div className="list">{list}</div>;
};

export default MapList;