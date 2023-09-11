import MealForm from "@/components/MealForm";
import { serverClient } from "@/app/_trpc/serverClient";

async function FoodCardPage({ params }: { params: { id: string } }) {
  const meals = await serverClient.getMealsByFoodCardId(parseInt(params.id));
  return (
    <main className="container flex min-h-screen flex-col items-center p-24 border">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">Your meals</h1>
        <MealForm foodCardId={params.id} />
      </div>
      <div>
        <h2 className="text-xl">Meals</h2>
        {JSON.stringify(meals)}
      </div>
    </main>
  );
}

export default FoodCardPage;
