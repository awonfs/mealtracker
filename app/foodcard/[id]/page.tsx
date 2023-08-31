"use client";
import { trpc } from "../../_trpc/client";

function FoodCardPage({ params }: { params: { id: string } }) {
  const getFoodCard = trpc.getFoodCard.useQuery(parseInt(params.id));
  console.log(getFoodCard.data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      FoodCardPage {params.id}
      <span></span>
    </main>
  );
}

export default FoodCardPage;
