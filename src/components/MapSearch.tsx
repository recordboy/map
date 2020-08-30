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
    <div>
      <div>
        <button
          type="button"
          onClick={(e) => {
            clickKeywordBtn(e);
          }}
        >
          식당
        </button>
        <button
          type="button"
          onClick={(e) => {
            clickKeywordBtn(e);
          }}
        >
          술집
        </button>
        <button
          type="button"
          onClick={(e) => {
            clickKeywordBtn(e);
          }}
        >
          카페
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
          관광명소
        </button>
        <button
          type="button"
          onClick={(e) => {
            clickKeywordBtn(e);
          }}
        >
          숙박
        </button>
      </div>
      <div>
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
          검색
        </button>
      </div>
    </div>
  );
};

export default MapSearch;