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
import { Edit, Trash2 } from "lucide-react";

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
        {getMeals.data?.map((meal) => (
          <TableRow key={meal.id}>
            <TableCell>{meal.mealName}</TableCell>
            <TableCell>{meal.description}</TableCell>
            <TableCell>{meal.day}</TableCell>
            <TableCell className="flex gap-2 justify-end w-full">
              <Trash2
                className="hover:scale-110 transition-all hover:cursor-pointer"
                size={18}
                strokeWidth={1.5}
              />
              <Edit
                className="hover:scale-110 transition-all hover:cursor-pointer"
                size={18}
                strokeWidth={1.5}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MealTable;
