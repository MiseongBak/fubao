import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/joy/Button";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { schedulePatchApi } from "../../store/api";
import useStore from "../../store/store";
import { ScheduleType } from "../../store/types";
import Autocomplete from "@mui/joy/Autocomplete"; // 장소 검색 관련
import location from "../../data/location.json";

type SchedulePatchParams = {
  date: Date | string; // Date 객체 또는 ISO 형식의 문자열
  location: string;
  point: string; // 포인트 선택 값
  method: string; // 방법 선택 값
};

const LocationOptions = location;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
`;

const RegisterBox = styled.div`
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Span = styled.span`
  display: inline-block;
  width: 20rem;
  margin-right: 0.5rem;
`;

const AlignDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlanManagePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const navigate = useNavigate();
  const API_URL = "https://i10c104.p.ssafy.io/api";
  const token = localStorage.getItem("token");

  const { schedule } = useStore() as {
    schedule: ScheduleType | null;
  };

  const schedulePatch = async ({
    date,
    location,
    point,
    method,
  }: SchedulePatchParams) => {
    if (token && schedule) {
      const id = schedule.id; // 'myScheduleId' 대신 'id' 사용
      try {
        await schedulePatchApi({ token, id, date, location, point, method });
        // 비동기 요청이 성공하면 Swal 알림 표시
        Swal.fire({
          title: "일정 수정 완료",
          text: "등록된 일정이 성공적으로 수정되었습니다.", // 메시지 수정
          icon: "success",
        });
        // Swal 알림 후 페이지 이동
        navigate("/");
      } catch (error) {
        console.error("스케줄 변경 실패:", error);
        Swal.fire({
          title: "변경 실패",
          text: "스케줄 변경에 실패했습니다.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
    }
  };
  

  const Cancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    axios
      .delete(`${API_URL}/schedule/done/${schedule?.id}/`, {
        headers: {
          // 임시토큰값
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "일정 삭제 완료",
          text: "등록된 일정이 삭제되었습니다.",
          icon: "success",
        });
      })
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "에러 발생",
          text: "알 수 없는 에러가 발생했습니다.",
        });
      });
  };

  const [selectedPointOption, setSelectedPointOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [selectedMethodOption, setSelectedMethodOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const handlePointChange = (
    selectedPointOption: { value: string; label: string } | null
  ) => {
    setSelectedPointOption(selectedPointOption);
  };

  const handleMethodChange = (
    selectedMethodOption: { value: string; label: string } | null
  ) => {
    setSelectedMethodOption(selectedMethodOption);
  };

  const PointOptions = [
    { value: "1", label: "방파제" },
    { value: "2", label: "갯바위" },
    { value: "3", label: "선착장" },
    { value: "4", label: "선상" },
  ];

  const MethodOptions = [
    { value: "1", label: "찌낚시" },
    { value: "2", label: "원투낚시" },
    { value: "3", label: "루어낚시" },
    { value: "4", label: "훌치기낚시" },
  ];

  const PointSelect = () => (
    <Select
      options={PointOptions}
      value={selectedPointOption}
      placeholder={schedule?.area.title}
      onChange={handlePointChange}
      required
      name="area"
      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: "10px",
          margin: "0.5rem 0rem",
          width: "21rem",
          borderColor: "#ccc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: 16,
        }),
        menu: (provided) => ({
          ...provided,
          marginTop: -8,
        }),
      }}
    />
  );

  const MethodSelect = () => (
    <Select
      options={MethodOptions}
      value={selectedMethodOption}
      placeholder={schedule?.method.title}
      onChange={handleMethodChange}
      required
      name="method"
      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: "10px",
          margin: "0.5rem 0rem",
          width: "21rem",
          borderColor: "#ccc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: 16,
        }),
        menu: (provided) => ({
          ...provided,
          marginTop: -8,
        }),
      }}
    />
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const [selectedValue, setSelectedValue] = useState("");

  

  return (
    <Container>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>일정관리</p>
      {/* 등록된 일정 칸 */}
      <form action="">
        <RegisterBox>
          <AlignDiv>
            <Span>일정:</Span>
            <DatePicker
              className="datePicker"
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect
              minDate={new Date()}
              maxDate={new Date(year + 1 + "-" + month + "-" + day)}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </AlignDiv>
          <AlignDiv>
            <Span>장소: </Span>
            <Autocomplete
              name="location"
              type="search"
              placeholder={schedule?.location.address}
              freeSolo
              disableClearable
              options={LocationOptions.map((option) => option.title)}
              sx={{
                borderRadius: "10px",
                margin: "0.5rem 0rem",
                width: "21rem",
                borderColor: "#ccc",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: 16,
              }}
              value={selectedValue}
              onChange={(event, newValue) => {
                const value =
                  LocationOptions.find(
                    (option) => option.title === newValue
                  )?.value.toString() || "";
                setSelectedValue(value);
              }}
            />
          </AlignDiv>
          <AlignDiv>
            <Span>포인트: </Span>
            <PointSelect />
          </AlignDiv>
          <AlignDiv>
            <Span>방법: </Span>
            <MethodSelect />
          </AlignDiv>
          <div>
            <Button
              size="md"
              variant="solid"
              style={{ margin: "2rem", marginRight: "0.2rem" }}
              onClick={() => {
                if (
                  selectedDate &&
                  selectedValue &&
                  selectedPointOption &&
                  selectedMethodOption
                ) {
                  schedulePatch({
                    date: selectedDate,
                    location: selectedValue,
                    point: selectedPointOption.value,
                    method: selectedMethodOption.value
                  });
                }
              }}
            >
              수정하기
            </Button>

            <Button
              size="md"
              variant="solid"
              color="danger"
              style={{ margin: "2rem", marginLeft: "0.2rem" }}
              onClick={Cancel}
            >
              삭제하기
            </Button>
          </div>
        </RegisterBox>
      </form>
    </Container>
  );
};

export default PlanManagePage;
