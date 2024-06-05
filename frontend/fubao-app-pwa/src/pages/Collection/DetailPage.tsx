import React from "react";
import { useParams } from "react-router-dom";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { myfishGetApi } from "../../store/api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../styles/globalStyles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  id: number;
  fish: Fish;
  max_length: number | null;
  count: number;
  image: string | null;
  preference: boolean;
  user: number;
}

interface Fish {
  id: number;
  name_kor: string;
  name_eng: string;
  fish_difficulty: number;
  subtitle: string;
  document: string;
  release_standard: number;
  prohibit: number;
  bait: number[];
  area: number[];
  equipment: any[];
  method: any[];
}

const FishBox = styled.div`
  /* border: 1px solid black; */
  height: 10rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem;
  /* justify-content: center;
  align-items: center; */
  background-color: white;
`;

const Circle = styled.div`
  border: 1px solid black;
  height: 6rem;
  width: 6rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DetailPage = () => {
  const { fishid } = useParams(); // fishname 파라미터 가져오기
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { data, error, isError } = useQuery<ApiResponse, Error>({
    queryKey: ["fishData"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await myfishGetApi({ token, fishid });
      return response;
    },
  });

  // length 값을 정수로 변환하여 저장
  const lengthInt = Math.floor((data?.max_length || 0) / 10);

  return (
    <div style={{ position:"relative", padding: "3rem 1rem", backgroundColor: "#E3F2FD" }}>
      <ChevronLeftIcon
        sx={{
          position: "absolute",
          top: 22,
          left: 20,
          cursor: "pointer",
        }}
        onClick={handleBack}
      />
      <div
        style={{
          backgroundColor: "white",
          paddingTop: "0.5rem",
          marginTop: "1rem",
          borderRadius: "15px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "1.3rem",
              margin: "0rem 0.5rem 0.3rem",
              fontWeight: "600",
            }}
          >
            낚시 난이도
          </p>
          <div style={{ margin: "0rem 0.5rem 0rem" }}>
            {data &&
              data.fish &&
              Array.from({ length: data.fish.fish_difficulty }, (_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon="star"
                  color="yellow"
                  size="2x"
                />
              ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data && data?.count > 0 ? (
            <img
              src={`/imgs/fish/${fishid}.png`}
              alt="fish"
              style={{ width: "70vw", maxWidth: "450px" }}
            />
          ) : (
            <img
              src={`/imgs/fish_silhouette/${fishid}.png`}
              alt="fish silhouette"
              style={{ width: "70vw", maxWidth: "450px" }}
            />
          )}
        </div>
      </div>
      {data && data.fish && <h2 style={{ textAlign: "center", margin: "0.5rem" }}>
        {data?.fish.name_kor}
      </h2>}

      <p style={{ fontSize: "1.3rem", fontWeight: "300", margin: "0" }}>MY</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ textAlign: "center" }}>
          <Circle>{data?.count}</Circle>
          <span>잡은 수</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Circle>{lengthInt}cm</Circle>
          <span>최대 길이</span>
        </div>
      </div>
      <hr />
      <FishBox>
      {data && data.fish &&
        <p>{data?.fish.subtitle}</p>}
      </FishBox>
      <Link to="/">
        <HomeIcon>
          <FontAwesomeIcon icon="home" />
        </HomeIcon>
      </Link>
    </div>
  );
};

export default DetailPage;
