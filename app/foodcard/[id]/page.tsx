"use client";
import MealForm from "@/components/MealForm";
import { trpc } from "../../_trpc/client";

function FoodCardPage({ params }: { params: { id: string } }) {
  const getFoodCard = trpc.getFoodCard.useQuery(parseInt(params.id));

  return (
    <main className="container flex min-h-screen flex-col items-center justify-between p-24 border">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">Your meals</h1>
        <MealForm />
      </div>
    </main>
  );
}

export default FoodCardPage;
