import CardStatsWrapper, { StatsCard } from "@/components/CardStatsWrapper";
import CreateFormBtn from "@/components/CreateFormBtn";
import FormCards from "@/components/FormCards";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container pt-4 px-4 md:px-8">
      <Suspense fallback={<StatsCard loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense fallback={[1, 2, 3, 4].map(el => <FormCardSkeleton key={el} />)}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

