import React, { useState, useEffect } from "react";

  const MyPlaceIntro = () => {
  const [introState, setIntroState] = useState('show');
  const hideIntro = (): void => {
    setTimeout(() => {
      setIntroState('step01');
    }, 1000);
    setTimeout(() => {
      setIntroState('step02');
    }, 1500);
  };

  useEffect(() => {
    hideIntro();
  }, []);

  return (
    <div
      className={"intro " + introState}
      style={{
        opacity: introState === "step01" ? 0 : 1,
        display: introState === "step02" ? "none" : "block",
      }}
    >
      <div className="title">플레이스를<br />찾아보세요</div>
    </div>
  );
};

export default MyPlaceIntro;
