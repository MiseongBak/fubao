import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { methodGetApi } from "../../store/api";
import { useQuery } from "@tanstack/react-query";

interface Method {
  title: string;
  subtitle: string;
  document: string;
}

const MImg = {image: '/imgs/method4.jpg'};

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

const MethodPage4 = () => {
  const { data: method, isError, isLoading } = useQuery<Method>({
    queryKey: ["methodData"], // Pass query key as part of the options object
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await methodGetApi(token);
      return response[3];
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !method) {
    return <p>데이터를 가져오지 못했습니다.</p>;
  }

  // method 상태를 사용하여 해당 데이터 렌더링
  return (
    <div style={{ padding:"1rem 1rem 2rem" }}>
      {method && (
        <>
          <Title>{method.title}</Title>
          <Subtitle>{method.subtitle}</Subtitle>
          <AlignDiv>
          <img
            src={MImg.image}
            alt={method.title}
            style={{ width: "100%", maxWidth: "500px", height: "auto", margin: "0.5rem 0rem" }}
          />
          </AlignDiv>
          <p>{method.document}</p>
        </>
      )}
    </div>
  );
};

export default MethodPage4;
