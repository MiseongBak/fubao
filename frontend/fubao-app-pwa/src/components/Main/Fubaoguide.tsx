import React, { useState } from "react";
import { WhiteBox, AlignDiv } from "./styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import Sheet from "@mui/joy/Sheet";
import styled from "styled-components";
import useStore from "../../store/store";
import {
  ProfileType,
  ScheduleType,
  RecommendationType,
} from "../../store/types";
import { useNavigate } from "react-router-dom";
import {
  classifyApiCreditCard,
  classifyApiCigarette,
  classifyApiNone,
} from "../../store/api";
import { useMutation } from "@tanstack/react-query";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Text = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  margin: 1rem 1rem;
  color: black;
  text-align: center;
`;

const Container = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0;
  background-color: white;
`;

const Fubaoguide = () => {
  const { profile, schedule, recommendation } = useStore() as {
    profile: ProfileType | null;
    schedule: ScheduleType | null;
    recommendation: RecommendationType | null;
  };

  // 현재 날짜 가져오기
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "년 " + month + "월 " + day + "일";

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

  // 카메라 관련
  const [cameraOpen, setcameraOpen] = React.useState<boolean>(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const goToResult = () => {
    navigate("/result");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);

      img.onload = () => {
        let canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_WIDTH = 1760; // 최대 너비
        const MAX_HEIGHT = 990; // 최대 높이
        let width = img.width;
        let height = img.height;

        // 이미지 비율에 맞춰 최대 크기 조정
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // 캔버스에서 이미지를 Blob으로 변환
        canvas.toBlob((blob) => {
          if (blob === null) {
            return; // 혹은 적절한 에러 처리
          }
          const newFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          // Blob을 Base64 문자열로 변환하여 로컬 스토리지에 저장
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            localStorage.setItem("selectedImage", base64String);
            setSelectedFile(newFile); // 새로운 파일 객체 설정
            setFileSelected(true); // 파일 선택 상태 업데이트
          };
          reader.readAsDataURL(newFile);
        }, "image/jpeg");
        // JPEG 형식으로, 품질은 0.7로 설정
      };
    } else {
      setSelectedFile(null);
      setFileSelected(false);
      localStorage.removeItem("selectedImage"); // 이미지 선택을 취소한 경우 로컬 스토리지에서 삭제
      localStorage.removeItem("length");
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setFileSelected(false);
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const creditCardMutation = useMutation({
    mutationFn: classifyApiCreditCard,
    onSuccess: () => {
      setSelectedFile(null);
      setFileSelected(false);
      goToResult();
    },
    onError: (error: AxiosError) => {
      Swal.fire({
        title: "입력 에러",
        html: "알 수 없는 이유로 분석에 실패했습니다. <br> 다시 시도해주세요.",
        icon: "error",
        confirmButtonColor: "#d42c348b",
        confirmButtonText: "확인",
      });
      setcameraOpen(false);
      console.log(error.message);
    },
  });

  const cigaretteMutation = useMutation({
    mutationFn: classifyApiCigarette,
    onSuccess: () => {
      setSelectedFile(null);
      setFileSelected(false);
      goToResult();
    },
    onError: (error: AxiosError) => {
      Swal.fire({
        title: "입력 에러",
        html: "알 수 없는 이유로 분석에 실패했습니다. <br> 다시 시도해주세요.",
        icon: "error",
        confirmButtonColor: "#d42c348b",
        confirmButtonText: "확인",
      });
      setcameraOpen(false);
      console.log(error.message);
    },
  });

  const noneMutation = useMutation({
    mutationFn: classifyApiNone,
    onSuccess: () => {
      setSelectedFile(null);
      setFileSelected(false);
      goToResult();
    },
    onError: (error: AxiosError) => {
      Swal.fire({
        title: "입력 에러",
        html: "알 수 없는 이유로 분석에 실패했습니다. <br> 다시 시도해주세요.",
        icon: "error",
        confirmButtonColor: "#d42c348b",
        confirmButtonText: "확인",
      });
      setcameraOpen(false);
      console.log(error.message);
    },
  });

  const data = [
    {
      src: "/imgs/card.png",
      title: "신용카드",
      description: "높은 정확도",
      onClick: () => {
        if (selectedFile) {
          creditCardMutation.mutate({
            file: selectedFile,
            uid: profile?.id,
          });
        } else {
          // 파일이 선택되지 않았을 때의 처리 로직 (예: 경고 메시지 표시)
          Swal.fire("파일을 선택해주세요.", "", "warning");
        }
      },
    },
    {
      src: "/imgs/ciga.png",
      title: "담배갑",
      description: "보통 정확도",
      onClick: () => {
        if (selectedFile) {
          cigaretteMutation.mutate({
            file: selectedFile,
            uid: profile?.id,
          });
        } else {
          // 파일이 선택되지 않았을 때의 처리 로직 (예: 경고 메시지 표시)
          Swal.fire("파일을 선택해주세요.", "", "warning");
        }
      },
    },
    {
      src: "/imgs/fish.png",
      title: "해당없음",
      description: "어종만 판별",
      onClick: () =>
        selectedFile &&
        noneMutation.mutate({
          file: selectedFile,
          uid: profile?.id,
        }),
    },
    {
      src: "/imgs/cancel.png",
      title: "취소",
      description: "뒤로가기",
      onClick: handleCancel,
    },
  ];

  return (
    <div style={{ margin: "2rem 0rem 0rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!schedule || !schedule.id ? (
          <div className="speech-bubble">
            <Text>
              {`${profile?.nickname}님의 취향 분석 완료!`}
              <br />
              <span style={{ fontWeight: "500" }}>
                {recommendation?.selected_location}
              </span>
              에서{" "}
              <span style={{ fontWeight: "500" }}>
                {recommendation?.selected_method}
              </span>
              로
              <br />
              <span style={{ fontWeight: "500" }}>
                {recommendation?.selected_fish}
              </span>{" "}
              잡아보는건 어때요?
              <br />
              아래에서 관련 정보를 살펴보세요!
            </Text>
          </div>
        ) : dday === 0 ? (
          <div className="speech-bubble">
            <FontAwesomeIcon
              icon="circle-question"
              color="#a1a1a1"
              style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
              onClick={() => {
                Swal.fire({
                  title: "사진 촬영 안내",
                  html: "길이 측정을 위해서 <br> <strong>카드</strong>나 <strong>담뱃갑</strong>을 준비해주세요. <br> 비교물품이 없어도 <br> 어종 판별이 가능합니다!",
                  icon: "info",
                  confirmButtonText: "OK",
                  showCloseButton: true,
                });
              }}
            />

            <Text>
              저에게 사진을 보여주시면,
              <br />
              어떤 물고기인지 알려드리고,
              <br />
              물고기 길이까지 측정해드려요!
            </Text>
            <span
              style={{
                position: "absolute",
                top: "10rem",
                color: "#777777",
                fontSize: "1.2rem",
                fontWeight: "300",
                cursor: "pointer",
              }}
            >
              Click Me!
            </span>
          </div>
        ) : (
          <div className="speech-bubble">
            <Text>
              이번 낚시 일정에 도움 될 정보를
              <br />
              스크롤해서 확인해보세요.
              <br />
              {`${profile?.nickname}님을 위해 준비했어요!`}
            </Text>
          </div>
        )}
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={dday === 0 ? () => setcameraOpen(true) : undefined}
      >
        {!schedule || !schedule.id ? (
          <img
            src="/imgs/my_panda.png"
            alt="panda"
            style={{
              width: "50vw",
              height: "auto",
              maxWidth: "200px",
              marginTop: "0.7rem",
              cursor: "pointer",
            }}
          />
        ) : dday === 0 ? (
          <label htmlFor="file">
            <img
              src="/imgs/panda_camera.png"
              alt="panda"
              style={{
                width: "50vw",
                height: "auto",
                maxWidth: "200px",
                marginTop: "0.7rem",
                cursor: "pointer",
              }}
            />
          </label>
        ) : (
          <img
            src="/imgs/panda_trip.png"
            alt="panda"
            style={{
              width: "50vw",
              height: "auto",
              maxWidth: "200px",
              marginTop: "0.7rem",
              cursor: "pointer",
            }}
          />
        )}

        {/* <label htmlFor="file">
          <img
            src={
              !schedule || !schedule.id
                ? "/imgs/my_panda.png"
                : dday === 0
                  ? "/imgs/panda_camera.png"
                  : "/imgs/panda_trip.png"
            }
            alt="panda"
            style={{
              width: "50vw",
              height: "auto",
              maxWidth: "200px",
              marginTop: "0.7rem",
              cursor: "pointer",
            }}
          />
        </label> */}
      </div>

      {/* 카메라 오픈 모달 */}
      <input
        type="file"
        id="file"
        accept="image/*;capture=camera"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={cameraOpen}
        onClose={() => setcameraOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
          {creditCardMutation.isPending ||
          cigaretteMutation.isPending ||
          noneMutation.isPending ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>어우, 실허네 그놈.</p>
              <img
                src="/classify.png"
                alt="loading"
                style={{ width: "7em", height: "7em" }}
                className="infinite_rotating_logo"
              />
              <p>어디보자. 잠시만 기다려봐.</p>
            </div>
          ) : (
            <WhiteBox className="filebox">
              <AlignDiv style={{ flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!fileSelected && (
                    <>
                      <ModalClose variant="plain" sx={{ m: 1 }} />
                      <p
                        style={{
                          margin: "0.5rem",
                          fontSize: "1.5rem",
                          fontWeight: "600",
                        }}
                      >
                        입력된 사진이 없어요.
                      </p>
                      <img
                        src="/camera.png"
                        alt="camera"
                        style={{ width: "10rem", height: "10rem" }}
                      />
                    </>
                  )}

                  {fileSelected && (
                    <>
                      <p
                        style={{
                          margin: "0.5rem",
                          fontSize: "1.5rem",
                          fontWeight: "600",
                        }}
                      >
                        어떤 물체와 비교해 볼까요?
                      </p>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          py: 3,
                          overflow: "auto",
                          width: 320,
                          scrollSnapType: "x mandatory",
                          "& > *": {
                            scrollSnapAlign: "center",
                          },
                          "::-webkit-scrollbar": { display: "none" },
                        }}
                      >
                        {data.map((item) => (
                          <Card
                            orientation="horizontal"
                            size="sm"
                            key={item.title}
                            variant="outlined"
                            sx={{ padding: "0.5rem" }}
                          >
                            <Container onClick={item.onClick}>
                              <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
                                <img
                                  srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                                  src={`${item.src}?h=120&fit=crop&auto=format`}
                                  alt={item.title}
                                />
                              </AspectRatio>
                              <Box
                                sx={{
                                  whiteSpace: "nowrap",
                                  mx: 1,
                                  textAlign: "center",
                                }}
                              >
                                <Typography level="title-md">
                                  {item.title}
                                </Typography>
                                <Typography level="body-sm">
                                  {item.description}
                                </Typography>
                              </Box>
                            </Container>
                          </Card>
                        ))}
                      </Box>
                      <p style={{ margin: "0", color: "#778A9B" }}>
                        원하는 옵션을 선택해주세요
                      </p>
                    </>
                  )}
                </div>
              </AlignDiv>
            </WhiteBox>
          )}
        </Sheet>
      </Modal>
    </div>
  );
};

export default Fubaoguide;
