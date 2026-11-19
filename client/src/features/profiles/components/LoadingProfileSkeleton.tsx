import { Skeleton } from "@/components/shared/Skeleton";

export default function LoadingProfileSkeleton() {
  return (
    <div className="grid grid-cols-[300px_1fr] gap-4">
      <div className="flex flex-col items-center border border-gray-300 rounded-2xl py-6 px-1">
        <Skeleton width="140px" height="140px" className="rounded-[50%] mb-3" />
        <Skeleton width="160px" height="10px" className="mb-3" />
        <Skeleton width="120px" height="10px" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="border border-gray-300 px-3 py-5 flex items-center justify-around rounded-2xl">
          <div>
            <Skeleton width="120px" height="10px" className="mb-3" />
            <Skeleton width="120px" height="10px" />
          </div>
          <div>
            <Skeleton width="120px" height="10px" className="mb-3" />
            <Skeleton width="120px" height="10px" />
          </div>
        </div>

        <div className="border border-gray-300 px-3 py-5 flex items-center justify-around rounded-2xl">
          <div>
            <Skeleton width="120px" height="10px" className="mb-3" />
            <Skeleton width="120px" height="10px" />
          </div>
          <div>
            <Skeleton width="120px" height="10px" className="mb-3" />
            <Skeleton width="120px" height="10px" />
          </div>
        </div>
      </div>
    </div>
  );
}
