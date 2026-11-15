import { Skeleton } from "@/components/shared/Skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="w-full border-t border-t-gray-200 py-6 px-6 hover:bg-gray-50">
      <div className="flex gap-5 mb-5">
        <div className="flex-1">
          <Skeleton className="mb-3" width="290px" height="15px" />
          <Skeleton className="mb-3" width="500px" height="15px" />
          <Skeleton width="250px" height="15px" />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton width="110px" height="15px" />
            <Skeleton width="110px" height="15px" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton width="110px" height="15px" />
            <Skeleton width="110px" height="15px" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton width="110px" height="15px" />
            <Skeleton width="110px" height="15px" />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Skeleton width="100px" height="20px" />
        <Skeleton width="100px" height="20px" />
      </div>
    </div>
  );
}
