import React, { useState } from "react";

  const MyPlaceIntro = () => {
  const [introType, setIntroType] = useState('show');
  const hideIntro = (): void => {
    setTimeout(() => {
      setIntroType('opacity');
    }, 2000);
    setTimeout(() => {
      setIntroType('none');
    }, 2500);
  };

  hideIntro();

  return (
    <div
      className="intro"
      style={{
        opacity: introType === "opacity" ? 0 : 1,
        display: introType === "none" ? "none" : "block",
      }}
    ></div>
  );
};

export default MyPlaceIntro;
