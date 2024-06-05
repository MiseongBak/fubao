import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../styles/globalStyles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Title = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  font-size: 2rem;
  font-weight: 600;
  color: #202125;
`;

const Subtitle = styled.p`
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #aeb1ba;
`;

const AlignDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #202125;
`;

const title = ["낚시 에티켓"];
const subTitle = ["오늘 처음이더라도 꼭 알아야할 에티켓"];
const content = [
  "낚시를 할 때는 환경과 타인을 배려하는 마음이 필요해요. 잡은 물고기는 기준에 따라 방생하고, 남은 쓰레기는 꼭 치워요. 또한, 낚시터에서 큰 소리를 내거나 남을 방해하는 행동은 안돼요. 에티켓 지키고, 대어도 낚길 바라요!",
];

const EtiquettePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "3rem 1rem 2rem" }}>
      <ChevronLeftIcon
        sx={{
          position: "absolute",
          top: 22,
          left: 20,
          cursor: "pointer",
        }}
        onClick={handleBack}
      />
      <Title>{title}</Title>
      <Subtitle>{subTitle}</Subtitle>
      <p>{content}</p>
      <AlignDiv>
        <img
          src="/imgs/general.jpg"
          alt="etiqeutte"
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            margin: "0.5rem 0rem",
          }}
        />
      </AlignDiv>
      <Link to="/">
        <HomeIcon>
          <FontAwesomeIcon icon="home" />
        </HomeIcon>
      </Link>
    </div>
  );
};

export default EtiquettePage;
