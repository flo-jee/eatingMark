import { useRef, useState } from "react";

function PlaceCard({ place, setPlaces, isLiked = false, handleLike }) {
  const [showDetail, setShowDetail] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [liked, setLiked] = useState(isLiked);
  const [animateHeart, setAnimateHeart] = useState(false);
  const tapTimeout = useRef(null);

  const triggerHeartAnimation = () => {
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 300);
  };

  const toggleLike = async (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    try {
      await handleLike(place, liked);
      setLiked((prev) => !prev);
      triggerHeartAnimation();
    } catch (err) {
      console.error("찜 상태 반영 실패:", err);
      alert("찜 상태를 변경할 수 없습니다.");
    }
  };

  return (
    <div
      className="relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden aspect-square shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.03] cursor-pointer"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${place?.image?.src}`}
        alt={place?.image?.alt || "맛집 이미지"}
        className="w-full h-full object-cover"
      />

      <button
        onClick={toggleLike}
        className={`absolute top-2 right-2 w-8 h-8 z-10 transition-transform duration-300 ease-out ${
          animateHeart ? "scale-150 animate-ping" : "scale-100"
        }`}
      >
        <img
          src={liked ? "/eatingMark_like.png" : "/eatingMark_unlike.png"}
          alt={liked ? "찜함" : "찜하지 않음"}
          className="w-full h-full object-contain"
        />
      </button>

      {showDetail && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-sm p-4 text-white backdrop-blur-sm transition-all duration-300 animate-fade-in">
          <h3 className="font-semibold mb-1 text-base animate-fade-in">
            {place.title}
          </h3>
          <p className="text-xs text-gray-200 line-clamp-2 animate-fade-in">
            {place.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default PlaceCard;
