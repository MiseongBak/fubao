import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const WhiteBoxHere = styled.div`
  display: flex;
  justify-content: space-around;
  border-radius: 15px;
  height: 1.5rem;
  background-color: white;
  padding: 1rem;
  margin: 0rem 0;
  /* border-top: 2px solid #2979FF; */
  box-shadow: 3px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0rem 0rem;
  color: #676f75;
  cursor: pointer;
`;

const TextBar = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0rem 0rem;
  color: #b4bbc0;
`;

const MenuComponent = () => {
  const navigate = useNavigate();


  const goToMethod = () => {
    navigate("/method");
  };

  const goToPoint = () => {
    navigate("/point");
  };

  const goToFish = () => {
    navigate("/fishinfo");
  };

  return (
    <>
      {/* {schedule && schedule.id && dday === 0 ? (
        <label htmlFor="file">
          <CameraBox onClick={() => setcameraOpen(true)}>
            <Text>AI 카메라</Text>
            <img src="/camera.png" alt="camera_image" style={{ width:"5rem" }} />
          </CameraBox>
        </label>
      ) : ( */}
        <WhiteBoxHere>
          <Text onClick={goToMethod}>낚시방법</Text>
          <TextBar>|</TextBar>
          <Text onClick={goToPoint}>낚시포인트</Text>
          <TextBar>|</TextBar>
          <Text onClick={goToFish}>어종소개</Text>
        </WhiteBoxHere>
      {/* )} */}
    </>
  );
};

export default MenuComponent;
