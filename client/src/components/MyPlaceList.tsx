import React from "react";
import MyPlaceItem from "./MyPlaceItem";

const MyPlaceList = (props: {
  itemList: any;
  selectMarker: (id: number) => void;
}) => {
  const { itemList, selectMarker } = props;
  const list = itemList.map((item: any) => {
    return <MyPlaceItem key={item.id} id={item.id} place={item.place} selectMarker={selectMarker} />;
  });
  return <div className="list">{list}</div>;
};

export default MyPlaceList;
