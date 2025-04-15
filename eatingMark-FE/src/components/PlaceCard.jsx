import { useLikePlace } from "../hooks/useLikePlace";

function PlaceCard({ place, onDelete, setPlaces }) {
  const { handleLike } = useLikePlace(setPlaces);

  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${place?.image?.src}`}
        alt={place?.image?.alt || "맛집 이미지"}
        className="w-full h-[120px] object-cover rounded mb-2"
      />
      <h3 className="font-semibold">{place.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{place.description}</p>

      {onDelete ? (
        <button
          onClick={() => onDelete(place.id)}
          className="mt-2 px-3 py-1 bg-red-400 text-white text-sm rounded hover:bg-red-500 transition"
        >
          🗑️ 삭제하기
        </button>
      ) : (
        <button
          onClick={() => handleLike(place)}
          className="mt-2 px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
        >
          ❤️ 찜하기
        </button>
      )}
    </div>
  );
}

export default PlaceCard;
