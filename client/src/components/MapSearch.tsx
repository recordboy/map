import React, { useState } from "react";

// 검색 항목 가져오기
import searchList from "../search-list.json";

const MapSearch = (props: {
  handleKeywordSearch: (item: string) => void;
  handleInputSearch: (item: string) => void;
}) => {
  const { handleKeywordSearch, handleInputSearch } = props;
  const [inputData, setInputData] = useState("");
  const [morePlace, setMorePlace] = useState({
    depth: 1,
    selectDepth: "",
    selectList: [],
  });

  // 검색 항목 더보기 좌표
  let startY: number = 0;
  let endY: number = 0;

  const clickKeywordBtn = (e: any) => {
    handleKeywordSearch(e.target.innerText);
  };

  const moreY = (e: any) => {
    if (e.type === "touchstart") {
      startY = e.changedTouches[0].clientY;
    }
    if (e.type === "touchend") {
      endY = e.changedTouches[0].clientY;
      if (endY > startY && endY - startY > 30) {
        viewMorePlace(e.target.innerText);
      }
    }
  };

  const viewMorePlace = (name: string) => {
    let list: any;
    searchList.forEach((item: any) => {
      if (item.name === name) {
        list = item.detail;
      }
    });

    setMorePlace({
      depth: 2,
      selectDepth: name,
      selectList: list,
    });
  };

  return (
    <div className="controller">
      <div className="sort">
        <div className={morePlace.depth !== 1 ? "depth01 disabled" : "depth01"}>
          <div className="inner" style={{ width: searchList.length * 80 + "px" }}>
            {searchList.map((item: any, idx: number) => {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    clickKeywordBtn(e);
                  }}
                  onTouchStart={(e) => {
                    moreY(e);
                  }}
                  onTouchEnd={(e) => {
                    moreY(e);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className={morePlace.depth === 2 ? "depth02 on" : "depth02"}>
          <div className="inner" style={{ width: morePlace.selectList.length * 80 + "px" }}>
            {morePlace.selectList.map((item: any, idx: number) => {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    clickKeywordBtn(e);
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
