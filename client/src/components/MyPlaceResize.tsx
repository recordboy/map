import React, { useState } from "react";

const MyPlaceResize = (props: {
  isOnResize: (height: boolean) => void;
  setMapResize: (height: number) => void;
}) => {
  const { isOnResize, setMapResize } = props;
  const [resize, setResize] = useState(70);
  const touchMove = (screenY: number) => {
    screenY = Math.floor(screenY);
    setMapResize(screenY);
    setResize(screenY - 30);
  };

  return (
    <button
      type="button"
      className="btn-resize"
      onTouchMove={(e: any) => {
        touchMove(e.touches[0].clientY);
      }}
      onTouchStart={() => {
        isOnResize(true);
      }}
      onTouchEnd={() => {
        isOnResize(false);
      }}
      style={{ top: resize }}
    ></button>
  );
};

export default MyPlaceResize;
