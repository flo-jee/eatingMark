import { useMyPlaces } from "../hooks/useMyPlaces";
import { useDeletePlace } from "../hooks/useDeletePlace";
import { useLikePlace } from "../hooks/useLikePlace";
import PlaceCard from "../components/PlaceCard";
import SkeletonCard from "../components/SkeletonCard";
import { Helmet } from "react-helmet-async";

function MyPlacePage() {
  const { myPlaces, setMyPlaces, loading, error, refetch } = useMyPlaces();
  const { handleDelete } = useDeletePlace(setMyPlaces);
  const { handleLike } = useLikePlace(setMyPlaces, true);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Helmet>
        <title>찜한 맛집 목록 | eatingMark</title>
        <meta
          name="description"
          content="내가 찜한 맛집을 한눈에 모아보세요."
        />
        <meta property="og:title" content="찜한 맛집 목록 | eatingMark" />
        <meta
          property="og:description"
          content="내가 좋아하는 맛집을 모아서 확인해요!"
        />
      </Helmet>
      <div className="flex items-center justify-between mb-3">
        <img
          src="/likelist.png"
          alt="likelist"
          className="w-auto h-8 object-contain shrink-0"
        />
        <button
          onClick={refetch}
          className="w-10 h-10 rounded-full flex items-center justify-center              
          shadow-lg hover:brightness-110 hover:scale-105 
          transition-all duration-200 
          dark:shadow-[0_4px_12px_rgba(255,255,255,0.2)] 
          shadow-[0_4px_12px_rgba(0,0,0,0.25)]  ]"
          title="찜 목록 새로고침"
        >
          <img
            src="/Refresh.png"
            alt="Refresh button"
            className="w-auto h-6 object-contain shrink-0"
          />
        </button>
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : myPlaces.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {myPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onDelete={handleDelete} // 삭제 핸들러 전달
              isLiked={true} // 하트 상태 명시
              setPlaces={setMyPlaces}
              handleLike={handleLike}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">찜한 맛집이 없습니다.</p>
      )}
    </main>
  );
}

export default MyPlacePage;
