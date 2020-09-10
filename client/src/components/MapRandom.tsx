import React, { useState } from "react";

const MapRandom = (props: {
  itemList: [];
  setShuffleList: (listArr: number[]) => void;
}) => {
  const { itemList, setShuffleList } = props;
  // const randomNumber = () => {
  //   const randomNumber = Math.floor(Math.random() * 15);
  // };

  const randomShuffle = () => {
    let random: number[] = [];
    random = itemList.map((item: any, idx: number) => {
      return idx;
    });

    setShuffleList(shuffle(random));
    function shuffle(data: number[]): number[] {
      let j, x, i;
      for (i = data.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = data[i - 1];
        data[i - 1] = data[j];
        data[j] = x;
      }
      return data;
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          randomShuffle();
        }}
      >
        섞기
      </button>
      <button type="button">시작</button>
    </div>
  );
};

export default MapRandom;