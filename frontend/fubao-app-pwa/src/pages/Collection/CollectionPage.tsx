import React, { useEffect, useState } from "react";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { myFishApi } from "../../store/api";
import { useQuery } from "@tanstack/react-query";
import CollectionLoading from "../../components/Loading/CollectionLoading";
import { HomeIcon } from "../../styles/globalStyles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.4rem;
`;

const FishBox = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 6rem;
  height: 6rem;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
`;

const FishName = styled.p`
  font-size: 1rem;
  margin: 0.1rem;
`;

// 물고기 정보 배열
const fishInfos = [
  {
    name: "참돔",
    image: "1.png",
    link: "/detail/1",
    level: 2,
  },
  {
    name: "농어",
    image: "2.png",
    link: "/detail/2",
    level: 1,
  },
  {
    name: "전갱이",
    image: "3.png",
    link: "/detail/3",
    level: 3,
  },
  {
    name: "숭어",
    image: "4.png",
    link: "/detail/4",
    level: 2,
  },
  {
    name: "고등어",
    image: "5.png",
    link: "/detail/5",
    level: 1,
  },
  {
    name: "광어",
    image: "6.png",
    link: "/detail/6",
    level: 2,
  },
  {
    name: "우럭",
    image: "7.png",
    link: "/detail/7",
    level: 2,
  },
  {
    name: "감성돔",
    image: "8.png",
    link: "/detail/8",
    level: 1,
  },
  {
    name: "돌돔",
    image: "9.png",
    link: "/detail/9",
    level: 2,
  },
  {
    name: "쥐노래미",
    image: "10.png",
    link: "/detail/10",
    level: 3,
  },
  // {
  //   name: "미정",
  //   image: "temp.png",
  //   link: "#",
  //   level: 4,
  // },
];

const CollectionPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { data, error, isError } = useQuery({
    queryKey: ["fishData"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await myFishApi(token);
      return response;
    },
  });

  useEffect(() => {
    setIsLoading(true);
    if (data) {
      setIsLoading(false);
      console.log(data);
    }
  }, [data]);

  if (isError) {
    return <p>데이터를 가져오지 못했습니다.</p>;
  }

  if (isLoading) {
    return <CollectionLoading />;
  }

  return (
    <div
      style={{
        height: "100vh",
        padding: "1rem",
        paddingBottom: "2rem",
        backgroundColor: "#E3F2FD",
        position: "relative",
      }}
    >
      <ChevronLeftIcon
        sx={{
          position: "absolute",
          top: 22,
          left: 20,
          cursor: "pointer",
        }}
        onClick={handleBack}
      />
      <p
        style={{
          fontWeight: 600,
          fontSize: "1.5rem",
          margin: "3rem 0.5rem 0.5rem",
        }}
      >
        도감리스트
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0.5rem 0.8rem",
        }}
      >
        <div>
          <FontAwesomeIcon icon="fish" size="1x" color="#1565C0" />
          <span> 도감 완성도</span>
        </div>
        <span>{data ? `${data.length > 0 ? data[0] : 0}/10` : "0/10"}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "326.4px" }}>
          {fishInfos.map(({ name, image, link, level }, index) => (
            <Link
              to={link}
              style={{ textDecoration: "none", color: "black" }}
              key={name}
            >
              <InfoBox>
                <FishBox>
                  {[...Array(4)].map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={index < level ? "star" : ["far", "star"]}
                      size="1x"
                      color="#FFC107"
                    />
                  ))}
                  {data && data.length > 2 && data[2][index] && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <img
                        src={
                          data[2][index].count === 0
                            ? `/imgs/fish_silhouette/${image}`
                            : `/imgs/fish/${image}`
                        }
                        alt={name}
                        style={{ width: "5.5rem", borderRadius: "10px" }}
                      />
                    </div>
                  )}
                </FishBox>
                <FishName>{name}</FishName>
              </InfoBox>
            </Link>
          ))}
        </div>
      </div>
      <Link to="/">
        <HomeIcon>
          <FontAwesomeIcon icon="home" />
        </HomeIcon>
      </Link>
    </div>
  );
};

export default CollectionPage;
