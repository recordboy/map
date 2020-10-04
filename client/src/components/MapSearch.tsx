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
        <div className="inner">
          <button
            type="button"
            onClick={(e) => {
              clickKeywordBtn(e);
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