import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/joy/Modal";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "@mui/joy/Autocomplete"; // 장소 검색 관련
import location from "../../data/location.json";

const LocationOptions = location;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
`;

const RegisterBox = styled.form`
  height: 25rem;
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

interface PlanRegisterProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PlanRegister: React.FC<PlanRegisterProps> = ({
  open,
  onClose,
  selectedDate,
  setSelectedDate,
  handleSubmit,
}) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

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
      placeholder="어느 포인트에서 하실 예정이세요?"
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
      placeholder="어떤 방법으로 하실 예정이세요?"
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

  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="bold"
          fontSize={"1.5rem"}
          textAlign={"center"}
          mb={1}
        >
          일정등록
        </Typography>
        <Container id="modal-desc">
          <RegisterBox onSubmit={handleSubmit}>
            <AlignDiv>
              <Span>일정: </Span>
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
                placeholder="검색, 선택하시면 해당 ID가 입력됩니다."
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
            <Button
              size="md"
              variant="solid"
              style={{ margin: "2rem", marginRight: "0.2rem" }}
              type="submit"
            >
              등록하기
            </Button>
          </RegisterBox>
        </Container>
      </Sheet>
    </Modal>
  );
};

export default PlanRegister;
