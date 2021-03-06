import React from "react";
import MyPlaceItem from "./MyPlaceItem";

const MyPlaceList = (props: {
  result: string;
  itemList: any;
  selectMarker: (id: number) => void;
  setSavePlace: (place: any) => void;
}) => {
  const { result, itemList, selectMarker, setSavePlace } = props;
  const list = itemList.map((item: any) => {
    return (
      <MyPlaceItem
        key={item.id}
        id={item.id}
        place={item.place}
        selectMarker={selectMarker}
        setSavePlace={setSavePlace}
      />
    );
  });
  return (
    <div className="place-list">
      <div className="main-title">{result} 검색결과 +</div>
      {list.length > 0 ? (
        list
      ) : (
        <div className="absence">플레이스가 없습니다</div>
      )}
    </div>
  );
};

export default MyPlaceList;
