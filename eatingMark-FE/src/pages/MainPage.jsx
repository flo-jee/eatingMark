import { useEffect, useState } from "react";
import { getAllPlaces } from "../api/placeApi";
import PlaceCard from "../components/PlaceCard";

function MainPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPlaces();
        setPlaces(res.data.places);
      } catch (err) {
        console.error("📛 전체 맛집 데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">🍽 전체 맛집 리스트</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {Array.isArray(places) && places.length > 0 ? (
          places.map((place) => <PlaceCard key={place.id} place={place} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            불러올 맛집이 없습니다.
          </p>
        )}
      </div>
    </main>
  );
}

export default MainPage;
