import React, { useState } from "react";
import MapPhotoItem from "./MapPhotoItem";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;
}) => {
  const { id, place, selectMarker } = props;

  const [introduction, setIntroduction] = useState(''); // 소개
  const [score, setScore] = useState(0); // 평점

  // 장소 정보 초기화
  // const [placeData, setPlaceData] = useState({
  //   introduction: "",
  //   holidayName: "",
  //   score: 0,
  //   menuInfo: [
  //     {
  //       menu: "",
  //       price: "",
  //     },
  //   ],
  //   photoList: [
  //     {
  //       orgurl: "",
  //     },
  //   ],
  // });

  // 장소 정보 보여짐 유무
  const [isOn, setIsOn] = useState(false);
  
  const list: any = [];

  // 관련 태그
  let tagArr: string[] = [];
  let tag: string = place.category_name;
  tag = tag.replace(/(\s*)/g, "");
  tagArr = tag.split(">");

  // 전화번호
  let phone: string = "";
  place.phone !== "" && (phone += place.phone);

  // 로컬 서버에 장소 정보 요청
  const getPlaceInfo = (place: any) => {
    fetch(`http://localhost:3001/api?id=${place.id}`)
      .then((res) => res.json())
      .then((data) => {

        // 장소 정보 세팅
        setPlaceInfo(data);
      });
  };

  // 장소 정보 세팅
  const setPlaceInfo = (data: any) => {

    // 소개
    setIntroduction(data.basicInfo.introduction);

    // 평점
    const scoreCnt: number = data.comment.scorecnt;
    const scoreSum: number = data.comment.scoresum;
    setScore(Math.floor((scoreSum / scoreCnt) * 10) / 10);

    console.log(data);

    // 휴무일
    // const holidayName: string = data.basicInfo.openHour.offdayList[0].holidayName;

    // // 평점
    // const scoreCnt: number = data.comment.scorecnt;
    // const scoreSum: number = data.comment.scoresum;
    // const score: number = Math.floor((scoreSum / scoreCnt) * 10) / 10;

    // // 메뉴
    // const menuInfo: any[] = data.menuInfo.bottomList;

    // // 사진
    // const photoList: any[] = data.photo.photoList;

    // setPlaceData({
    //   introduction: introduction,
    //   holidayName: holidayName,
    //   score: score,
    //   menuInfo: [...menuInfo],
    //   photoList: [...photoList],
    // });

    // photoList.forEach((item: any, idx: number) => {
    //   list.push(<MapPhotoItem key={idx} />);
    // })

    // setIsOn(true);
  };

  return (
    <div
      onClick={() => {
        selectMarker(id);
        getPlaceInfo(place);
      }}
    >
      <div className="basic">
        <div className="tag">
          <span>{tagArr[0]}</span>
          <span>{tagArr[1]}</span>
          {tagArr[2] !== undefined && <span>{tagArr[2]}</span>}
        </div>
        <div className="name">{place.place_name}</div>
        <div className="address">{place.road_address_name}</div>
        <a href={"tel:" + phone} className="phone">
          {phone}
        </a>
        <a href={place.place_url} className="url" target="_balnk">
          More
        </a>
      </div>
      <div className={isOn ? "detail on" : "detail"}>

        <div className="photo">
          <div className="inner">
            {list}
            {/* <img src={placeData.photoList[1].orgurl} /> */}
          </div>
        </div>
        <div>{introduction}</div>
        <div>{score}</div>
        {/* <div>{placeData.holidayName}</div>
        <div>{placeData.menuInfo[0].menu}</div>
        <div>{placeData.menuInfo[0].price}</div> */}
      </div>
    </div>
  );
};

export default MapItem;
