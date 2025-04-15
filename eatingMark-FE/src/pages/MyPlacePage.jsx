import { useMyPlaces } from "../hooks/useMyPlaces";
import { useDeletePlace } from "../hooks/useDeletePlace";
import PlaceCard from "../components/PlaceCard";

function MyPlacePage() {
  const { myPlaces, setMyPlaces } = useMyPlaces();
  const { handleDelete } = useDeletePlace(setMyPlaces);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">💖 찜한 맛집 목록</h2>

      {Array.isArray(myPlaces) && myPlaces.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {myPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">찜한 맛집이 없습니다.</p>
      )}
    </main>
  );
}

export default MyPlacePage;
