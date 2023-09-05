import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash2 } from "lucide-react";
import { trpc } from "../app/_trpc/client";
import Link from "next/link";
import { Button } from "./ui/button";

type FoodCardProps = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

function FoodCard({ id, title, description, createdAt }: FoodCardProps) {
  function formatDate(dateString: string) {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  }

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
        <CardDescription className="flex flex-col text-xs text-primary-foreground gap-1">
          <span>{description}</span>
          <span>{formatDate(createdAt)}</span>
          <Button asChild variant={"secondary"} className="rounded w-1/2">
            <Link href={`/foodcard/${id}`}>Open</Link>
          </Button>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default FoodCard;
