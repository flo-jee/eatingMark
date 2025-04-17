import { useEffect, useState } from "react";
import { getMyPlaces } from "../api/placeApi"; // 찜한 맛집 목록을 불러오는 API 함수

// 나의 찜한 맛집 목록 가져오기
// API 호출 로직을 별도 함수로 분리하여 재사용성 향상
const fetchMyPlacesData = async () => {
  const res = await getMyPlaces();
  const data = Array.isArray(res.data?.places) ? res.data.places : [];
  return data.filter((p) => p && p.id); // 유효한 ID가 있는 데이터만 필터링
};

// 사용자의 찜한 맛집 목록을 불러오는 커스텀 훅
export function useMyPlaces() {
  const [myPlaces, setMyPlaces] = useState([]); // 찜한 맛집 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 (요청 중 여부)
  const [error, setError] = useState(null); // 에러 상태 (요청 실패 시 메시지 저장)

  // 서버로부터 데이터를 요청하고 상태를 업데이트하는 함수
  const refetch = async () => {
    try {
      setLoading(true); // 요청 시작 → 로딩 true
      setError(null); // 기존 에러 초기화
      const places = await fetchMyPlacesData(); // API 요청 및 데이터 필터링
      setMyPlaces(places); // 상태에 결과 저장
    } catch (err) {
      console.error("찜 목록 불러오기 실패:", err);
      setError("찜 목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false); // 요청 종료 → 로딩 false
    }
  };

  // 컴포넌트 마운트 시 최초 1회 데이터 요청
  useEffect(() => {
    refetch();
  }, []);

  // 상태 및 재요청 함수 반환
  return { myPlaces, setMyPlaces, loading, error, refetch };
}
