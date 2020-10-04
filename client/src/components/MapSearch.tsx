import React, { useState } from "react";

const MapSearch = (props: {
  handleKeywordSearch: (item: string) => void;
  handleInputSearch: (item: string) => void;
}) => {
  const { handleKeywordSearch, handleInputSearch } = props;
  const [inputData, setInputData] = useState("");

  // 검색 항목 더보기 좌표
  let startY: number = 0;
  let endY: number = 0;

  const clickKeywordBtn = (e: any) => {
    handleKeywordSearch(e.target.innerText);
  };

  const viewMorePlace = (e: any) => {
    if (e.type === 'touchstart') {
      startY = e.changedTouches[0].clientY;
    }
    if (e.type === 'touchend') {
      endY = e.changedTouches[0].clientY;
    }
    if (endY > startY && endY - startY > 30) {
      
    }
  };
  
  return (
    <div className="controller">
      <div className="sort">
        <div className="inner">
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
            onTouchStart={(e) => {
              viewMorePlace(e);
            }}
            onTouchEnd={(e) => {
              viewMorePlace(e);
            }}
          >
            음식
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            편의점
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            약국
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            마트
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            마트
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            화장실
          </button>
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