import MealModal from "@/components/MealModal";
import MealTable from "@/components/MealTable";
import { serverClient } from "@/app/_trpc/serverClient";

async function FoodCardPage({ params }: { params: { id: string } }) {
  const meals = await serverClient.getMealsByFoodCardId(parseInt(params.id));
  const foodCard = await serverClient.getFoodCardById(parseInt(params.id));

  return (
    <main className="container flex min-h-screen flex-col items-center p-24 ">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">{foodCard[0].title}</h1>
        <MealModal foodCardId={params.id} />
      </div>
      <div className="w-full mt-8 p-3  border rounded">
        <MealTable meals={meals} />
      </div>
    </main>
  );
}

export default FoodCardPage;
