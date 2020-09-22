import React, { useState } from "react";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;

}) => {

  const { id, place, selectMarker } = props;

  // 장소 정보 초기화
  const [placeInfo, setPlaceInfo] = useState({
    basicInfo: {
      placenamefull: ''
    },
    // menuInfo: {
    //   bottomList: [
    //       {
    //         price: ''
    //     }
    //   ]
    // }
  });

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

        // 이곳에 있는 정보로 데이터 세팅
        console.log(data)
      });
  }
  
  return (
    <div
      onClick={() => {
        selectMarker(id);
        getPlaceInfo(place);
      }}
    >
      <div>
        <div className="tag">
          <span>{tagArr[0]}</span>
          <span>{tagArr[1]}</span>
          {tagArr[2] !== undefined && <span>{tagArr[2]}</span>}
        </div>
        <div className="name">{place.place_name}</div>
        <div className="address">{place.road_address_name}</div>
        <a href={'tel:' + phone} className="phone">{phone}</a>
        <a href={place.place_url} className="url" target="_balnk">More</a>
      </div>
      <div>
        <div>{placeInfo.basicInfo.placenamefull}</div>
        {/* <div>{placeInfo.menuInfo.bottomList[0].price}</div> */}
      </div>


    </div>
  );
};

export default MapItem;