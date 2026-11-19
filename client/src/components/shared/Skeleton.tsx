import { cn } from "@/lib/utils";

type SkeletonProps = {
  width?: string;
  height?: string;
  className?: string;
};

export function Skeleton({
  width = "100%",
  height = "16px",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-300",
        className,
      )}
      style={{ width, height }}
    />
  );
}
