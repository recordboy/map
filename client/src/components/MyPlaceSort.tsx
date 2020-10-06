import React, { useState } from "react";
import { callbackify } from "util";

const MyPlaceSort = (props: {
  itemList: any[];
  setAlphabeticalSort: (listArr: number[]) => void;
  setScoreSort: (listArr: {}[]) => void;
}) => {
  const { itemList, setScoreSort, setAlphabeticalSort } = props;

  // 가나다 정렬
  let alphabe = false;
  const alphabeticalSort = () => {
    let alphabeList: any[] = [];
    let alphabeId: any = [];

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
  };

  const scoreSort = () => {
    // async, await 방식
    let scoreList: {}[] = [];
    itemList.forEach((item: any, idx: number) => {
      getData(item, idx);
    });

    async function getData(item: any, idx: number) {
      const data: any = await fetch(
        `http://localhost:3001/api?id=${item.place.id}`
      );
      const dataStr = await data.json();
      const dataJSON = JSON.parse(dataStr);
      let score: number = 0;

      if (dataJSON.comment.scorecnt !== 0) {
        const scoreCnt: number = dataJSON.comment.scorecnt;
        const scoreSum: number = dataJSON.comment.scoresum;
        score = Math.floor((scoreSum / scoreCnt) * 10) / 10;
      } else {
        score = -1;
      }
      scoreList.push({
        id: item.id,
        score: score,
      });
      if (idx >= itemList.length - 1) {
        const dummy: any = [
          { id: 0, score: 1.2 },
          { id: 1, score: 3.4 },
          { id: 2, score: 1.3 },
          { id: 3, score: 2.4 },
        ];
        setScoreSort(setScoreData(dummy));
      }
    }

    function setScoreData(list: any) {
      for (let i = 0; i < list.length; i++) {
        let swap;
        for (let j = 0; j < list.length - 1 - i; j++) {
          if (list[j].score < list[j + 1].score) {
            swap = list[j];
            list[j] = list[j + 1];
            list[j + 1] = swap;
          }
        }
        console.log(`${i}회전: ${list}`);
        if (!swap) {
          break;
        }
      }
      return list;
    }

    // call back 방식
    // let scoreList: any[] =[];
    // itemList.forEach((item: any, idx: number) => {
    //   getData(function(dataJSON: any) {
    //     scoreList.push(dataJSON);
    //     if (idx >= itemList.length - 1) {
    //       console.log(scoreList);
    //     }
    //   });
    // });

    // function getData(call: any) {
    //   fetch(`http://localhost:3001/api`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const dataJSON = JSON.parse(data);
    //     return call(dataJSON);
    //   });
    // }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (itemList.length > 0) {
            scoreSort();
          }
        }}
      >
        별점
      </button>
    </div>
  );
};

export default MyPlaceSort;
