import React, { useState, useEffect } from "react";

const MyPlaceResize = (props: { setMapResize: (height: number) => void }) => {
  const { setMapResize } = props;
  const [resize, setResize] = useState(121);
  const touchMove = (screenY: number) => {
    screenY = Math.floor(screenY);
    setMapResize(screenY);
    setResize(screenY - 59);
  };
  let btnResize: any;

  useEffect(() => {
    btnResize = document.getElementsByClassName("btn-resize")[0];
  });

  return (
    <button
      type="button"
      className="btn-resize"
      onTouchMove={(e: any) => {
        touchMove(e.touches[0].clientY);
      }}
      onTouchStart={() => {
        btnResize.addEventListener("touchmove", (e: any) => {
          e.preventDefault();
          return;
        });
      }}
      onTouchEnd={() => {}}
    />
  );
};

export default MyPlaceResize;
