import { Skeleton } from "@/components/ui/skeleton";
import { TechnicalCard } from "./TechnicalCard";

const SkillSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <TechnicalCard key={i} className="bg-card">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-16 h-6" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </TechnicalCard>
      ))}
    </div>
  );
};

export default SkillSkeleton;
