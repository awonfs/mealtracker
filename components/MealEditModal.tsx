"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import MealEditForm from "./MealEditForm";

function MealEditModal({
  foodCardId,
  mealId,
  mealName,
  description,
  day,
}: {
  foodCardId: number;
  mealId: number;
  mealName: string;
  description: string;
  day: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit size={16} />
      </DialogTrigger>
      <DialogContent>
        <MealEditForm
          foodCardId={foodCardId}
          mealId={mealId}
          mealName={mealName}
          description={description}
          day={day}
        />
      </DialogContent>
    </Dialog>
  );
}

export default MealEditModal;
