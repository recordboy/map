import React, { useState } from "react";

const axios = require("axios");
const cheerio = require("cheerio");
console.log(axios);

const MapItem = (props: {
  id: number;
  place: any;
  selectMarker: (id: number) => void;
}) => {
  const { id, place, selectMarker } = props;
  const getItemInfo = (url: string) => {

    async function getHTML() {
      try {
        return await axios.get('https://recordboy.github.io/');
      } catch (error) {
        console.error(error);
      }
    }

    getHTML()
      .then((html) => {
        console.log(url);
        const $ = cheerio.load(html.data);
        const bodyList = $(".link-muted").text();
        return bodyList;
      })
      .then((res) => console.log(res));
  }

  getItemInfo(place.place_url);

  return (
    <div
      onClick={() => {
        selectMarker(id);
      }}
    >
      <div className="name">{place.place_name}</div>
      {/* <div className="name">{place.place_name}</div> */}
      {/* <a href={"tel:" + place.phone}>전화: {place.phone}</a> */}
    </div>
  );
};

export default MapItem;