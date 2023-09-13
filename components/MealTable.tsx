"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Meal } from "@/types/interfaces";
import { trpc } from "../app/_trpc/client";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MealEditModal from "./MealEditModal";
interface MealTableProps {
  meals: Meal[];
}

function MealTable({ meals }: MealTableProps) {
  const toast = useToast();
  const { foodCardId } = meals[0];
  const getMeals = trpc.getMealsByFoodCardId.useQuery(foodCardId!!, {
    initialData: meals,
  });
  const deleteMeal = trpc.deleteMeal.useMutation({
    onSettled: () => {
      getMeals.refetch();
    },
  });

  async function handleDelete(id: number, mealName: string) {
    await deleteMeal.mutateAsync(id);
    toast.toast({
      variant: "destructive",
      title: `${mealName} deleted`,
      description: "Your meal has been deleted successfully!",
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Day</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {getMeals.data?.map((meal) => (
          <TableRow key={meal.id}>
            <TableCell>{meal.mealName}</TableCell>
            <TableCell>{meal.description}</TableCell>
            <TableCell>{meal.day}</TableCell>
            <TableCell className="flex gap-2 justify-end items-center w-full">
              <Trash2
                className="hover:scale-110 transition-all hover:cursor-pointer"
                size={18}
                strokeWidth={1.5}
                onClick={() => handleDelete(meal.id, meal.mealName!!)}
              />
              <div className="hover:scale-110 transition-all hover:cursor-pointer">
                <MealEditModal
                  foodCardId={foodCardId as number}
                  mealId={meal.id}
                  mealName={meal.mealName!!}
                  description={meal.description!!}
                  day={meal.day!!}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MealTable;
