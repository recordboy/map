import React, { useState } from "react";

const MyPlaceSave = (props: {
  savePlaceData: any;
  removeSavePlace: (id: number) => void;
  removeAllSavePlace: () => void;
}) => {
  const { savePlaceData, removeSavePlace, removeAllSavePlace } = props;

  return (
    <div className="save-place">
      <div className="main-title">내 플레이스 +</div>
      <button
        type="button"
        className="btn-all-delete"
        onClick={() => {
          const rerult: any = window.confirm('정말로 장소를 전부 삭제하시겠습니까?');
          if (rerult) {
            removeAllSavePlace();
          }
          return;
        }}
      >
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </button>
      <div className="inner">
        <div className="list" style={{width: (savePlaceData.length * 160) + 5 + 'px'}}>
          {savePlaceData.map((item: any, idx: number) => {
            return (
              <div className="convex" key={idx}>
              <div className="date">{item.date}</div>
                <div className="date">{item.id}</div>
                <div className="name">{item.data.place_name}</div>
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
