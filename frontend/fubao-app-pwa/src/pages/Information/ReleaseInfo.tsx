import React, { useEffect, useState } from "react";
import { releaseFishApi } from "../../store/api";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../styles/globalStyles";
import "../../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
// https://www.youtube.com/watch?v=qk2oY7W3fuY

// 아니 타입 지정 안되면 다 ^^^^하고 오류뜨네ㅠㅠㅠ
type ReleaseInfo = {
  id: number;
  name_kor: string;
  name_eng: string;
  standard: number | null;
};

// 물고기 images
const fishImages = [
  { name: "참돔", image: "/imgs/fish/1.png", link: "/detail/참돔" }, // 1. 참돔
  { name: "농어", image: "/imgs/fish/2.png", link: "/detail/농어" }, // 2. 농어
  { name: "전갱이", image: "/imgs/fish/3.png", link: "/detail/전갱이" }, // 3. 전갱이
  { name: "숭어", image: "/imgs/fish/4.png", link: "/detail/숭어" }, // 4. 숭어
  { name: "고등어", image: "/imgs/fish/5.png", link: "/detail/고등어" }, // 5. 고등어
  { name: "광어", image: "/imgs/fish/6.png", link: "/detail/광어" }, // 6. 광어
  { name: "우럭", image: "/imgs/fish/7.png", link: "/detail/우럭" }, // 7. 우럭
  {
    name: "감성돔",
    image: "/imgs/fish/8.png",
    link: "/detail/감성돔",
  }, // 8. 감성돔
  { name: "돌돔", image: "/imgs/fish/9.png", link: "/detail/돌돔" }, // 9. 돌돔
  {
    name: "쥐노래미",
    image: "/imgs/fish/10.png",
    link: "/detail/쥐노래미",
  }, // 10. 쥐노래미
];

const ReleaseInfoPage = () => {
  // https://www.youtube.com/watch?v=8GZTUOAk5i0
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo[]>([]); // 이곳에 API로부터 받아온 정보를 저장 (type지정해둔것도 사용!)
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // token 가져와서
        const apiResponse = await releaseFishApi(token); // releaseFishApi 호출할 때 토큰 주기
        setReleaseInfo(apiResponse);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData(); // useEffect가 실행될 때 API 호출
  }, []);

  return (
    <div style={{ position: "relative" }}>
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
          padding: "1rem 0rem 0rem",
          textAlign: "center",
          fontSize: "1.3rem",
        }}
      >
        <span>방생기준 안내</span>
      </div>
      <TableContainer
        component={Paper}
        style={{ paddingBottom: "3rem" }}
      >
        <Table aria-label="release_standards">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {releaseInfo.map((info) => (
              <TableRow key={info.id} style={{ borderBottom: "none" }}>
                <TableCell>
                  <img
                    src={fishImages[info.id - 1]?.image}
                    alt={info.name_kor}
                    style={{ width: "3rem", borderRadius: "5px" }}
                  />
                </TableCell>
                <TableCell>
                  <div>한국어 이름: {info.name_kor}</div>
                  <div>영어 이름: {info.name_eng}</div>
                  <div>
                    방생기준: {info.standard ? info.standard + "cm" : "N/A"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/">
        <HomeIcon>
          <FontAwesomeIcon icon="home" />
        </HomeIcon>
      </Link>
    </div>
  );
};

export default ReleaseInfoPage;
