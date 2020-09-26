import React, { useState, useEffect } from "react";

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;
}) => {
  const { id, place, selectMarker } = props;

  // 정보 더보기
  const [info, setInfo] = useState({
    introduction: "",
    score: 0,
    holidayName: "",
    adress: "",
    photoUrl: [""],
    photoListWidth: 0,
    menu: [""],
  });

  // 정보 더보기 보여짐 유무
  const [isOn, setIsOn] = useState(false);

  // 각 정보 변경될 경우 정보 더보기 닫기
  useEffect(() => {
    setIsOn(false);
  }, [place.id]);

  // 장소 태그
  let tagArr: string[] = [];
  let tag: string = place.category_name;
  tag = tag.replace(/(\s*)/g, "");
  tagArr = tag.split(">");

  // 장소 전화번호
  let phone: string = "";
  place.phone !== "" && (phone += place.phone);

  // 로컬 서버에 장소 더보기 요청
  const getPlaceInfo = (place: any) => {
    fetch(`http://localhost:3001/api?id=${place.id}`)
      .then((res) => res.json())
      .then((dataJSON) => {
        // 데이터 저장
        // const dataJSON = JSON.parse(data);

        // 이곳에 있는 정보로 데이터 세팅
        // console.log(placeData.basicInfo.placenamefull);

        // 장소 더보기 세팅
        setPlaceInfo(dataJSON);
      });
  };

  // 장소 더보기 세팅
  const setPlaceInfo = (data: any) => {
    // 더보기 항목
    let introduction: string = "";
    let score: number = 0;
    let holidayName: string = "";
    let adress: string = "";
    let photoUrl: string[] = [];
    let menu: string[] = [];

    // UI 컨트롤
    let photoListWidth: number = 0;

    // 소개
    if (data.basicInfo.hasOwnProperty("introduction")) {
      introduction = data.basicInfo.introduction;
    }

    // 평점
    if (data.comment.scorecnt !== 0) {
      const scoreCnt: number = data.comment.scorecnt;
      const scoreSum: number = data.comment.scoresum;
      score = Math.floor((scoreSum / scoreCnt) * 10) / 10;
    } else {
      score = -1;
    }

    // 휴무일
    if (data.basicInfo.hasOwnProperty("openHour")) {
      holidayName = data.basicInfo.openHour.offdayList[0].holidayName;
    }

    // 주소
    if (data.basicInfo.hasOwnProperty("address")) {
      const newaddrfullname: string =
        data.basicInfo.address.region.newaddrfullname; // 지역
      const newaddrfull: string = data.basicInfo.address.newaddr.newaddrfull; // 도로명
      const bsizonno: string = data.basicInfo.address.newaddr.bsizonno; // 우편번호
      let addrdetail: string = ""; // 상세 주소
      if (data.basicInfo.address.hasOwnProperty("addrdetail")) {
        addrdetail = data.basicInfo.address.addrdetail;
      }
      adress =
        newaddrfullname +
        " " +
        newaddrfull +
        " " +
        addrdetail +
        " (우)" +
        bsizonno;
    }

    // 사진
    if (data.photo.photoCount !== 0) {
      const photoUrlArr: string[] = [];
      photoUrl = data.photo.photoList.map((item: any) => {
        return item.orgurl;
      });
      photoListWidth = photoUrl.length * 130;
    }

    // 메뉴
    if (data.hasOwnProperty("menuInfo")) {
      menu = data.menuInfo.bottomList;
    }

    setInfo({
      introduction: introduction,
      score: score,
      holidayName: holidayName,
      adress: adress,
      photoUrl: photoUrl,
      photoListWidth: photoListWidth,
      menu: menu,
    });
  };

  return (
    <div>
      <div
        className={isOn ? "basic on" : "basic"}
        onClick={() => {
          selectMarker(id);
          getPlaceInfo(place);
          isOn ? setIsOn(false) : setIsOn(true);
        }}
      >
        <div className="tag">
          <span>{tagArr[0]}</span>
          <span>{tagArr[1]}</span>
          {tagArr[2] !== undefined && <span>{tagArr[2]}</span>}
        </div>
        <div className="name">{place.place_name}</div>
        <a href={"tel:" + phone} className="phone">
          {phone}
        </a>
        <a href={place.place_url} className="url" target="_balnk">
          MORE
        </a>
      </div>
      <div className={isOn ? "detail on" : "detail"}>
        <div className="photo">
          <div className="inner" style={{ width: info.photoListWidth + "px" }}>
            {info.photoUrl[0] !== "" &&
              info.photoUrl.map((item: any, idx: number) => {
                return <img key={idx} src={item} />;
              })}
          </div>
        </div>
        <div className="introduction">{info.introduction}</div>
        <div className="adress">{info.adress}</div>
        <div className={info.score !== -1 ? "score on" : "score"}>
          평점 <span className="number">{info.score}</span>
          <span className="frame">
            <span className="line">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span
              className="gauge"
              style={{ width: info.score * 20 + "%" }}
            ></span>
          </span>
        </div>
        <div className="holidayName">{info.holidayName}</div>
        <div>
          {info.menu.map((item: any, idx: number) => {
            return (
              <div key={idx}>
                {item.menu}: <strong>{item.price}원</strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapItem;
