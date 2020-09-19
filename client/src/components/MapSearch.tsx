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
          커피
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
          공원
        </button>
        <button
          type="button"
          onClick={(e) => {
            clickKeywordBtn(e);
          }}
        >
          숙소
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