import { useEffect, useState } from "react"; // React의 useEffect, useState 훅을 불러옴
import { getMyPlaces } from "../api/placeApi"; // 찜한 맛집 목록을 불러오는 API 함수

// 사용자의 찜한 맛집 목록을 불러오는 커스텀 훅
export function useMyPlaces() {
  const [myPlaces, setMyPlaces] = useState([]); // 찜한 맛집 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태: 데이터를 요청 중일 때 true
  const [error, setError] = useState(null); // 에러 상태: 요청 실패 시 사용자에게 메시지를 전달하기 위함

  // 컴포넌트가 마운트될 때 한 번만 실행됨
  useEffect(() => {
    // 데이터를 서버에서 가져오는 비동기 함수 정의
    const fetchMyPlaces = async () => {
      try {
        setLoading(true); // 요청 시작 시 로딩 상태 활성화
        setError(null); // 이전 에러 초기화

        const res = await getMyPlaces(); // 서버로부터 찜한 맛집 목록을 요청

        const data = Array.isArray(res.data?.places) ? res.data.places : []; // 응답 데이터 중 places 배열만 추출 (없을 경우 빈 배열)
        const valid = data.filter((p) => p && p.id); // 유효한 place 객체(id가 존재하는 것)만 필터링

        setMyPlaces(valid); // 상태에 저장
      } catch (err) {
        console.error("찜 목록 불러오기 실패:", err); // 에러 발생 시 콘솔에 출력 및 에러 메시지 설정
        setError("찜 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 요청 완료되면 로딩 상태 비활성화
      }
    };

    fetchMyPlaces(); // 정의한 함수 호출
  }, []); // [] → 마운트 시 한 번만 실행됨

  return { myPlaces, setMyPlaces, loading, error }; // 호출 컴포넌트에서 사용할 수 있도록 상태와 함수 반환
}
