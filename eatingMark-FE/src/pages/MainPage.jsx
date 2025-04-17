import { usePlaces } from "../hooks/usePlaces";
import { useMyPlaces } from "../hooks/useMyPlaces"; // 추가
import { useLikePlace } from "../hooks/useLikePlace";
import PlaceCard from "../components/PlaceCard";
import SkeletonCard from "../components/SkeletonCard";
import { Helmet } from "react-helmet-async";

function MainPage() {
  const { places, loading, error, setPlaces } = usePlaces();
  const { myPlaces: likedPlaces } = useMyPlaces(); // 재사용
  const { handleLike } = useLikePlace(setPlaces);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Helmet>
        <title>전체 맛집 리스트 | eatingMark</title>
        <meta
          name="description"
          content="전국의 인기 맛집들을 확인하고, 찜할 수 있어요!"
        />
        <meta
          name="keywords"
          content="맛집, 찜하기, 리스트, 전국맛집, eatingMark"
        />
        <meta property="og:title" content="전체 맛집 리스트 | eatingMark" />
        <meta
          property="og:description"
          content="전국 맛집을 한눈에 보고 찜할 수 있는 서비스, eatingMark!"
        />
        <meta property="og:image" content="/eatingMark.png" />
        <meta property="og:url" content="https://eatingmark.vercel.app" />
      </Helmet>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {places.length > 0 ? (
            places.map((place) => {
              const isLiked = likedPlaces.some(
                (liked) => liked.id === place.id,
              );
              return (
                <PlaceCard
                  key={place.id}
                  place={place}
                  setPlaces={setPlaces}
                  isLiked={isLiked}
                  handleLike={handleLike}
                />
              );
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              불러올 맛집이 없습니다. 😢
            </p>
          )}
        </div>
      )}
    </main>
  );
}

export default MainPage;
