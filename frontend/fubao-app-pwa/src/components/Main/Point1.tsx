import React from "react";
import { useNavigate } from "react-router-dom";
import { WhiteBox, MyText } from "./styles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Point1Props = {
  id?: string; // id 프로퍼티는 선택적(optional)입니다
};

const Point1 = ({ id }: Point1Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/point1");
  };

  return (
    <WhiteBox
      id={id}
      style={{
        position: "relative",
        backgroundImage: "url('/imgs/point1.jpg')",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <MyText color="">
        아저씨,
        <br />
        그러다 빠져요
        <br />
        방파제낚시
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
  )
}

export default Point1