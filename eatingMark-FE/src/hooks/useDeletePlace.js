import { deletePlace } from "../api/placeApi"; // 찜한 맛집을 삭제하는 API 함수 import

// 찜 삭제 로직을 커스텀 훅으로 정의
// 인자로 상태 업데이트 함수인 setPlaces를 전달받음
export function useDeletePlace(setPlaces) {
  // 실제로 삭제를 실행하는 함수
  const handleDelete = async (id) => {
    try {
      // 1. 서버에 삭제 요청 보내기
      await deletePlace(id);
      // 2. 사용자에게 성공 알림
      alert("삭제 완료!");
      // 3. 클라이언트 상태에서도 해당 맛집 제거
      setPlaces((prev) => {
        const updated = prev.filter((place) => place?.id !== id); // id가 일치하지 않는 항목만 남긴 새로운 배열 반환
        const local = localStorage.getItem("latestLiked"); // 💡 이전 코드에 있던 로컬 스토리지 삭제 로직 (필요 없으면 삭제 가능)
        if (local) {
          const latest = JSON.parse(local);
          // 삭제한 id가 로컬에 저장된 마지막 찜과 같다면, 로컬도 삭제
          if (latest?.id === id) {
            localStorage.removeItem("latestLiked");
          }
        }
        return updated;
      });
    } catch (err) {
      console.error("❌ 삭제 실패:", err); // 삭제 실패 시 콘솔 로그와 사용자 알림 표시
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return { handleDelete }; // 삭제 함수(handleDelete)를 반환하여 컴포넌트에서 사용할 수 있도록 함
}
