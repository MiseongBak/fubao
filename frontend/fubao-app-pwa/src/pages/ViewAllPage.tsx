import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { logoutApi, removeProfileApi } from "../store/api";
import Swal from "sweetalert2";
import useStore from "../store/store";
import { Link } from "react-router-dom";
import { HomeIcon } from "../styles/globalStyles";
import "../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ScheduleType } from "../store/types";

const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const MyButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border: 0;
  background-color: transparent;
  margin: 1em;
  cursor: pointer;
`;

const ButtonText = styled.span`
  margin-top: 0.5rem;
  min-width: 50px;
`;

const ViewAllPage = () => {
  const { resetStore } = useStore();
  const navigate = useNavigate();

  const { schedule } = useStore() as {
    schedule: ScheduleType | null;
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logoutApi(token); // 로그아웃 API 호출
        localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
        resetStore(); // 스토어를 초기 상태로 재설정
      } catch (error) {
        console.error("로그아웃 실패:", error);
        // 오류 처리 로직
      }
    }
  };

  const logoutConfirm = () => {
    Swal.fire({
      title: "로그아웃",
      text: "정말로 로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/introduction");
      }
    });
  };

  const removeProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await removeProfileApi(token);
        localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
        sessionStorage.removeItem("user");
        resetStore(); // 스토어를 초기 상태로 재설정
        navigate("/introduction");
      } catch (error) {
        console.error("회원탈퇴 실패:", error);
      }
    }
  };

  const removeProfileConfirm = () => {
    Swal.fire({
      title: "회원탈퇴",
      text: "정말로 회원탈퇴 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        removeProfile();
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container style={{ position: "relative" }}>
      <ChevronLeftIcon
        sx={{
          position: "absolute",
          top: 22,
          left: 20,
          cursor: "pointer",
        }}
        onClick={handleBack}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          {/* 로그인 정보 토대로 닉네임 받아서 각 프로필 페이지로 이동 라우터 설정도 해야함 */}
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="user" size="3x" />
              <ButtonText>프로필</ButtonText>
            </MyButton>
          </Link>

          {schedule && schedule.date ? (
            <Link to="/planmanage" style={{ textDecoration: "none" }}>
              <MyButton>
                <FontAwesomeIcon icon="calendar-day" size="3x" />
                <ButtonText>일정관리</ButtonText>
              </MyButton>
            </Link>
          ) : (
            <MyButton disabled style={{cursor:"not-allowed"}}>
              <FontAwesomeIcon icon="calendar-day" size="3x" />
              <ButtonText>일정관리</ButtonText>
            </MyButton>
          )}

          <Link to="/collection" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="book" size="3x" />
              <ButtonText>도감</ButtonText>
            </MyButton>
          </Link>
        </div>

        <div style={{ display: "flex" }}>
          <Link to="/map" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="map" size="3x" />
              <ButtonText>지도</ButtonText>
            </MyButton>
          </Link>

          <Link to="/point" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="check" size="3x" />
              <ButtonText>포인트</ButtonText>
            </MyButton>
          </Link>

          <Link to="/method" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="clipboard-question" size="3x" />
              <ButtonText>방법</ButtonText>
            </MyButton>
          </Link>
        </div>

        <div style={{ display: "flex" }}>
          <Link to="/fishinfo" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="fish" size="3x" />
              <ButtonText>어종</ButtonText>
            </MyButton>
          </Link>

          <Link to="/prohibitioninfo" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="ban" size="3x" />
              <ButtonText>금어기</ButtonText>
            </MyButton>
          </Link>

          <Link to="/releaseinfo" style={{ textDecoration: "none" }}>
            <MyButton>
              <FontAwesomeIcon icon="arrow-rotate-left" size="3x" />
              <ButtonText>방생기준</ButtonText>
            </MyButton>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <span style={{ cursor: "pointer" }} onClick={logoutConfirm}>
            로그아웃
          </span>
          <span>　|　</span>
          <span onClick={removeProfileConfirm} style={{ color: "#DD0C0C" }}>
            회원탈퇴
          </span>
        </div>
      </div>

      <Link to="/">
        <HomeIcon>
          <FontAwesomeIcon icon="home" />
        </HomeIcon>
      </Link>
    </Container>
  );
};

export default ViewAllPage;
