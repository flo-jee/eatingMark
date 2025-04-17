import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard() {
  return (
    <div className="bg-pink-50 dark:bg-neutral-800 aspect-square shadow-md rounded-xl overflow-hidden animate-pulse">
      <Skeleton
        height="100%"
        borderRadius={0}
        baseColor="#fcd6e0"
        highlightColor="#ffeef3"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default SkeletonCard;
