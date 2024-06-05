import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import Fubaoguide from "../components/Main/Fubaoguide";
import MenuComponent from "../components/Main/MenuComponent";
import LocationComponent from "../components/Main/LocationComponent";
import PlanLocation from "../components/Main/PlanLocation";
import Method1 from "../components/Main/Method1";
import Method2 from "../components/Main/Method2";
import Method3 from "../components/Main/Method3";
import Method4 from "../components/Main/Method4";
import Point1 from "../components/Main/Point1";
import Point2 from "../components/Main/Point2";
import Point3 from "../components/Main/Point3";
import Point4 from "../components/Main/Point4";
import Fish1 from "../components/Main/Fish1";
import Fish2 from "../components/Main/Fish2";
import Fish3 from "../components/Main/Fish3";
import Fish4 from "../components/Main/Fish4";
import Fish5 from "../components/Main/Fish5";
import Fish6 from "../components/Main/Fish6";
import Fish7 from "../components/Main/Fish7";
import Fish8 from "../components/Main/Fish8";
import Fish9 from "../components/Main/Fish9";
import Fish10 from "../components/Main/Fish10";
import Etiquette from "../components/Main/Etiquette";
import Swal from "sweetalert2";
import "../FontAwsome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Review from "../components/Modal/Review";
import {
  logoutApi,
  surveyPatchApi,
  surveyMethodApi,
  surveyFishApi,
} from "../store/api";
import useStore from "../store/store";
import EntryLoading from "../components/Entry/EntryLoading";
import { ProfileType, RecommendationType, ScheduleType } from "../store/types";

type SelectedState = number[];

function HomePage() {
  const { resetStore, loadData } = useStore();
  const { profile, schedule, recommendation } = useStore() as {
    profile: ProfileType | null;
    schedule: ScheduleType | null;
    recommendation: RecommendationType | null;
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedMethods, setSelectedMethods] = useState<SelectedState>([]);
  const [selectedFishes, setSelectedFishes] = useState<SelectedState>([]);

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target; // value는 체크박스의 id(숫자)입니다.
    const methodId = Number(value); // 문자열을 숫자로 변환

    setSelectedMethods((prev) =>
      checked ? [...prev, methodId] : prev.filter((id) => id !== methodId)
    );
  };

  const handleFishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const fishId = Number(value); // 문자열을 숫자로 변환

    setSelectedFishes((prev) =>
      checked ? [...prev, fishId] : prev.filter((id) => id !== fishId)
    );
  };

  const submitSurvey = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // 낚시 방법에 대한 API 호출
      if (selectedMethods.length > 0) {
        await Promise.all(
          selectedMethods.map((methodId) =>
            surveyMethodApi({ token, weight: 1, method: methodId })
          )
        );
      }

      // 모든 물고기에 대해 API 호출, 선택된 물고기는 preference를 1로, 그렇지 않은 물고기는 0으로 설정
      const allFishIds = Array.from({ length: 10 }, (_, i) => i + 1); // 1부터 10까지의 물고기 ID 생성
      const fishApiCalls = allFishIds.map((fishId) => {
        const preference = selectedFishes.includes(fishId) ? 1 : 0; // 선택된 물고기면 1, 아니면 0
        return surveyFishApi({ token, fishId, preference });
      });

      // 모든 물고기 설문 API 호출 실행
      await Promise.all(fishApiCalls);
      await surveyPatchApi({ token });
      Swal.fire("성공", "모든 설문이 제출되었습니다.", "success");
      setOpen(false);
    } catch (error) {
      console.error("설문 제출 실패:", error);
      Swal.fire("오류", "설문 제출 중 오류가 발생했습니다.", "error");
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logoutApi(token); // 로그아웃 API 호출
        localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
        sessionStorage.removeItem("user");
        resetStore(); // 스토어를 초기 상태로 재설정
        navigate("/introduction");
      } catch (error) {
        console.error("로그아웃 실패:", error);
        // 오류 처리 로직
      }
    }
  };

  const navigate = useNavigate();

  const logoutConfirm = () => {
    Swal.fire({
      title: "로그아웃",
      text: "정말로 로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  // 조건부 렌더링을 위한 함수(스케줄 등록하지않은 경우)
  const renderRecommendationComponent = () => {
    if (!schedule) {
      return (
        <>
          <LocationComponent />
          {recommendation?.method_id && // method_id가 있을 경우에만 렌더링
            (recommendation.method_id === 1 ? (
              <Method1 />
            ) : recommendation.method_id === 2 ? (
              <Method2 />
            ) : recommendation.method_id === 3 ? (
              <Method3 />
            ) : recommendation.method_id === 4 ? (
              <Method4 />
            ) : null)}
          {recommendation?.fish_id && // fish_id가 있을 경우에만 렌더링
            (recommendation.fish_id === 1 ? (
              <Fish1 />
            ) : recommendation.fish_id === 2 ? (
              <Fish2 />
            ) : recommendation.fish_id === 3 ? (
              <Fish3 />
            ) : recommendation.fish_id === 4 ? (
              <Fish4 />
            ) : recommendation.fish_id === 5 ? (
              <Fish5 />
            ) : recommendation.fish_id === 6 ? (
              <Fish6 />
            ) : recommendation.fish_id === 7 ? (
              <Fish7 />
            ) : recommendation.fish_id === 8 ? (
              <Fish8 />
            ) : recommendation.fish_id === 9 ? (
              <Fish9 />
            ) : recommendation.fish_id === 10 ? (
              <Fish10 />
            ) : null)}
        </>
      );
    }
    return null; // schedule이 존재하면 아무것도 렌더링하지 않음
  };

  // 조건부 렌더링을 위한 함수(스케줄 등록한 경우)
  const renderScheduleComponent = () => {
    if (schedule) {
      return (
        <>
        <PlanLocation />
          {schedule.area &&
            (schedule.area.id === 1 ? (
              <Point1 />
            ) : schedule.area.id === 2 ? (
              <Point2 />
            ) : schedule.area.id === 3 ? (
              <Point3 />
            ) : schedule.area.id === 4 ? (
              <Point4 />
            ) : null)}
          {schedule.method &&
            (schedule.method.id === 1 ? (
              <Method1 />
            ) : schedule.method.id === 2 ? (
              <Method2 />
            ) : schedule.method.id === 3 ? (
              <Method3 />
            ) : schedule.method.id === 4 ? (
              <Method4 />
            ) : null)}
        </>
      );
    }
    return null; // schedule이 존재하지 않으면 아무것도 렌더링하지 않음
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await loadData();
        if (!profile?.presurvey) {
          setOpen(true);
        }
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      } finally {
        setIsLoading(false); // 데이터 로딩이 완료되거나 오류가 발생하면 isLoading을 false로 설정
      }
    };

    fetchData();
  }, []);

  // 로딩 상태에 따른 조건부 렌더링
  if (isLoading) {
    return <EntryLoading />; // 로딩 중이면 EntryLoading 컴포넌트 표시
  }

  return (
    <div
      style={{
        height: "auto",
        padding: "1rem",
        paddingBottom: "2rem",
        backgroundColor: "#E3F2FD",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/favicon_io/android-chrome-192x192.png"
            alt="logo"
            style={{ width: "2rem", height: "2rem", margin: "0rem 0.3rem" }}
          />
          <span
            style={{
              fontWeight: 600,
              fontSize: "1.5rem",
              color: "#5D7A93",
            }}
          >
            FUBAO
          </span>
        </div>
        <div>
          <FontAwesomeIcon
            icon="user"
            color="#778a9b"
            style={{
              margin: "0.3rem 1rem 0.1rem 0.3rem",
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
            onClick={goToProfile}
          />
          <FontAwesomeIcon
            icon="right-from-bracket"
            color="#778a9b"
            style={{
              margin: "0.3rem 0.8rem 0.1rem 0.3rem",
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
            onClick={logoutConfirm}
          />
        </div>
      </div>
      <Etiquette />
      {/* <Time /> */}
      <Fubaoguide />
      <MenuComponent />

      {renderScheduleComponent()}
      {renderRecommendationComponent()}

      {/* <Foryou /> */}
      {/* <CameraOpen /> */}
      {/* <Recommendation /> */}

      {/* 설문모달 */}
      <React.Fragment>
        {open && !profile?.presurvey && 
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
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
            <Typography
              component="h2"
              id="modal-title"
              level="h3"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              푸바오의 초간단 질문
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", margin: "0rem 0rem 1rem" }}>
              🧐좋아하는 낚시 방법이 있나요?
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Checkbox
                label="찌낚시"
                value="1"
                checked={selectedMethods.includes(1)}
                onChange={handleMethodChange}
              />
              <Checkbox
                label="원투낚시"
                value="2"
                checked={selectedMethods.includes(2)}
                onChange={handleMethodChange}
              />
              <Checkbox
                label="루어낚시"
                value="3"
                checked={selectedMethods.includes(3)}
                onChange={handleMethodChange}
              />
              <Checkbox
                label="훌치기낚시"
                value="4"
                checked={selectedMethods.includes(4)}
                onChange={handleMethodChange}
              />
              <Checkbox label="없음" />
            </Box>
            <Typography sx={{ fontSize: "1.1rem", margin: "1rem 0rem" }}>
              🧐어떤 물고기를 잡고 싶으신가요?
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Checkbox
                label="참돔"
                value="1"
                checked={selectedFishes.includes(1)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="농어"
                value="2"
                checked={selectedFishes.includes(2)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="전갱이"
                value="3"
                checked={selectedFishes.includes(3)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="숭어"
                value="4"
                checked={selectedFishes.includes(4)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="고등어"
                value="5"
                checked={selectedFishes.includes(5)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="광어"
                value="6"
                checked={selectedFishes.includes(6)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="우럭"
                value="7"
                checked={selectedFishes.includes(7)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="감성돔"
                value="8"
                checked={selectedFishes.includes(8)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="돌돔"
                value="9"
                checked={selectedFishes.includes(9)}
                onChange={handleFishChange}
              />
              <Checkbox
                label="쥐노래미"
                value="10"
                checked={selectedFishes.includes(10)}
                onChange={handleFishChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <Button onClick={submitSurvey}>제출</Button>
            </Box>
          </Sheet>
        </Modal>
        }
      </React.Fragment>

      {/* 리뷰 모달 */}
      {/* <Review
        open={open}
        onClose={() => setOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleSubmit={handleSubmit}
      /> */}
    </div>
  );
}

export default HomePage;
