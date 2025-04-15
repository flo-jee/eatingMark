// React의 훅들 불러오기
import { useEffect, useState } from "react";

// 전체 맛집 목록을 가져오는 API 함수
import { getAllPlaces } from "../api/placeApi";

// 맛집 정보를 렌더링할 카드 컴포넌트
import PlaceCard from "../components/PlaceCard";

function MainPage() {
  // 맛집 데이터를 저장할 상태
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 컴포넌트 마운트 시 한 번만 실행되는 비동기 데이터 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        // 서버에서 전체 맛집 데이터 요청
        const res = await getAllPlaces();
        // 응답에서 맛집 리스트만 추출하여 상태에 저장
        setPlaces(res.data.places);
      } catch (err) {
        // 에러 발생 시 콘솔에 메시지 출력
        console.error("📛 전체 맛집 데이터 불러오기 실패:", err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchData();
  }, []); // 빈 배열 → 최초 렌더링 시 한 번만 실행

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      {/* 페이지 제목 */}
      <h2 className="text-2xl font-bold mb-6">🍽 전체 맛집 리스트</h2>

      {/* 🔄 로딩 중일 때 표시 */}
      {loading ? (
        <p className="text-gray-500 text-center">맛집을 불러오는 중입니다...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* ✅ 맛집 데이터가 있을 경우 카드로 출력 */}
          {Array.isArray(places) && places.length > 0 ? (
            places.map((place) => <PlaceCard key={place.id} place={place} />)
          ) : (
            // ❗️데이터가 없을 경우 안내 문구 표시
            <p className="text-gray-500 col-span-full text-center">
              불러올 맛집이 없습니다. 😢
            </p>
          )}
        </div>
      )}
    </main>
  );
}

export default MainPage;
