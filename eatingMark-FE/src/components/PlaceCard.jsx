// placeApi에서 찜하기 API 함수 불러옴
import { likePlace, getMyPlaces } from "../api/placeApi";

// 개별 맛집 정보를 카드 형태로 렌더링하는 컴포넌트
// props: place (맛집 정보 객체), onDelete (삭제 함수 - 선택적)
function PlaceCard({ place, onDelete, setMyPlaces }) {
  // ❤️ 찜 버튼 클릭 시 실행되는 함수
  const handleLike = async (place) => {
    try {
      console.log("📦 likePlace로 보낼 데이터:", place); // 🔍 확인 포인트 ①

      await likePlace(place); // 서버로 place 객체 전송

      alert("맛집을 찜했어요! 💖");

      const res = await getMyPlaces();
      console.log("📥 getMyPlaces 응답:", res.data); // 🔍 확인 포인트 ②

      setMyPlaces(res.data?.places || []);
    } catch (error) {
      console.error("찜 저장 실패:", error); // 🔍 확인 포인트 ③
      alert("찜하는 데 문제가 생겼어요. 😢");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded text-center">
      {/* 맛집 이미지 출력 */}
      <img
        src={`http://localhost:3000/${place?.image?.src}`}
        alt={place?.image?.alt || "맛집 이미지"}
        className="w-full h-[120px] object-cover rounded mb-2"
      />

      {/* 맛집 타이틀 */}
      <h3 className="font-semibold">{place.title}</h3>

      {/* 맛집 설명 */}
      <p className="text-sm text-gray-600 mt-1">{place.description}</p>

      {/* onDelete props가 있으면 삭제 버튼, 없으면 찜하기 버튼 렌더링 */}
      {onDelete ? (
        // 🗑️ 삭제 버튼: 부모 컴포넌트에서 삭제 로직 전달받음
        <button
          onClick={() => onDelete(place.id)}
          className="mt-2 px-3 py-1 bg-red-400 text-white text-sm rounded hover:bg-red-500 transition"
        >
          🗑️ 삭제하기
        </button>
      ) : (
        // ❤️ 찜하기 버튼
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
