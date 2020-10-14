import React, { useState, useEffect } from "react";

const MyPlaceManual = () => {
  const [isOnManual, setIsOnManual] = useState(true);
  const [isOnManualAgain, setIsOnManualAgain] = useState(false);
  const myPlaceData: any = JSON.parse(
    localStorage.getItem("MyPlaceData") as string
  );

  // 다시 보지 않기 확인
  useEffect(() => {
    if (myPlaceData !== null) {
      if (
        myPlaceData.hasOwnProperty("isOnManualAgain") &&
        myPlaceData.isOnManualAgain === "Y"
      ) {
        setIsOnManual(false);
      }
    }
  }, []);

  const hideManual = (): void => {
    if (isOnManualAgain) {
      saveLocalData("Y");
    }
    setIsOnManual(false);
  };

  const saveLocalData = (value: string): void => {
    let MyPlaceData: any = {
      isOnManualAgain: value,
    };
    MyPlaceData = JSON.stringify(MyPlaceData);
    localStorage.setItem("MyPlaceData", MyPlaceData);
  };

  return (
    <div className="manual">
      <div
        className="info"
        style={!isOnManual ? { display: "none" } : { display: "block" }}
        >
          <div className="test"></div>
        <div className="balloon type01">
          위, 아래로 지도 크기를 변경할 수 있어요!
        </div>
        <div className="balloon type02">
          원하는 항목을 클릭하면 장소가 나와요!
          <br />
          아래로 밀면 자세한 항목이 나와요!
        </div>
        <div className="balloon type03">
          장소를 클릭하면 자세한 정보를 얻을 수 있어요!
        </div>
        <label className="check-again" htmlFor="check01-01">
          <input
            type="checkbox"
            id="check01-01"
            onChange={() => {
              if (isOnManualAgain) {
                setIsOnManualAgain(false);
              } else {
                setIsOnManualAgain(true);
              }
            }}
          />
          다시 보지 않기
        </label>

        <button
          className="btn-close"
          onClick={() => {
            hideManual();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <div
        className="help"
        onClick={() => {
          setIsOnManual(true);
        }}
      >
        {/* <i className="fa fa-question" aria-hidden="true"></i> */}
      </div>
    </div>
  );
};

export default MyPlaceManual;
