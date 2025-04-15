import { likePlace, getMyPlaces } from "../api/placeApi";

// 찜하기 로직만 따로 분리한 훅
export const useLikePlace = (setPlaces) => {
  const handleLike = async (place) => {
    try {
      console.log("📦 likePlace로 보낼 데이터:", place);
      await likePlace(place);
      alert("맛집을 찜했어요! 💖");
    } catch (error) {
      console.error("찜 저장 실패:", error);
      alert("찜하는 데 문제가 생겼어요. 😢");
    }
  };

  return { handleLike };
};
