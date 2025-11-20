import { Skeleton } from "@/components/ui/skeleton";
import { TechnicalCard } from "./TechnicalCard";

const ProjectSkeleton = () => {
  return (
    <TechnicalCard>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="border border-border bg-card p-6 md:p-8 mb-4"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <Skeleton className="h-8 w-1/2" />
            <div className="flex gap-3">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-5 h-5" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
      ))}
    </TechnicalCard>
  );
};

export default ProjectSkeleton;
