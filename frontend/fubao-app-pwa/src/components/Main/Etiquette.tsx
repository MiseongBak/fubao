import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EtiquetteWhiteBox, EtiquetteWhiteBox1 } from "./styles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import useStore from "../../store/store";
import PlanRegister from "../Modal/PlanRegister";
import { planRegisterApi } from "../../store/api";
import { ScheduleType } from "../../store/types";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const EtiquetteTextS = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0rem 0rem;
  color: #778a9b;
`;

export const EtiquetteTextL = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0rem 0rem;
  color: #2979ff;
`;

const Etiquette = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [planRegisterOpen, setplanRegisterOpen] = useState<boolean>(false);

  const { schedule } = useStore() as {
    schedule: ScheduleType | null;
  };

  const handleClick = () => {
    navigate("/etiquetteinfo");
  };

  const goToPlan = () => {
    navigate("/planmanage");
  }

  const planRegisterMutation = useMutation({
    mutationFn: planRegisterApi,
    onSuccess: () => {
      Swal.fire({
        title: "일정 등록 완료",
        text: "와우, 벌써부터 설레는걸요?",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "일정등록 에러",
        text: "일정등록에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonColor: "#d42c348b",
        confirmButtonText: "확인",
      });
      console.log(error.message);
    },
    onSettled: () => {
      setplanRegisterOpen(false);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData(event.currentTarget);
    const location = data.get("location") as string;
    const area = data.get("area") as string;
    const method = data.get("method") as string;

    const date = selectedDate
      ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${selectedDate
          .getDate()
          .toString()
          .padStart(2, "0")}`
      : "";

    planRegisterMutation.mutate({ date, location, area, method, token });
  };

  const today = new Date();

  // 디데이 계산 함수
  const calculateDday = () => {
    if (schedule && schedule.date) {
      const eventDate = new Date(schedule.date);
      eventDate.setHours(0, 0, 0, 0);
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays; // 남은 일수 반환
    }
    return null; // schedule.date가 없는 경우
  };

  const dday = calculateDday();

  return (
    <>
      {schedule ? (
        dday === 0 ? (
          <EtiquetteWhiteBox
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <div>
              <EtiquetteTextS>에티켓 지키면 고기가 잘 잡힌대요</EtiquetteTextS>
              <EtiquetteTextL>오늘은 낚시일, 에티켓 확인</EtiquetteTextL>
            </div>
            <FontAwesomeIcon icon="chevron-right" size="1x" color="#778A9B" />
          </EtiquetteWhiteBox>
        ) : (
          <EtiquetteWhiteBox1 style={{ cursor: "pointer" }} onClick={goToPlan}>
            <FontAwesomeIcon icon="calendar-day" size="3x" color="#9e9e9e" />
            <div style={{ marginLeft:"1rem" }}>
              <EtiquetteTextS>등록된 일정까지 {dday}일 남았네요</EtiquetteTextS>
              <EtiquetteTextL>푸른 바다로 오세요</EtiquetteTextL>
            </div>
          </EtiquetteWhiteBox1>
        )
      ) : (
        <EtiquetteWhiteBox onClick={() => setplanRegisterOpen(true)} style={{ cursor: "pointer" }}>
          <div>
            <EtiquetteTextS>푸바오와 함께 낚시하러 가요</EtiquetteTextS>
            <EtiquetteTextL>일정 등록하고 맞춤 정보 받기</EtiquetteTextL>
          </div>
          <FontAwesomeIcon icon="chevron-right" size="1x" color="#778A9B" />
        </EtiquetteWhiteBox>
      )}

      <PlanRegister
        open={planRegisterOpen}
        onClose={() => setplanRegisterOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Etiquette;
