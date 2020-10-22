import React, { useState } from "react";

const MyPlaceSave = (props: {
  savePlaceData: any;
  removeSavePlace: (id: number) => void;
  removeAllSavePlace: () => void;
}) => {
  const { savePlaceData, removeSavePlace, removeAllSavePlace } = props;

  return (
    <div className="place-save">
      <div className="main-title">내 플레이스 +</div>
      <button
        type="button"
        className="btn-all-delete convex"
        onClick={() => {
          if (savePlaceData.length > 0) {
            const rerult: any = window.confirm(
              "플레이스를 전부 삭제하시겠습니까?"
            );
            if (rerult) {
              removeAllSavePlace();
            }
            return;
          }
        }}
      >
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </button>
      <div className="inner">
        <div
          className="list"
          style={{ width: savePlaceData.length * 180 + 5 + "px" }}
        >
          {savePlaceData.map((item: any, idx: number) => {
            return (
              <div className="convex" key={idx}>
                <div className="category">{item.data.category_name}</div>
                <div className="name">{item.data.place_name}</div>
                <div className="address">{item.data.address_name}</div>
                <div className="btn-area">
                  <a href={"tel:" + item.data.phone} className="phone">
                    <i className="fa fa-phone"></i>
                  </a>
                  <a href={item.data.place_url} className="url" target="_blank">
                    <i className="fa fa-link"></i>
                  </a>
                  <a
                    href={"https://map.kakao.com/link/to/" + item.data.id}
                    className="way"
                    target="_blank"
                  >
                    <i className="fa fa-map-marker"></i>
                  </a>
                </div>
                <div className="date">{item.date}</div>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => {
                    removeSavePlace(idx);
                  }}
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPlaceSave;
