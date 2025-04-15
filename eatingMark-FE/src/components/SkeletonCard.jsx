import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard() {
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <Skeleton height={120} className="mb-2 rounded" />
      <Skeleton height={20} width={`60%`} className="mx-auto mb-2 rounded" />
      <Skeleton height={16} width={`80%`} className="mx-auto mb-1 rounded" />
      <Skeleton height={16} width={`70%`} className="mx-auto mb-4 rounded" />
      <Skeleton height={30} width={90} className="mx-auto rounded" />
    </div>
  );
}

export default SkeletonCard;
