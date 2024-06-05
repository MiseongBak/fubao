import React, { useState } from "react";
import "../../FontAwsome";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../styles/globalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import useStore from "../../store/store";
import { logoutApi, removeProfileApi } from "../../store/api";
import { ProfileType } from "../../store/types";
import ProfileUpdate from "../../components/Modal/ProfileUpdate";
import Swal from "sweetalert2";
import NicknameUpdate from "../../components/Modal/NicknameUpdate";
import "../../index.css";

const Circle = styled.div`
  border: 1px solid black;
  height: 5.5rem;
  width: 5.5rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile } = useStore() as { profile: ProfileType | null };
  const { resetStore } = useStore();

  const goToLogin = () => {
    navigate("/login");
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logoutApi(token); // 로그아웃 API 호출
        localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
        sessionStorage.removeItem("user");
        resetStore(); // 스토어를 초기 상태로 재설정
        navigate("/introduction");
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

  // ProfileUpdate 모달의 상태
  const [openProfileUpdate, setOpenProfileUpdate] = useState(false);

  // NicknameUpdate 모달의 상태
  const [openNicknameUpdate, setOpenNicknameUpdate] = useState(false);

  const formatDate = (dateString: string) => {
    return dateString.split("-").join(".");
  };

  const formattedDate =
    profile && profile.latest_schedule_date
      ? formatDate(profile.latest_schedule_date)
      : "출조예정";

  return (
    <div style={{ padding: "1rem" }}>
      {/* 사용자 정보 */}
      <div
        style={{
          padding: "3rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="profile-img-container"
          onClick={() => setOpenProfileUpdate(true)}
        >
          <img
            src={
              profile && profile.profile_img
                ? profile.profile_img
                : "/temp_profile.png"
            }
            alt="Profile"
          />
          <div className="camera-icon">
            <FontAwesomeIcon icon="camera-retro" color="#919191" size="2x" />
          </div>
        </div>
        <ProfileUpdate
          openProfileUpdate={openProfileUpdate}
          setOpenProfileUpdate={setOpenProfileUpdate}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: "0.5rem",
              marginBottom: "0",
            }}
          >
            {profile ? profile.nickname : "내일은낚시왕"}
          </p>
          <FontAwesomeIcon
            icon="gear"
            size="1x"
            color="#969696"
            style={{ paddingTop: "0.8rem", cursor: "pointer" }}
            onClick={() => setOpenNicknameUpdate(true)}
          />
          <NicknameUpdate
            openNicknameUpdate={openNicknameUpdate}
            setOpenNicknameUpdate={setOpenNicknameUpdate}
          />
        </div>
        <div style={{ color: "#969696" }}>
          {profile ? profile.email : "로그인이 필요한 서비스입니다"}
        </div>
      </div>

      {/* 대시보드 */}
      <p style={{ marginTop: "0" }}>Dashboard</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ textAlign: "center" }}>
          <Circle>{profile ? profile.total_schedules : "0"}</Circle>
          <span>출조 횟수</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Circle>{profile ? profile.total_fish_count : "0"}</Circle>
          <span>잡은 물고기 수</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Circle>{formattedDate}</Circle>
          <span>마지막 낚시일</span>
        </div>
      </div>

      {profile ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <span onClick={logoutConfirm}>로그아웃</span>
          <span>　|　</span>
          <span onClick={removeProfileConfirm} style={{ color: "#DD0C0C" }}>
            회원탈퇴
          </span>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <span onClick={goToLogin}>로그인하기</span>
        </div>
      )}

      <Link to="/">
        <HomeIcon>
          <FontAwesomeIcon icon="home" />
        </HomeIcon>
      </Link>
    </div>
  );
};

export default ProfilePage;
