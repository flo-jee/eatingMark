// axios 라이브러리를 불러옴
import axios from "axios";

// axiosInstance는 공통된 설정을 가진 Axios 인스턴스로,
// 모든 API 요청에 대해 baseURL, headers, timeout을 반복 설정하지 않아도 됨
const axiosInstance = axios.create({
  // API 기본 주소를 설정 (환경변수에서 가져오며, 없으면 localhost를 기본값으로 사용)
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",

  // 모든 요청에 대해 JSON 형식 사용을 명시
  headers: {
    "Content-Type": "application/json",
  },

  // 요청 제한 시간: 5000ms (5초)를 초과하면 오류 처리
  timeout: 5000,
});

// 이 인스턴스를 다른 컴포넌트나 API 함수에서 import 해서 사용
export default axiosInstance;
