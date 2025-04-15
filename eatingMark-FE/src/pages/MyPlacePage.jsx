import { useEffect, useState } from "react";
import { getMyPlaces } from "../api/placeApi";
import PlaceCard from "../components/PlaceCard";

function MyPlacePage() {
  const [myPlaces, setMyPlaces] = useState([]);

  // 찜한 맛집 불러오기
  useEffect(() => {
    const fetchMyPlaces = async () => {
      try {
        const res = await getMyPlaces();
        const data = res.data.places || [];

        if (data.length === 0) {
          const local = localStorage.getItem("latestLiked");
          if (local) {
            setMyPlaces([JSON.parse(local)]);
          }
        } else {
          setMyPlaces(data);
        }
      } catch (err) {
        console.error("찜 목록 불러오기 실패:", err);

        // 서버 실패 시 로컬스토리지 사용
        const local = localStorage.getItem("latestLiked");
        if (local) {
          setMyPlaces([JSON.parse(local)]);
        }
      }
    };

    fetchMyPlaces();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">💖 찜한 맛집 목록</h2>
      {myPlaces.length === 0 ? (
        <p className="text-center text-gray-500">찜한 맛집이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {myPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </main>
  );
}

export default MyPlacePage;
