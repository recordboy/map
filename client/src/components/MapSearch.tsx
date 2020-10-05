import React, { useState } from "react";

// 검색 항목 가져오기
import searchList from "../search-list.json";

const MapSearch = (props: {
  handleKeywordSearch: (item: string) => void;
  handleInputSearch: (item: string) => void;
}) => {
  const { handleKeywordSearch, handleInputSearch } = props;
  const [inputData, setInputData] = useState("");
  const [depth, setDepth] = useState(1);
  const [nextPlace, setNextPlace] = useState({
    selectdepth02: "",
    selectListdepth02: [],
    selectdepth03: "",
    selectListdepth03: [],
  });

  // 검색 항목 더보기 좌표
  let startY: number = 0;
  let endY: number = 0;

  const clickKeywordBtn = (e: any) => {
    handleKeywordSearch(e.target.innerText);
  };

  /**
   * 세로 스와이프 감지 함수 
   * @param {number} listLength 아래로 스와이프할 경우 보여질 리스트 길이
   * @param {object} e 이벤트 객체
   */
  const swipeY = (listLength: number, e: any) => {

    if (e.type === "touchstart") {
      
      console.log(document);
      startY = e.changedTouches[0].clientY;
    }
    if (e.type === "touchend") {
      console.log(2);
      endY = e.changedTouches[0].clientY;

      // 아래로 스와이프
      if (endY > startY && endY - startY > 10) {
        if (depth === 1) {
          listLength > 0 && viewDepth02(e.target.innerText);
        } else if (depth === 2) {
          listLength > 0 && viewDepth03(e.target.innerText);
        }
      
      // 위로 스와이프
      } else if (endY < startY && startY - endY > 10) {
        if (depth === 2) {
          setDepth(1);
        } else if (depth === 3) {
          setDepth(2);
        }
      }
    }
  };

  /**
   * 2번째 댑스 오픈
   * @param {string} name 선택된 항목 이름
   */
  const viewDepth02 = (name: string) => {
    let list: any;
    searchList.forEach((item: any) => {
      if (item.name === name) {
        list = item.depth02;
      }
    });
    setDepth(2);
    setNextPlace({
      selectdepth02: name,
      selectListdepth02: list,
      selectdepth03: "",
      selectListdepth03: [],
    });
  };

  /**
   * 3번째 댑스 오픈
   * @param {string} name 선택된 항목 이름
   */
  const viewDepth03 = (name: string) => {
    let list: any;
    nextPlace.selectListdepth02.forEach((item: any) => {
      if (item.name === name) {
        list = item.depth03;
      }
    });
    setDepth(3);
    setNextPlace({
      selectdepth02: nextPlace.selectdepth02,
      selectListdepth02: nextPlace.selectListdepth02,
      selectdepth03: name,
      selectListdepth03: list,
    });
  };

  return (
    <div className="controller">
      <div className="sort">
        <div className="depth01">
          <div
            className="inner"
            style={{ width: searchList.length * 90 + "px" }}
          >
            {searchList.map((item: any, idx: number) => {
              return (
                <button
                  key={idx}
                  type="button"
                  className={nextPlace.selectdepth02 === item.name ? "on" : ""}
                  disabled={depth !== 1 && nextPlace.selectdepth02 !== item.name ? true : false}
                  onClick={(e) => {
                    clickKeywordBtn(e);
                  }}
                  onTouchStart={(e) => {
                    swipeY(item.depth02.length, e);
                  }}
                  onTouchEnd={(e) => {
                    swipeY(item.depth02.length, e);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className={depth === 2 || depth === 3 ? "depth02 on" : "depth02"}>
          <div
            className="inner"
            style={{ width: nextPlace.selectListdepth02.length * 90 + "px" }}
          >
            {nextPlace.selectListdepth02.map((item: any, idx: number) => {
              return (
                <button
                  key={idx}
                  type="button"
                  className={nextPlace.selectdepth03 === item.name ? "on" : ""}
                  disabled={depth !== 2 && nextPlace.selectdepth03 !== item.name ? true : false}
                  onClick={(e) => {
                    clickKeywordBtn(e);
                  }}
                  onTouchStart={(e) => {
                    swipeY(item.depth03.length, e);
                  }}
                  onTouchEnd={(e) => {
                    swipeY(item.depth03.length, e);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className={depth === 3 ? "depth03 on" : "depth03"}>
          <div
            className="inner"
            style={{ width: nextPlace.selectListdepth03.length * 90 + "px" }}
          >
            {nextPlace.selectListdepth03.map((item: any, idx: number) => {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    clickKeywordBtn(e);
                  }}
                  onTouchStart={(e) => {
                    swipeY(0, e);
                  }}
                  onTouchEnd={(e) => {
                    swipeY(0, e);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="직접 입력"
          onChange={(e) => {
            setInputData(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={(e) => {
            handleInputSearch(inputData);
          }}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default MapSearch;
