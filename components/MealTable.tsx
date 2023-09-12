import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Meal } from "@/types/interfaces";

interface MealTableProps {
  meals: Meal[];
}

function MealTable({ meals }: MealTableProps) {
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
        {meals.map((meal) => (
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
