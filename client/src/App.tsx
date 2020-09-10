import React, { Component } from "react";
import MapSearch from "./components/MapSearch";
import MapList from "./components/MapList";
import MapRandom from "./components/MapRandom";
import "./App.css";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {}
interface State {
  latitude: number;
  longitude: number;
  address: string;
  keyword: string;
  selectItem: number;
  itemList: any;
  randomIdx: number;
}

let latitude: number;
let longitude: number;
let address: string = "";
let map: any;
let infowindow: any;
let ps: any;
let geocoder: any;
let markerList: any[] = [];

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      address: "",
      keyword: "",
      selectItem: 0,
      itemList: [],
      randomIdx: 0,
    };
  }

  componentWillMount(): void {
    this.setLocation((latitude: number, longitude: number) => {
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };

      // 지도 엘리먼트
      const container = document.getElementById("map");

      // 지도 객체 생성
      map = new window.kakao.maps.Map(container, options);

      // 마커를 클릭하면 장소명을 표출할 인포윈도우
      infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      // 장소 검색 객체 생성
      ps = new window.kakao.maps.services.Places();

      // 주소 좌표 변환 객체 생성
      geocoder = new window.kakao.maps.services.Geocoder();
    });
  }

  // 현재 위치 좌표 세팅
  setLocation = (callBack: any): void => {
    const that = this;
    navigator.geolocation.getCurrentPosition(function (pos) {
      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;
      that.setState({
        latitude: latitude,
        longitude: longitude,
      });
      callBack(latitude, longitude);
    });
  };

  // 좌표로 주소 정보 요청
  searchAddrFromCoords = (coords: any, callback: any) => {
    geocoder.coord2RegionCode(longitude, latitude, callback);
  };

  // 키워드 검색 완료 시 호출되는 콜백함수
  placesSearchCB = (data: any, status: any, pagination: any) => {
    let itemList: any = [];

    // 마커를 생성하고 지도에 표시
    let marker = new window.kakao.maps.Marker();
    marker.setMap(null);

    if (status === window.kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
      let bounds = new window.kakao.maps.LatLngBounds();

      // 기존 마커 삭제
      if (markerList.length > 0) {
        for (let i = 0; i < markerList.length; i++) {
          markerList[i].setMap(null);
        }
      }

      // 기존 마커 리스트 삭제
      markerList = [];

      // 기존 인포윈도우 삭제
      infowindow.close();

      // 마커 생성
      data.forEach((item: any, idx: number) => {
        this.displayMarker(item, idx);
        bounds.extend(new window.kakao.maps.LatLng(item.y, item.x));
        itemList.push({
          id: idx,
          place: item,
        });
      });

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      map.setBounds(bounds);

      // 검색된 장소 리스트
      this.setState({
        itemList: itemList,
      });
    }
  };

  // 지도에 마커를 표시하는 함수
  displayMarker = (place: any, id: number) => {
    const that = this;

    // 마커를 생성하고 지도에 표시
    let marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 id, 장소명 추가
    marker.id = id;
    marker.place_name = place.place_name;

    // 마커 리스트 생성
    markerList.push(marker);

    // 마커에 클릭이벤트를 등록
    window.kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출
      that.selectMarker(marker.id);
    });
  };

  // 마커에 장소명 출력
  selectMarker = (id: number) => {
    infowindow.setContent(
      "<div style='padding:5px;font-size:12px;' class='infowindow'>" +
        this.state.itemList[id].place.place_name +
        "</div>"
    );
    infowindow.open(map, markerList[id]);
    console.log("마커리스트: ", markerList[id].id, markerList[id].place_name);
    console.log(
      "리스트: ",
      this.state.itemList[id].id,
      this.state.itemList[id].place.place_name
    );
  };

  // 키워드 버튼으로 장소를 검색
  handleKeywordSearch = (keyword: string) => {
    this.searchAddrFromCoords(map.getCenter(), (result: any, status: any) => {
      // 좌표 주소 정보
      address = result[1].address_name;
      if (this.state.keyword !== keyword) {
        const data: string = address + " " + keyword;
        ps.keywordSearch(data, this.placesSearchCB, {
          x: latitude,
          y: longitude,
        });
        this.setState({
          address: address,
          keyword: keyword,
        });
      }
    });
  };

  // 직접 입력으로 장소를 검색
  handleInputSearch = (data: string) => {
    if (data !== "") {
      ps.keywordSearch(data, this.placesSearchCB);
      console.log(data);
    }
  };

  // 섞인 리스트 세팅
  setShuffleList = (shuffleArr: number[]) => {

    

    // let itemList = shuffleArr.map((idx: number): any => {
    //   return this.state.itemList[idx]
    // });

    // console.log(itemList);

    // let newMarkerList = shuffleArr.map((idx: number): any => {
    //   let result: any = {};
    //   for (let i = 0; i < markerList.length; i++) {
    //     if (markerList[i].id === idx) {
    //       result = markerList[i];
    //     }
    //   }
    //   return result;
    // });
    // markerList = newMarkerList;

    // markerList.forEach((item: any)=>{
    //   console.log(item.id);
    // });

    // itemList.forEach((item: any)=>{
    //   console.log(item.id, item.place.place_name);
    // });

    // this.setState({
    //   itemList: itemList
    // });
  };

  render() {
    return (
      <div>
        <div id="map" />
        <MapSearch
          handleKeywordSearch={this.handleKeywordSearch}
          handleInputSearch={this.handleInputSearch}
        />
        <MapList
          itemList={this.state.itemList}
          selectMarker={this.selectMarker}
        />
        <MapRandom
          itemList={this.state.itemList}
          setShuffleList={this.setShuffleList}
        />
      </div>
    );
  }
}

export default App;
