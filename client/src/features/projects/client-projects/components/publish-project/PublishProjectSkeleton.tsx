import { Skeleton } from "@/components/shared/Skeleton";

export default function PublishProjectSkeleton() {
  return (
    <div className="grid grid-cols-[400px_1fr] gap-8">
      <div>
        <Skeleton height="30px" className="mb-3" />
        <Skeleton height="120px" />
      </div>
      <div>
        <Skeleton height="30px" className="mb-3" />
        <Skeleton height="120px" />
      </div>
    </div>
  );
}
