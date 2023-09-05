import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash2 } from "lucide-react";
import { trpc } from "../app/_trpc/client";

type FoodCardProps = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

function FoodCard({ id, title, description, createdAt }: FoodCardProps) {
  const getFoodCards = trpc.getFoodCards.useQuery();
  const deleteFoodCard = trpc.deleteFoodCard.useMutation({
    onSettled: () => {
      getFoodCards.refetch();
    },
  });

  async function handleDelete(id: number) {
    console.log(id);
    deleteFoodCard.mutateAsync(id);
  }
  return (
    <Card className="rounded bg-primary hover:cursor-pointer hover:scale-105 transition-all">
      <CardHeader>
        <CardTitle className="flex justify-between text-lg font-medium">
          <span>{title}</span>
          <Trash2
            onClick={() => handleDelete(id)}
            className="p-1 hover:scale-110 transition-all"
          />
        </CardTitle>
        <CardDescription className="flex flex-col text-xs text-primary-foreground">
          <span>{description}</span>
          <span>{createdAt}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default FoodCard;
