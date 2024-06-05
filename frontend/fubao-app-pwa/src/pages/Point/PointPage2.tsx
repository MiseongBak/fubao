import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { pointGetApi } from "../../store/api";
import { useQuery } from "@tanstack/react-query";

interface Point {
  title: string;
  subtitle: string;
  document: string;
}

const MImg = {image: '/imgs/point2.jpg'};

const Title = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  font-size: 2rem;
  font-weight: 600;
  color: #202125;
`;

const Subtitle = styled.p`
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #AEB1BA;
`;

const AlignDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #202125;
`;

const PointPage2 = () => {
  const { data: point, isError, isLoading } = useQuery<Point>({
    queryKey: ["pointData"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await pointGetApi(token);
      return response[1];
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !point) {
    return <p>데이터를 가져오지 못했습니다.</p>;
  }

  return (
    <div style={{ padding:"1rem 1rem 2rem" }}>
      {point && (
        <>
          <Title>{point.title}</Title>
          <Subtitle>{point.subtitle}</Subtitle>
          <AlignDiv>
          <img
            src={MImg.image}
            alt={point.title}
            style={{ width: "100%", maxWidth: "500px", height: "auto", margin: "0.5rem 0rem" }}
          />
          </AlignDiv>
          <p>{point.document}</p>
        </>
      )}
    </div>
  );
};

export default PointPage2;
