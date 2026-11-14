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
      className={`animate-pulse rounded-md bg-gray-100 dark:bg-gray-200 ${className}`}
      style={{ width, height }}
    />
  );
}
