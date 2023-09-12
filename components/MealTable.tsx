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

interface MealTableProps {
  meals: Meal[];
}

function MealTable({ meals }: MealTableProps) {
  const { foodCardId } = meals[0];
  const getMeals = trpc.getMealsByFoodCardId.useQuery(foodCardId!!, {
    initialData: meals,
  });
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
        {getMeals.data.map((meal) => (
          <TableRow key={meal.id}>
            <TableCell>{meal.mealName}</TableCell>
            <TableCell>{meal.description}</TableCell>
            <TableCell>{meal.day}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MealTable;
