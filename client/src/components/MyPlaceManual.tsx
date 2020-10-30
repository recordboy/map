import React, { useState, useEffect } from "react";

const MyPlaceManual = (props: {
  setManualFixed: (res: string) => void;
}) => {

  const {setManualFixed} = props;
  const [isOnManual, setIsOnManual] = useState(true);
  const [isOnAgainCheck, setIsOnAgainCheck] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("MyPlaceManualAgain") === null) {
      localStorage.setItem("MyPlaceManualAgain", 'Y');
    } else if (localStorage.getItem("MyPlaceManualAgain") === "N") {
      setIsOnManual(false);
    }
  }, []);

  const hideManual = (): void => {
    if (isOnAgainCheck) {
      localStorage.setItem("MyPlaceManualAgain", 'N');
    } else {
      localStorage.setItem("MyPlaceManualAgain", 'Y');
    }
    setIsOnManual(false);
    setManualFixed("N");
  };

  return (
    <div className="manual">
      <div
        className="info"
        style={!isOnManual ? { display: "none" } : { display: "block" }}
      >
        <div className="balloon type01">
          드래그하여 지도 크기를<br />변경할 수 있어요!
          <div className="border">
            <i className="fa fa-arrows-v" aria-hidden="true"></i>
          </div>
        </div>
        <div className="balloon type02">
          원하는 항목을 클릭하면
          <br />
          장소 리스트가 나와요!
          <br />
          아래로 드래그하면
          <br />
          세분화된 항목이 나와요!
          <div className="border">음식점</div>
        </div>
        <div className="balloon type03">
          검색어를 직접 입력할 수 있어요!
          <div className="border"></div>
        </div>
        <div className="balloon type04">
          장소를 클릭하면
          <br />
          자세한 정보를 얻을 수 있어요!
          <div className="border"></div>
        </div>
        <label className="check-again" htmlFor="check01-01">
          <input
            type="checkbox"
            id="check01-01"
            onChange={() => {
              if (isOnAgainCheck) {
                setIsOnAgainCheck(false);
              } else {
                setIsOnAgainCheck(true);
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
        <div></div>
      </div>
    </div>
  );
};

export default MyPlaceManual;
