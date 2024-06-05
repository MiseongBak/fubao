import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../FontAwsome";
import { fishGetApi } from "../../store/api";
import { useParams } from "react-router-dom";

type FishData = {
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
  equipment: number[];
  method: number[];
};

// 물고기 images
const fishImages = [
  { name: '참돔', image: '/imgs/fish/1.png', nickname: '바다의 여왕으로 알려진'}, // 1. 참돔
  { name: '농어', image: '/imgs/fish/2.png', nickname: '몸매가 좋은 8등신 생선'}, // 2. 농어
  { name: '전갱이', image: '/imgs/fish/3.png', nickname: '나 한번 잡아보시지,'}, // 3. 전갱이
  { name: '숭어', image: '/imgs/fish/4.png', nickname: '나는야 별명 부자'}, // 4. 숭어
  { name: '고등어', image: '/imgs/fish/5.png', nickname: '고단백 고영양 고갈비'}, // 5. 고등어
  { name: '광어', image: '/imgs/fish/6.png', nickname: '곁눈질 하는거 아닙니다'}, // 6. 광어
  { name: '우럭', image: '/imgs/fish/7.png', nickname: '우럭 못잡으면 광광 우럭'}, // 7. 우럭
  { name: '감성돔', image: '/imgs/fish/8.png', nickname: '감성보단 갬성 갬성돔'}, // 8. 감성돔
  { name: '돌돔', image: '/imgs/fish/9.png', nickname: '생긴 것부터 바다의 폭군'}, // 9. 돌돔
  { name: '쥐노래미', image: '/imgs/fish/10.png', nickname: '잡으면 깜짝 놀래미,'}, // 10. 쥐노래미
];

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

const FishPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fishId = id ? parseInt(id, 10) : 0;

  const [fish, setFish] = useState<FishData[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await fishGetApi(token);
        setFish(response);
        console.log(response);
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
      }
    };

    fetchFish();
  }, [token]);

  const fishData = fish[fishId - 1];
  const fishImage = fishImages[fishId - 1];

  if (!fishData) {
    return <div>Fish not found!</div>;
  }

  if (!fishImage) {
    return <div>Fish image not found!</div>;
  }

  return (
    <div style={{ padding:"1rem 1rem 2rem" }}>
      <Title>{fishData.name_kor}</Title>
      <Subtitle>{fishData.subtitle}</Subtitle>
      <p>{fishData.document}</p>
      <AlignDiv>
        <img 
          src={fishImage.image}
          alt={fishData.name_kor}
          style={{ width: "100%", maxWidth: "500px", height: "auto", margin: "3rem 0rem" }}
        />
      </AlignDiv>
    </div>
  );
};

export default FishPage;