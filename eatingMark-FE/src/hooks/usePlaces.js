import { useEffect, useState } from "react";
import { getAllPlaces } from "../api/placeApi"; // 전체 맛집 데이터를 가져오는 API
import { sortPlacesByDistance } from "../utils/loc"; // 위도/경도를 기준으로 거리 정렬 함수

// 서버에서 전체 맛집 데이터를 받아오는 함수
const fetchPlacesData = async () => {
  const res = await getAllPlaces();
  return Array.isArray(res.data?.places) ? res.data.places : [];
};

// 전체 맛집 목록을 불러오고, 위치 기반으로 정렬하는 커스텀 훅
export function usePlaces() {
  const [places, setPlaces] = useState([]); // 전체 맛집 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태: 데이터 요청 중 여부
  const [error, setError] = useState(null); // 에러 상태: 요청 실패 시 메시지 저장

  // 위치 기반 정렬을 포함한 전체 맛집 데이터 가져오기 (재요청 가능)
  const refetch = async () => {
    try {
      setLoading(true); // 로딩 시작
      setError(null); // 에러 초기화

      const rawPlaces = await fetchPlacesData(); // 서버로부터 데이터 받아오기

      // 사용자 위치 정보 기반으로 거리 정렬 수행
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const sorted = sortPlacesByDistance(rawPlaces, latitude, longitude); // 거리순 정렬
          setPlaces(sorted); // 정렬된 리스트 저장
          console.log("📍 위치 기반 정렬 완료");
        },
        (geoError) => {
          // 위치 권한 거부 또는 실패 시: 정렬 없이 원본 데이터를 사용
          console.warn("위치 정보를 가져오지 못함:", geoError);
          setPlaces(rawPlaces);
        },
      );
    } catch (err) {
      console.error("전체 맛집 데이터 요청 실패:", err);

      // 서버 응답에 따른 에러 메시지 분기 처리
      if (err.response) {
        const status = err.response.status;
        if (status === 404) {
          setError("요청하신 데이터를 찾을 수 없습니다. (404)");
        } else if (status === 500) {
          setError("서버에 문제가 발생했습니다. (500)");
        } else {
          setError(`문제가 발생했습니다. (${status})`);
        }
      }
      // 기타 네트워크 에러 처리
      else if (err.code === "ECONNABORTED") {
        setError("서버 응답 시간이 초과되었습니다.");
      }
      // 알 수 없는 오류 처리
      else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트가 마운트되면 최초 1회 데이터 요청 실행
  useEffect(() => {
    refetch();
  }, []);

  // 필요한 상태와 refetch 함수를 외부로 반환
  return { places, setPlaces, loading, error, refetch };
}
