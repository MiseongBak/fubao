import React from "react";
import { useNavigate } from "react-router-dom";
import { WhiteBox, MyText } from "./styles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Method1Props = {
  id?: string; // id 프로퍼티는 선택적(optional)입니다
};

const Method1 = ({ id }: Method1Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/method1");
  };

  return (
    <WhiteBox
      id={id}
      style={{
        position: "relative",
        backgroundImage: "url('/imgs/method1.jpg')",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <MyText>
        물의 흐름을 이해하는 법
        <br />
        찌낚시
      </MyText>
      <div style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid white",
            borderRadius: "50px",
            width: "1.3rem",
            height: "1.3rem",
            margin: "0.3rem",
          }}
        >
          <FontAwesomeIcon icon="plus" size="1x" color="white" />
        </div>
      </div>
    </WhiteBox>
  );
};

export default Method1;
