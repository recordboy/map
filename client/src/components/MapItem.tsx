import React, { useState } from "react";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;

}) => {

  const { id, place, selectMarker } = props;

  // 장소 정보
  const [placeInfo, setPlaceInfo] = useState({});

  // 관련 태그
  let tagArr: string[] = [];
  let tag: string = place.category_name;
  tag = tag.replace(/(\s*)/g, "");
  tagArr = tag.split('>');

  // 전화번호
  let phone: string = '';
  place.phone !== '' && (phone += place.phone);

  // 로컬 서버에 장소 정보 요청
  const getPlaceInfo = (place: any) => {

    fetch(`http://localhost:3001/api?id=${place.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaceInfo(data);

        console.log(placeInfo)

        // console.log(placeInfo);
      });
  }
  
  return (
    <div
      onClick={() => {
        selectMarker(id);
        getPlaceInfo(place);

        console.log(placeInfo);
      }}
    >
      <div className="tag">
        <span>{tagArr[0]}</span>
        <span>{tagArr[1]}</span>
        {tagArr[2] !== undefined && <span>{tagArr[2]}</span>}
      </div>
      <div className="name">{place.place_name}</div>
      <div className="address">{place.road_address_name}</div>
      <a href={'tel:' + phone} className="phone">{phone}</a>
      <a href={place.place_url} className="url" target="_balnk">More</a>
    {/* <div>{placeInfo.basicInfo.placenamefull}</div> */}
    {/* <div>{console.log(1)}</div> */}
    </div>
  );
};

export default MapItem;