import { useEffect, useState } from "react"; // React의 useEffect, useState 훅을 불러옴
import { getAllPlaces } from "../api/placeApi"; // 전체 맛집 데이터를 가져오는 API 함수
import { sortPlacesByDistance } from "../utils/loc"; // 거리 기준으로 맛집을 정렬하는 함수 (사용자 위치 기준)

// 전체 맛집 데이터를 불러오고, 사용자 위치 기준으로 정렬하는 커스텀 훅
export function usePlaces() {
  const [places, setPlaces] = useState([]); // 전체 맛집 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태: 데이터를 요청 중일 때 true
  const [error, setError] = useState(null); // 에러 상태: 요청 실패 시 에러 메시지를 저장

  // 컴포넌트 마운트 시 한 번만 실행됨
  useEffect(() => {
    // 맛집 데이터를 서버에서 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        setError(null); // 에러 초기화

        const res = await getAllPlaces(); // 서버에서 전체 맛집 데이터 요청

        const rawPlaces = Array.isArray(res.data?.places) // 응답 데이터에서 places 배열만 추출
          ? res.data.places
          : [];

        // 위치 기반 정렬 시도
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            const sorted = sortPlacesByDistance(rawPlaces, latitude, longitude); // 사용자의 위치를 기준으로 거리 정렬

            setPlaces(sorted); // 정렬된 데이터를 상태에 저장
            console.log("📍 위치 기반 정렬 완료");
          },
          (geoError) => {
            console.warn("📍 위치를 불러오지 못했어요:", geoError); // 위치 정보 불러오기 실패 시 정렬 없이 원본 데이터를 사용
            setPlaces(rawPlaces);
          },
        );
      } catch (err) {
        console.error("📛 전체 맛집 데이터 불러오기 실패:", err); // API 요청 중 오류 발생 시 에러 상태 설정

        // HTTP 응답 오류 코드에 따라 분기 처리
        if (err.response) {
          const status = err.response.status;
          if (status === 404) {
            setError("💥요청하신 데이터를 찾을 수 없습니다.(404)💥");
          } else if (status === 500) {
            setError("💥서버에 문제가 발생했습니다.(500)💥");
          } else {
            setError(`💥문제가 발생했어요.(${status})💥`);
          }
        } else if (err.code === "ECONNABORTED") {
          setError("서버 응답 시간이 초과되었어요. ⏰");
        } else {
          setError("❌알 수 없는 에러가 발생했습니다.❌");
        }
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData(); // 데이터 요청 함수 호출
  }, []); // 마운트 시 한 번 실행됨

  return { places, loading, error, setPlaces }; // 커스텀 훅에서 사용하는 값들을 반환
}
