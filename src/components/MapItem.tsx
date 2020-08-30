import React, { useState } from "react";

const MapItem = (props: {
  id: number;
  name: string;
  selectMarker: (id: number) => void;
}) => {
  const { id, name, selectMarker } = props;
  return (
    <div
      onClick={() => {
        selectMarker(id);
      }}
    >
      {name}
    </div>
  );
};

export default MapItem;