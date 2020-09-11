import React, { useState } from "react";

const MapSort = (props: {
  itemList: any[];
  setShuffleList: (listArr: number[]) => void;
  setAlphabeticalSort: (listArr: number[]) => void;
}) => {
  const { itemList, setShuffleList, setAlphabeticalSort } = props;


  let alphabe = false;


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

  const alphabeticalSort = () => {

    let alphabeList: any[] = [];
    var alphabeId: any = [];

    alphabeList = itemList.map((item: any, idx: number) => {
      return item.place.place_name;
    });

    if (!alphabe) {
      alphabe = true;
      alphabeList.sort();
    } else {
      alphabe = false;
      alphabeList.sort((a: any, b: any) => {
        return a > b ? -1 : a < b ? 1 : 0;
      });
    }

    alphabeList.forEach((name: string) => {
      itemList.forEach((item: any) => {
        if (item.place.place_name === name) {
          alphabeId.push(item.id);
        }
      });
    });

    setAlphabeticalSort(alphabeId);

    // 요청 추가
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      {/* <button
        type="button"
        onClick={() => {
          randomShuffle();
        }}
      >
        섞기
      </button> */}
      <button
        type="button"
        onClick={() => {
          alphabeticalSort();
        }}
      >
        가나
      </button>
      <button type="button">시작</button>
    </div>
  );
};

export default MapSort;
