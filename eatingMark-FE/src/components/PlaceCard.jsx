function PlaceCard({ place, onDelete }) {
  const handleLike = async () => {
    try {
      await likePlace(place);
      localStorage.setItem("latestLiked", JSON.stringify(place));
      alert("찜 완료!");
      window.location.href = "/my-places";
    } catch (error) {
      console.error("찜하기 실패:", error);
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <img
        src={`http://localhost:3000/${place?.image?.src}`}
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
