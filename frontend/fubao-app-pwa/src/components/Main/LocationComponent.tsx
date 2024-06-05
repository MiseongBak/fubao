import React from "react";
import { useNavigate } from "react-router-dom";
import { WhiteBox, MyText } from "./styles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileType, RecommendationType } from "../../store/types";
import useStore from "../../store/store";


const LocationComponent = () => {
  const navigate = useNavigate();
  const { profile, recommendation } = useStore() as {
    profile: ProfileType | null;
    recommendation: RecommendationType | null;
  };

  const handleClick = () => {
    navigate("/map");
  };
  return (
    <WhiteBox
      style={{
        position: "relative",
        backgroundImage: "url('/imgs/mappoint.png')",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <MyText>
        {profile?.nickname}님을 위한
        <br />
        안성맞춤 추천장소
        <br />
        {recommendation?.selected_location}
      </MyText>

      {/* <div style={{ position: "absolute", bottom: "0.5rem", left: "0.8rem" }}>
        <span style={{ color:"black", marginRight:"0.5rem", cursor:"pointer" }}>날씨 보기</span>
      </div> */}

      <div style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem" }}>
        {/* <FontAwesomeIcon icon="map" size="1x" color="black" style={{ padding:"0rem 0.3rem" }} /> */}
        <span style={{ color:"black", marginRight:"0.5rem" }}>지도로 보기</span>
      </div>
    </WhiteBox>
  );
};

export default LocationComponent;
