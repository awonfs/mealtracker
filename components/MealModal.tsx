"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import MealForm from "./MealForm";

function MealModal({ foodCardId }: { foodCardId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded flex items-center gap-1">
          Add a meal <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <MealForm foodCardId={foodCardId} />
      </DialogContent>
    </Dialog>
  );
}

export default MealModal;
