import { useState } from "react";
import { useLikePlace } from "./useLikePlace"; // 찜하기/찜 해제 처리 훅

// 	하트 애니메이션 + 찜 토글
// 📌 개별 PlaceCard의 하트 애니메이션 및 좋아요 토글 기능을 관리하는 커스텀 훅
export function usePlaceCardAnimation({ place, liked, setLiked, setPlaces }) {
  const { handleLike } = useLikePlace(setPlaces); // 찜 상태를 서버에 반영하는 함수
  const [animateHeart, setAnimateHeart] = useState(false); // 하트 애니메이션 상태

  // 하트가 클릭될 때 잠시 확대되는 애니메이션을 실행하는 함수
  const triggerHeart = () => {
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 300); // 0.3초 후 애니메이션 종료
  };

  // 좋아요 상태를 토글하고, 서버에도 반영 + 애니메이션 실행
  const toggleLike = async (e) => {
    if (e) e.stopPropagation(); // 상위 onClick 이벤트 전파 방지
    await handleLike(place, liked); // 서버에 찜 or 찜 해제 요청
    setLiked((prev) => !prev); // 클라이언트 상태 업데이트
    triggerHeart(); // 하트 애니메이션 실행
  };

  // toggleLike: 클릭 시 좋아요 토글 / animateHeart: 애니메이션 여부 상태
  return { toggleLike, animateHeart };
}
