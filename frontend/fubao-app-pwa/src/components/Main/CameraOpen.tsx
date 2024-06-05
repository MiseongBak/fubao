import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WhiteBox, AlignDiv, PendingBox } from "./styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../index.css";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  classifyApiCreditCard,
  classifyApiCigarette,
  classifyApiNone,
} from "../../store/api";
import { motion } from "framer-motion";

const Container = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0;
  background-color: white;
`;

const CameraOpen = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 임시
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      // 생성된 URL을 컴포넌트가 언마운트될 때 해제
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const navigate = useNavigate();

  const goToResult = () => {
    navigate("/result");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFileSelected(true);
    } else {
      setSelectedFile(null);
      setFileSelected(false);
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
      console.log(error.message);
    },
  });

  const data = [
    {
      src: "/imgs/card.png",
      title: "신용카드",
      description: "높은 정확도",
    //   onClick: () => selectedFile && creditCardMutation.mutate(selectedFile),
    },
    {
      src: "/imgs/ciga.png",
      title: "담배갑",
      description: "보통 정확도",
    //   onClick: () => selectedFile && cigaretteMutation.mutate(selectedFile),
    },
    {
      src: "/imgs/fish.png",
      title: "해당없음",
      description: "어종만 판별",
    //   onClick: () => selectedFile && noneMutation.mutate(selectedFile),
    },
    {
      src: "/imgs/cancel.png",
      title: "취소",
      description: "뒤로가기",
      onClick: handleCancel,
    },
  ];

  return (
    <div>
      {creditCardMutation.isPending ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          분석중입니다. 조금만 기다려주세요.
        </div>
      ) : (
        <WhiteBox className="filebox">
          <AlignDiv style={{ flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!fileSelected && (
                <>
                  <p
                    style={{
                      margin: "0.5rem",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    원터치로 어종/길이 판별
                  </p>
                  <label htmlFor="file">
                    <img
                      src="/camera.png"
                      alt="camera"
                      style={{ width: "10rem", height: "10rem" }}
                    />
                  </label>
                  <p style={{ margin: "0", color: "#778A9B" }}>
                    푸바오를 클릭해주세요
                  </p>
                </>
              )}

              <input
                type="file"
                id="file"
                accept="image/*;capture=camera"
                onChange={handleFileChange}
              />

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
    </div>
  );
};

export default CameraOpen;
