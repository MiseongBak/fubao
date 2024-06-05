import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "d87dcb2e8632067ec4296137786326d9",
    libraries: ["clusterer", "drawing", "services"],
  })
}