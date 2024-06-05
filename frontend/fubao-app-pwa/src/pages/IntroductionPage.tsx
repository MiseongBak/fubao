import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

const StyledSlider = styled(Slider)`
  overflow: hidden;

  .slick-dots {
    bottom: 14vh;
    z-index: 1000;
  }
`;

const TopBox1 = styled.div`
  display: flex !important;
  flex-direction: column;
  background-color: #5a60f1;
  height: 100vh;
`;

const TopBox2 = styled.div`
  display: flex !important;
  flex-direction: column;
  background-color: #8C52FF;
  height: 100vh;
`;

const TopBox3 = styled.div`
  display: flex !important;
  flex-direction: column;
  background-color: #73C974;
  height: 100vh;
`;

const TopBox4 = styled.div`
  display: flex !important;
  flex-direction: column;
  background-color: #42A5F5;
  height: 100vh;
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

const IntroductionPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navigate = useNavigate();

  return (
    <div>
      <StyledSlider {...settings}>
        <TopBox1>
          <Text style={{ margin: "3rem 0rem 4.5rem 1.8rem" }}>
            물고기 판별과 <br /> 길이 측정까지 <br /> 인공지능으로 편리하게
          </Text>
          <AlignBox>
            <img
              src="imgs/introduction/introduction1.png"
              alt="introduction1"
              style={{ width: "88vw", height: "auto", maxWidth: "400px"}}
            />
          </AlignBox>
        </TopBox1>
        <TopBox2>
          <AlignBox>
            <img
              src="imgs/introduction/introduction2.png"
              alt="introduction1"
              style={{ width: "80vw", height: "auto", marginTop: "7rem", maxWidth: "300px" }}
            />
          <Text style={{ margin: "6rem 0rem 0rem 0rem" }}>
            일정 등록하면 <br /> 맞춤 입문가이드 시작
          </Text>
          </AlignBox>
        </TopBox2>
        <TopBox3>
          <Text style={{ margin: "3rem 0rem 4.5rem 1.8rem" }}>
            1500개 이상의 <br /> 낚시 장소와 <br /> 빅데이터 기반 추천
          </Text>
          <AlignBox>
            <img
              src="imgs/introduction/introduction3.png"
              alt="introduction1"
              style={{ width: "85vw", height: "auto", maxWidth: "300px" }}
            />
          </AlignBox>
        </TopBox3>
        <TopBox4>
          <AlignBox>
            <img
              src="logo512.png"
              alt="introduction1"
              style={{ width: "65vw", height: "auto", marginTop: "8rem", maxWidth: "250px"  }}
            />
          <Text style={{ margin: "4rem 0rem 0rem 0rem", textAlign:"center" }}>
            지금 바로 로그인하고 <br /> 푸바오를 만나보아요
          </Text>
          </AlignBox>
        </TopBox4>
      </StyledSlider>
      <Button
        sx={{
          position: "fixed",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#F68596",
          width: "90vw",
          maxWidth: "540px",
          fontFamily: "SpoqaHanSansNeo",
          fontSize: "1rem",
          fontWeight: "400",
          padding: "0.5rem",
          ":hover": { backgroundColor: "#d47382" },
        }}
        onClick={() => navigate("/login")}
      >
        로그인하기
      </Button>
    </div>
  );
};

export default IntroductionPage;
