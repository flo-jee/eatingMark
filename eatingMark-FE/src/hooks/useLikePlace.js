import { likePlace, deletePlace, getMyPlaces } from "../api/placeApi";

export const useLikePlace = (setPlaces, isMyPage = false) => {
  const handleLike = async (place, isLiked) => {
    if (!place?.id) return;

    try {
      if (isLiked) {
        await deletePlace(place.id);
        alert("unLike!");
      } else {
        await likePlace(place);
        alert("Like!");
      }

      if (isMyPage) {
        const res = await getMyPlaces();
        setPlaces(res.data?.places || []);
      }
    } catch (error) {
      console.error("찜 처리 실패:", error);
      alert("목록 변경 중 오류가 발생했어요.");
    }
  };

  return { handleLike };
};
