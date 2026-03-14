import { Skeleton } from "@/components/ui/skeleton";

export const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 px-8 md:grid-cols-2 xl:grid-cols-3">
      <div className="h-166.5 max-w-120">
        <Skeleton className="h-110 w-full rounded-2xl" />

        <div className="space-y-4 py-8">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="h-166.5 max-w-120">
        <Skeleton className="h-110 w-full rounded-2xl" />

        <div className="space-y-4 py-8">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="h-166.5 max-w-120">
        <Skeleton className="h-110 w-full rounded-2xl" />

        <div className="space-y-4 py-8">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
};
