import React from "react";
import { useNavigate } from "react-router-dom";
import { WhiteBox, MyText } from "./styles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileType, ScheduleType } from "../../store/types";
import useStore from "../../store/store";

const PlanLocation = () => {
    const navigate = useNavigate();
    const { profile, schedule } = useStore() as {
      profile: ProfileType | null;
      schedule: ScheduleType | null;
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
    >
      <MyText>
        이번 낚시 장소는
        <br />
        {schedule?.location.address}
      </MyText>

      {/* <div style={{ position: "absolute", bottom: "0.5rem", left: "0.8rem" }}>
        <span style={{ color:"black", marginRight:"0.5rem", cursor:"pointer" }}>날씨 보기</span>
      </div> */}

      <div onClick={handleClick} style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem" }}>
        {/* <FontAwesomeIcon icon="map" size="1x" color="black" style={{ padding:"0rem 0.3rem" }} /> */}
        <span style={{ color:"black", marginRight:"0.5rem", cursor:"pointer" }}>지도로 보기</span>
      </div>
    </WhiteBox>
  )
}

export default PlanLocation