import { useEffect, useState } from "react"; // React의 훅들 불러오기
import { getAllPlaces } from "../api/placeApi"; // 전체 맛집 목록을 가져오는 API 함수
import PlaceCard from "../components/PlaceCard"; // 맛집 정보를 렌더링할 카드 컴포넌트
import { sortPlacesByDistance } from "../utils/loc"; // 정렬 함수 불러오기

function MainPage() {
  const [myPlaces, setMyPlaces] = useState([]); // 맛집 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러처리

  // 컴포넌트 마운트 시 한 번만 실행되는 비동기 데이터 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        setError(null); // 에러 초기화

        const res = await getAllPlaces(); // 서버에서 전체 맛집 데이터 요청
        let rawPlaces = res.data.places; // 응답에서 맛집 리스트만 추출하여 상태에 저장

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const sorted = sortPlacesByDistance(rawPlaces, latitude, longitude);
            setMyPlaces(sorted);
            console.log("위치 받아옴");
          },
          (geoError) => {
            console.warn("📍 위치를 불러오지 못했어요:", geoError);
            setMyPlaces(rawPlaces); // 위치 불러오기 실패 시 정렬 없이 출력
          },
        );
      } catch (err) {
        console.error("📛 전체 맛집 데이터 불러오기 실패:", err); // 에러 발생 시 콘솔에 메시지 출력
        // 에러 상태 코드에 따른 메시지 설정
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
    fetchData();
  }, []); // 빈 배열 → 최초 렌더링 시 한 번만 실행

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      {/* 페이지 제목 */}
      <h2 className="text-2xl font-bold mb-6">🍽 전체 맛집 리스트</h2>
      {/* 에러 발생 시 */}
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : loading ? (
        // 로딩 중
        <p className="text-gray-500 text-center animate-pulse">
          맛집을 불러오는 중입니다... 🔄
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array.isArray(myPlaces) && myPlaces.length > 0 ? (
            myPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                setMyPlaces={setMyPlaces}
              />
            ))
          ) : (
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
