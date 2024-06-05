import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIconLeft } from "../../styles/globalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../FontAwsome";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";
import { mapInfoApi } from "../../store/api";
import { useQuery } from "@tanstack/react-query";

interface MapState {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | null;
  isLoading: boolean;
}

interface Position {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  isOpen?: boolean;
}

const PlanRegisterMap = () => {
  useKakaoLoader();

  const { data, error, isPending } = useQuery({
    queryKey: ["mapInfo"],
    queryFn: mapInfoApi,
    retry: 0, // 실패시 재호출 몇번 할지
  });

  const [state, setState] = useState<MapState>({
    // 기준 좌표 서울역 설정
    center: {
      lat: 37.554530651,
      lng: 126.970713923,
    },
    errMsg: null,
    isLoading: true,
  });

  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (data) {
      setPositions(data);
    }

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, [data]);

  const toggleMarker = (index: number) => {
    setPositions(
      positions.map((pos, posIndex) => {
        if (index === posIndex) {
          return { ...pos, isOpen: !pos.isOpen };
        }
        return pos;
      })
    );
  };

  // 마커 선택 액션 처리 함수
  const handleSelectMarker = (selectedMarker: Position) => {
    console.log("선택된 마커:", selectedMarker);
    // 선택된 마커 정보 처리 로직, 예를 들어 상태 업데이트 또는 API 호출 등
  };

  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
        level={4} // 지도의 확대 레벨
        draggable
      >
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {positions.map((pos, index) => (
            <MapMarker
              key={pos.id}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
              onClick={() => toggleMarker(index)}
            >
              {pos.isOpen && (
                <div style={{ minWidth: "150px" }}>
                  <div style={{ padding: "5px", color: "#000" }}>
                    {pos.address}
                    <br />
                    <button onClick={() => handleSelectMarker(pos)}>
                      선택
                    </button>
                    {/* 버튼 클릭 시 handleSelectMarker 함수 호출, pos 정보를 인자로 전달 */}
                  </div>
                </div>
              )}
            </MapMarker>
          ))}
        </MarkerClusterer>

        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: "/imgs/my_location.png", // 마커이미지의 주소입니다
              size: {
                width: 60,
                height: 60,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          >
            {/* <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "현재 위치"}
            </div> */}
          </MapMarker>
        )}
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
      </Map>

      <Link to="/">
        <HomeIconLeft color="#767676">
          <FontAwesomeIcon icon="home" />
        </HomeIconLeft>
      </Link>

      <div>
        {/* 데이터가 성공적으로 로드되었을 때 UI 렌더링 */}
        {data && <div>{JSON.stringify(data)}</div>}
        {error && <div>{JSON.stringify(error)}</div>}
        {isPending && <div>{JSON.stringify(isPending)}</div>}
      </div>
    </>
  );
};

export default PlanRegisterMap;
