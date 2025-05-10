import { Skeleton } from "@/components/ui/skeleton";

export default function InfoSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-4 w-40 bg-stone-800" />
      <Skeleton className="h-[125px] w-[250px] rounded-xl bg-stone-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-stone-800" />
        <Skeleton className="h-4 w-[200px] bg-stone-800" />
      </div>
    </div>
  );
}
