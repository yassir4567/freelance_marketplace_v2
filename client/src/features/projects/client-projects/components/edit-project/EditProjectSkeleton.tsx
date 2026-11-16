import { Skeleton } from "@/components/shared/Skeleton";

export default function EditProjectSkeleton() {
  return (
    <div>
      <div className="border border-gray-300 rounded-2xl p-6">
        <Skeleton width="120px" height="15px" className="mb-3" />
        <Skeleton height="20px" className="mb-5" />

        <Skeleton width="120px" height="15px" className="mb-3" />
        <Skeleton height="100px" />
      </div>
      <div className="border border-gray-300 rounded-2xl p-6 mt-5">
        <Skeleton width="120px" height="15px" className="mb-3" />
        <Skeleton height="20px" className="mb-5" />

        <Skeleton width="120px" height="15px" className="mb-3" />
        <Skeleton height="15px" />
      </div>

      <div className="grid grid-cols-3 gap-3 border border-gray-300 rounded-2xl p-6 mt-5">
        <div>
          <Skeleton width="130px" height="15px" className="mb-3" />
          <Skeleton width="200px" height="15px" />
        </div>
        <div>
          <Skeleton width="130px" height="15px" className="mb-3" />
          <Skeleton width="200px" height="15px" />
        </div>
        <div>
          <Skeleton width="130px" height="15px" className="mb-3" />
          <Skeleton width="200px" height="15px" />
        </div>
      </div>
    </div>
  );
}
