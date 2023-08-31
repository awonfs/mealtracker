import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { create } from "domain";
import { Trash2 } from "lucide-react";

type FoodCardProps = {
  title: string;
  description: string;
  createdAt: string;
};

function FoodCard({ title, description, createdAt }: FoodCardProps) {
  return (
    <Card className="h-[100px] rounded bg-primary">
      <CardHeader>
        <CardTitle className="flex justify-between text-lg">
          <span>{title}</span>
          <Trash2 />
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
