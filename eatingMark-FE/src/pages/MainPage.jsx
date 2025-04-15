import { usePlaces } from "../hooks/usePlaces";
import PlaceCard from "../components/PlaceCard";
import SkeletonCard from "../components/SkeletonCard";

function MainPage() {
  const { places, loading, error, setPlaces } = usePlaces();

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">🍽 전체 맛집 리스트</h2>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {places.length > 0 ? (
            places.map((place) => (
              <PlaceCard key={place.id} place={place} setPlaces={setPlaces} />
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
