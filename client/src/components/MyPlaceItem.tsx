import React, { useState, useEffect } from "react";

const MyPlaceItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;
}) => {
  const { id, place, selectMarker } = props;

  // 정보 더보기
  const [info, setInfo] = useState({
    introduction: "",
    score: 0,
    people: 0,
    timeName: "",
    timeSE: "",
    dayOfWeek: "",
    adress: "",
    photoUrl: [""],
    photoListWidth: 0,
    menu: [""],
    commentList: [
      {
        contents: "",
        point: 0,
        username: "",
        date: "",
      },
    ],
  });

  // 리뷰 더보기 보여질 항목 인덱스
  const [reviewIdx, setReviewIdx] = useState({
    idx: 0,
    isOn: false,
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
    // http://192.168.219.104/
    fetch(`http://localhost:3001/api?id=${place.id}`)
      .then((res) => res.json())
      .then((data) => {
        // 데이터 저장
        // const dataJSON = JSON.parse(data);

        // 이곳에 있는 정보로 데이터 세팅
        console.log(`https://place.map.kakao.com/m/${place.id}`);
        console.log(`https://place.map.kakao.com/m/main/v/${place.id}`);

        // 장소 더보기 세팅
        setPlaceInfo(data);
      });
  };

  // 장소 더보기 세팅
  const setPlaceInfo = (data: any) => {

    // 더보기 항목
    let introduction: string = "";
    let score: number = 0;
    let people: number = 0;
    let timeName: string = "";
    let timeSE: string = "";
    let dayOfWeek: string = "";
    let adress: string = "";
    let photoUrl: string[] = [];
    let menu: any[] = [];
    let commentList: any[] = [];

    // UI 컨트롤
    let photoListWidth: number = 0;

    // 소개
    if (data.basicInfo.hasOwnProperty("introduction")) {
      introduction = data.basicInfo.introduction;
    }

    // 리뷰
    if (data.comment.scorecnt !== 0) {
      const scoreCnt: number = data.comment.scorecnt;
      const scoreSum: number = data.comment.scoresum;
      commentList = data.comment.list;
      score = Math.floor((scoreSum / scoreCnt) * 10) / 10;
      people = scoreCnt;
    } else {
      score = -1;
    }

    // 영업시간
    if (data.basicInfo.hasOwnProperty("openHour")) {
      if (data.basicInfo.openHour.hasOwnProperty("periodList")) {
        if (data.basicInfo.openHour.periodList[0].hasOwnProperty("timeList")) {
          timeName = data.basicInfo.openHour.periodList[0].timeList[0].timeName;
          timeSE = data.basicInfo.openHour.periodList[0].timeList[0].timeSE;
          dayOfWeek = data.basicInfo.openHour.periodList[0].timeList[0].dayOfWeek;
        }
      }
    }

    // 주소
    if (data.basicInfo.hasOwnProperty("address")) {
      const newaddrfullname: string =
        data.basicInfo.address.region.newaddrfullname; // 지역
      let newaddrfull: string = ""; // 도로명
      let addrdetail: string = ""; // 상세 주소
      if (data.basicInfo.address.hasOwnProperty("newaddr")) {
        newaddrfull = data.basicInfo.address.newaddr.newaddrfull;
      }
      if (data.basicInfo.address.hasOwnProperty("addrdetail")) {
        addrdetail = data.basicInfo.address.addrdetail;
      }
      adress = newaddrfullname + " " + newaddrfull + " " + addrdetail;
    }

    // 사진
    if (data.photo.photoCount !== 0) {
      photoUrl = data.photo.photoList.map((item: any) => {
        return item.orgurl;
      });
      photoListWidth = photoUrl.length * 300;
    } else {
      photoUrl.push("N");
    }

    // 메뉴
    if (data.hasOwnProperty("menuInfo")) {
      if (data.menuInfo.hasOwnProperty("bottomList")) {
        menu = data.menuInfo.bottomList;
      }
    }

    setInfo({
      introduction: introduction,
      score: score,
      people: people,
      timeName: timeName,
      timeSE: timeSE,
      dayOfWeek: dayOfWeek,
      adress: adress,
      photoUrl: photoUrl,
      photoListWidth: photoListWidth,
      menu: menu,
      commentList: commentList,
    });
  };

  const setReviewMore = (idx: number) => {
    if (reviewIdx.idx === idx && reviewIdx.isOn) {
      setReviewIdx({
        idx: idx,
        isOn: false,
      });
    } else {
      setReviewIdx({
        idx: idx,
        isOn: true,
      });
    }
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
        {phone && (
          <a href={"tel:" + phone} className="phone">
            <i className="fa fa-phone"></i>
            {phone}
          </a>
        )}
        <a href={place.place_url} className="url" target="_balnk">
          더보기
        </a>
      </div>
      <div className={isOn ? "detail on" : "detail"}>
        {info.photoUrl[0] !== "N" && (
          <div className="photo">
            <div
              className="inner"
              style={{ width: info.photoListWidth + "px" }}
            >
              {info.photoUrl.map((item: any, idx: number) => {
                return <img key={idx} src={item} />;
              })}
            </div>
          </div>
        )}

        {info.introduction !== "" && (
          <div className="introduction">{info.introduction}</div>
        )}

        <div className="adress">{info.adress}</div>

        {info.timeName !== "" && (
          <div className="time">
            <span>{info.timeName}</span>
            <span>{info.timeSE}</span>
            <span>{info.dayOfWeek}</span>
          </div>
        )}

        {info.menu.length > 0 && (
          <div className="menu">
            <div className="title">대표메뉴</div>
            {info.menu.map((item: any, idx: number) => {
              return (
                <div className="item" key={idx}>
                  <span>{item.menu}</span>
                  <strong>{item.price}원</strong>
                </div>
              );
            })}
          </div>
        )}

        {info.score !== -1 && (
          <div className="score">
            <span className="result">총 {info.score}점</span>
            <span className="people">({info.people}명)</span>
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
        )}

        {info.score !== -1 && (
          <div className="review">
            <div className="title">방문자 리뷰</div>
            {info.commentList.map((item: any, idx: number) => {
              return (
                <div className="item" key={idx}>
                  <div className="info">
                    <span className="point">{item.point}점</span>
                    <span className="name">{item.username}</span>
                    <span className="date">{item.date}</span>
                    <button
                      className="more"
                      onClick={() => {
                        setReviewMore(idx);
                      }}
                    >
                      {reviewIdx.idx === idx && reviewIdx.isOn
                        ? "닫기"
                        : "더보기"}
                    </button>
                  </div>
                  <div
                    className={
                      reviewIdx.idx === idx && reviewIdx.isOn
                        ? "text on"
                        : "text"
                    }
                  >
                    {item.contents}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaceItem;
