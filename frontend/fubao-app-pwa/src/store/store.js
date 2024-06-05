import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { scheduleDoneApi, informationGetApi } from "./api";

const initialState = {
  profile: null,
  schedule: null,
  recommendation: null,
  information: null,
};

const store = (set) => ({
  ...initialState,
  loadData: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found.");
      return;
    }
    
    try {
        const informations = await informationGetApi(token);
        console.log(informations);

        const { recommendation, schedule, profile } = informations;

      // 현재 시간과 비교를 위해 시간 정보 초기화
      const currentTime = new Date();
      currentTime.setHours(0, 0, 0, 0);

      // 스케줄 배열이 비어있지 않고, 첫 번째 스케줄의 날짜가 현재 날짜보다 이전인지 확인
      let updatedSchedule = schedule ? schedule : null;
      if (updatedSchedule) {
        const scheduleDate = new Date(updatedSchedule.date);
        scheduleDate.setHours(0, 0, 0, 0);

        if (currentTime.getTime() > scheduleDate.getTime()) {
          // 현재 날짜가 스케줄 날짜보다 이후라면, 스케줄 완료 처리
          await scheduleDoneApi({ token, pk: updatedSchedule.id });
          updatedSchedule = null; // 스케줄 정보 삭제
          console.log(`Schedule completed and removed.`);
        }
      }

      set({ recommendation, schedule: updatedSchedule, profile, informations });
    } catch (error) {
      console.error("Loading data error:", error);
      // 에러 발생 시 상태를 초기화하거나 필요한 에러 처리를 수행
      set({ ...initialState });
    }
  },
  // loadSchedule: async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const schedule = await scheduleFetchApi(token); // 단일 일정 객체를 로드
  //       console.log(`일정 불러오기: ${JSON.stringify(schedule)}`);

  //       const currentTime = new Date();
  //       const scheduleDate = new Date(schedule.date);

  //       // 시간 정보를 제거하여 단순히 날짜만 비교
  //       currentTime.setHours(0, 0, 0, 0);
  //       scheduleDate.setHours(0, 0, 0, 0);

  //       if (schedule.id && currentTime.getTime() > scheduleDate.getTime()) {
  //         const pk = schedule.id;
  //         scheduleDoneApi({ token, pk });
  //         // 로컬 저장소에서 스케줄 정보 삭제
  //         set({ schedule: null });
  //         console.log(`일정 삭제됨`);
  //       } else {
  //         set({ schedule });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("schedule:", error);
  //     set({ schedule: null });
  //     console.log("일정 등록 안되어 있으면 에러뜸. 정상임 걱정 ㄴㄴ.");
  //   }
  // },
  clearSchedule: () => set({ schedule: null }),
  resetStore: () => set({ ...initialState }),
});

const useStore = create(
  persist(store, {
    name: "user", // persist 미들웨어에 대한 설정: 스토어의 이름
    // 'getStorage' 대신 'storage'를 사용하여 sessionStorage 또는 localStorage 선택 (예제에서는 sessionStorage를 사용)
    storage: createJSONStorage(() => sessionStorage),
  }),
  process.env.NODE_ENV !== "production" ? devtools(store) : store
);

export default useStore;
