// React 훅 및 API 함수 불러오기
import { useEffect, useState } from "react";
import { getMyPlaces, deletePlace } from "../api/placeApi";
import PlaceCard from "../components/PlaceCard";

function MyPlacePage() {
  // 찜한 맛집 리스트를 저장할 상태
  const [myPlaces, setMyPlaces] = useState([]);

  // 컴포넌트 마운트 시 찜 목록 요청
  useEffect(() => {
    const fetchMyPlaces = async () => {
      try {
        // 서버에서 찜한 맛집 데이터 요청
        const res = await getMyPlaces();
        const data = res.data?.places || [];

        // 유효한 데이터만 필터링
        const validPlaces = data.filter((place) => place && place.id);

        // 데이터가 없을 경우 → 로컬 스토리지 fallback 처리
        if (validPlaces.length === 0) {
          const local = localStorage.getItem("latestLiked");
          if (local) {
            const parsed = JSON.parse(local);
            if (parsed?.id) {
              setMyPlaces([parsed]);
            }
          }
        } else {
          // 유효한 데이터가 있을 경우 상태에 저장
          setMyPlaces(validPlaces);
        }
      } catch (err) {
        // 에러 발생 시 → 사용자에게 알림, 로컬 fallback 처리
        console.error("🔥 서버 응답 실패:", err);
        alert("서버 연결에 문제가 발생했어요. 😢");

        const local = localStorage.getItem("latestLiked");
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed?.id) {
            setMyPlaces([parsed]);
          }
        }
      }
    };

    fetchMyPlaces();
  }, []);

  // 삭제 버튼 클릭 시 처리 함수
  const handleDelete = async (id) => {
    try {
      // 서버에 삭제 요청
      await deletePlace(id);
      alert("삭제 완료!");

      // 상태에서 해당 항목 제거
      setMyPlaces((prev) => {
        const updated = prev.filter((place) => place?.id !== id);

        // 로컬 스토리지에서도 해당 찜 항목 삭제
        const local = localStorage.getItem("latestLiked");
        if (local) {
          const latest = JSON.parse(local);
          if (latest?.id === id) {
            localStorage.removeItem("latestLiked");
          }
        }

        return updated;
      });
    } catch (err) {
      // 삭제 실패 시 알림 표시
      console.error("❌ 삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* 페이지 제목 */}
      <h2 className="text-2xl font-bold mb-4">💖 찜한 맛집 목록</h2>

      {/* 찜한 데이터가 있을 경우 카드로 렌더링 */}
      {Array.isArray(myPlaces) && myPlaces.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {myPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        // 찜한 맛집이 없을 경우 안내 문구
        <p className="text-center text-gray-500">찜한 맛집이 없습니다.</p>
      )}
    </main>
  );
}

export default MyPlacePage;
