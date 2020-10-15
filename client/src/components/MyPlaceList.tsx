import React from "react";
import MyPlaceItem from "./MyPlaceItem";

const MyPlaceList = (props: {
  itemList: any;
  selectMarker: (id: number) => void;
  setLocalData: (place: any) => void;
}) => {
  const { itemList, selectMarker, setLocalData } = props;
  const list = itemList.map((item: any) => {
    return <MyPlaceItem key={item.id} id={item.id} place={item.place} selectMarker={selectMarker} setLocalData={setLocalData} />;
  });
  return <div className="list">{list}</div>;
};

export default MyPlaceList;
