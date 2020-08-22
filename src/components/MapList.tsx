import React, { useState } from "react";
import MapItem from "./MapItem";

const MapList = (props: { itemList: any }) => {
  const { itemList } = props;

  const list = itemList.map((item: any) => {
    return (
      <MapItem
      // name={item.name}
      />
    );
  });


  // let arr: string[] = [];
  // // setList(itemList);

  // itemList.forEach((item: string)=>{
  //   console.log(item);
  // })

  // console.log(list);

  return <div className="list">{list}</div>;
};

// 5491 5023

export default MapList;
