import React, { useState } from "react";

const MapSearch = (props: {
  handleKeywordSearch: (item: string) => void;
  handleInputSearch: (item: string) => void;
}) => {
  const { handleKeywordSearch, handleInputSearch } = props;
  const [inputData, setInputData] = useState("");
  const clickKeywordBtn = (e: any) => {
    handleKeywordSearch(e.target.innerText);
  };
  return (
    <div className="controller">
      <div className="sort">
        <div className="box">
          <div className="title">음식</div>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            한식
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            일식
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            중식
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            분식
          </button>
        </div>
        <div className="box">
          <div className="title">술집</div>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            호프
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            이자카야
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            치킨
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            와인
          </button>
        </div>
        <div className="box">
          <div className="title">디저트</div>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            커피
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            음료
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            과자
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            케잌
          </button>
        </div>
        <div className="box">
          <div className="title">편의 시설</div>
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
            마트
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
            화장실
          </button>
        </div>
        <div className="box">
          <div className="title">숙박</div>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            호텔
          </button>
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
            }}
          >
            모텔
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