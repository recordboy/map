import React, { useState, useEffect } from "react";

const MyPlaceAgree = (props: {
  setLocation: () => void
}) => {
  const [agreeState, setAgreeState] = useState("");
  const [agreeIsOn, setAgreeIsOn] = useState(true);
  const { setLocation } = props;

  useEffect(() => {
    setTimeout(() => {
      setAgreeState("step01");
    }, 2000);
    setTimeout(() => {
      setAgreeState("step02");
    }, 2500);
    setTimeout(() => {
      setAgreeState("step03");
    }, 3500);
    setTimeout(() => {
      setAgreeState("step04");
    }, 4000);
  }, []);

  return (
    <div className="agree" style={{
      display: agreeIsOn ? "block" : "none"
    }}>
      <div className="info">
        <img src="ico-address.png" />
        <div
          className="text"
          style={{
            height: agreeState !== "" ? "60px" : "0",
            opacity:
              agreeState === "step02" || agreeState === "step03" || agreeState === "step04" ? "1" : "0",
          }}
        >
          내 주변을 검색하시려면
          <br />
          현재 위치 정보가 필요합니다.
        </div>
        <button
          type="button"
          style={{
            height:
              agreeState === "step03" || agreeState == "step04" ? "60px" : "0",
            opacity: agreeState === "step04" ? "1" : "0",
          }}
          onClick={() => {
            setLocation();
            setAgreeIsOn(false);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default MyPlaceAgree;
MyPlaceAgree
