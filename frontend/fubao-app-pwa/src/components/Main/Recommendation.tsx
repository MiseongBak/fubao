import React from "react";
import { useNavigate } from "react-router-dom";
import { WhiteBox } from "./styles";
import Button from "@mui/joy/Button";
import styled from "styled-components";

const BigText = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0.5rem 0.2rem;
  color: #2979ff;
  position: relative;
  z-index: 1;
`;

const SmallText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0.2rem;
  color: black;
  position: relative;
  z-index: 1;
`;

const Recommendation = () => {
  const navigate = useNavigate();

  const GoToMethod = () => {
    navigate("/etiquetteinfo");
  };

  const GoToFishInfo = () => {
    navigate("/collection");
  };

  return (
    <WhiteBox
      style={{
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center", margin: "0" }}>
        <span style={{ fontWeight:"300", fontSize:"1.1rem" }}>강태공's tip</span>
      </div>
      
      <div style={{ position: "absolute", bottom: "1.5rem", left: "0.2rem" }}>
        <img src="/imgs/mrkang.png" alt="mr.kang" />
      </div>

      <div style={{ margin: "1rem 0rem", display: "flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ margin: "0", marginLeft: "1rem" }}>
          <BigText>감성돔</BigText>
          <SmallText>잡는 법 알려준다</SmallText>
        </div>

        <div style={{ margin: "0", marginLeft: "4rem" }}>
          <BigText>찌낚시</BigText>
          <SmallText>채비하고</SmallText>
        </div>

        <div style={{ margin: "0", marginLeft: "6rem" }}>
          <BigText>나로도호</BigText>
          <SmallText>가봐라</SmallText>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "0.5rem", left: "0.2rem" }}>
        <Button variant="plain" color="neutral" onClick={() => GoToMethod()}>
          <span style={{ color: "#727272", marginLeft: "0.1rem" }}>
            릴낚시알아보기
          </span>
        </Button>
      </div>

      <div style={{ position: "absolute", bottom: "0.5rem", right: "0.2rem" }}>
        <Button variant="plain" color="neutral" onClick={() => GoToFishInfo()}>
          <span style={{ color: "#727272", marginRight: "0.1rem" }}>
            감성돔알아보기
          </span>
        </Button>
      </div>
    </WhiteBox>
  );
};

export default Recommendation;
