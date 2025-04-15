import { likePlace } from "../api/placeApi";

function PlaceCard({ place, onDelete }) {
  const handleLike = async () => {
    try {
      await likePlace(place);
      alert("찜 완료!");
      localStorage.setItem("latestLiked", JSON.stringify(place));
    } catch (err) {
      console.error("🔥 서버 요청 실패:", err);
      alert("서버와의 연결에 문제가 생겼어요. 😢");
    }
  };

  const { title, description, image } = place;

  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <img
        src={`http://localhost:3000/${image?.src}`}
        alt={image?.alt || "맛집 이미지"}
        className="w-full h-[120px] object-cover rounded mb-2"
      />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>

      {onDelete ? (
        <button
          onClick={() => onDelete(place.id)}
          className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          🗑️ 삭제하기
        </button>
      ) : (
        <button
          onClick={handleLike}
          className="mt-2 px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
        >
          ❤️ 찜하기
        </button>
      )}
    </div>
  );
}

export default PlaceCard;
