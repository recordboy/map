import React, { useState, useEffect } from "react";

  const MyPlaceIntro = () => {
  const [introType, setIntroType] = useState('show');
  const hideIntro = (): void => {
    setTimeout(() => {
      setIntroType('opacity');
    }, 1000);
    setTimeout(() => {
      setIntroType('none');
    }, 1500);
  };

  useEffect(() => {
    hideIntro();
  }, []);

  return (
    <div
      className="intro"
      style={{
        opacity: introType === "opacity" ? 0 : 1,
        display: introType === "none" ? "none" : "block",
      }}
    >
      <div className="title">플레이스를<br />찾아보세요</div>
    </div>
  );
};

export default MyPlaceIntro;
