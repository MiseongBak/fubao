import React from "react";
import styled from "styled-components";

const EntryLoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 576px;
  background-color: #42a5f5;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const SmallP = styled.p`
  font-size: 1.2rem;
  margin: 0;
  font-weight: 100;
`;

const BiggerP = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
  margin: 0;
`;

const EntryLoading = () => {
  return (
    <EntryLoadingBox>
      <SmallP>맞춤 정보를 로딩중입니다.</SmallP>
      <img
        src="/Fubao_logo_nobackground.png"
        alt="Fubao_Logo"
        style={{ width: "7em", height: "7em", margin: "1rem" }}
        className="infinite_rotating_logo"
      />
      <BiggerP>푸바오: 푸른 바다로 오세요</BiggerP>
    </EntryLoadingBox>
  );
};

export default EntryLoading;
