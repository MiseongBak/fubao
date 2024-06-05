import React from "react";
import { useNavigate } from "react-router-dom";
import { WhiteBox, MyText } from "./styles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Method2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/method2");
  };

  return (
    <WhiteBox
      style={{
        position: "relative",
        backgroundImage: "url('/imgs/method2.jpg')",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <MyText color="">
        멀리 던진다고
        <br />
        많이 안잡혀요
        <br />
        원투낚시
      </MyText>
      <div style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            borderRadius: "50px",
            width: "1.3rem",
            height: "1.3rem",
            margin: "0.3rem",
          }}
        >
          <FontAwesomeIcon icon="plus" size="1x" color="black" />
        </div>
      </div>
    </WhiteBox>
  );
};

export default Method2;
