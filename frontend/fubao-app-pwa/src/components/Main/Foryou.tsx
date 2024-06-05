import React, { useState } from "react";
import { WhiteBox } from "./styles";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "../../index.css";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlanRegister from "../Modal/PlanRegister";
import { useMutation } from "@tanstack/react-query";
import { planRegisterApi } from "../../store/api";

const Foryou = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 현재 날짜 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "년 " + month + "월 " + day + "일";

  const planRegisterMutation = useMutation({
    mutationFn: planRegisterApi,
    onSuccess: () => {
      Swal.fire({
        title: "일정 등록 완료",
        text: "와우, 벌써부터 설레는걸요?",
        icon: "success",
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
      setOpen(false);
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

  return (
    <WhiteBox
      style={{
        position: "relative",
        backgroundImage: "url('/imgs/main_plan.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <React.Fragment>
        <div
          onClick={() => setOpen(true)}
          style={{
            marginLeft: "0.3rem",
            marginTop: "0.2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontWeight: "300" }}>{dateString}</div>

          {/* 일정이 등록되지 않았을 경우 */}
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "1.5rem",
              fontWeight: "600",
              height: "13rem",
            }}
          >
            낚시 일정을 등록하면
            <br />
            뭐부터 시작할지
            <br />
            알려줄게요
          </div>
          <div
            style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #778A9B",
                borderRadius: "50px",
                width: "1.3rem",
                height: "1.3rem",
                margin: "0.3rem",
              }}
            >
              <FontAwesomeIcon icon="plus" size="1x" color="#778A9B" />
            </div>
          </div>
        </div>

        {/* 일정 등록 모달 */}
        <PlanRegister
          open={open}
          onClose={() => setOpen(false)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleSubmit={handleSubmit}
        />
      </React.Fragment>
    </WhiteBox>
  );
};

export default Foryou;
