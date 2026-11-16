import { Skeleton } from "@/components/shared/Skeleton";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="mt-5">
      <Skeleton width="350px" height="15px" className="mb-5" />
      <div className="grid grid-cols-2 gap-3 h-12">
        <Skeleton height="100%" />
        <Skeleton height="100%" />
      </div>

      <div className="mt-10">
        <Skeleton width="150px" height="10px" />
        <hr className="bg-gray-900 mt-5 mb-12" />

        <div>
          <div>
            <Skeleton width="120px" height="10px" className="mb-4" />
            <Skeleton height="100px" />
          </div>

          <hr className="bg-gray-900 my-9" />

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Skeleton width="100px" height="10px" className="mb-1.5" />
              <Skeleton width="120px" height="10px" />
            </div>
            <div>
              <Skeleton width="100px" height="10px" className="mb-1.5" />
              <Skeleton width="120px" height="10px" />
            </div>
            <div>
              <Skeleton width="100px" height="10px" className="mb-1.5" />
              <Skeleton width="120px" height="10px" />
            </div>
          </div>
        </div>

        <hr className="bg-gray-900 my-9" />

        <div>
          <Skeleton width="230px" height="10px" className="mb-3" />
          <Skeleton width="250px" height="10px" />
        </div>

        <hr className="bg-gray-900 my-9" />

        <div>
          <Skeleton width="300px" height="10px" className="mb-2" />
          <hr className="bg-gray-900 my-9" />
          <div>
            <Skeleton width="100px" height="10px" className="mb-2" />
            <div className="flex gap-3">
              <Skeleton width="100px" height="15px" />
              <Skeleton width="100px" height="15px" />
              <Skeleton width="100px" height="15px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
