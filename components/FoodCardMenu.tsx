"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import FoodCard from "./FoodCard";
import { serverClient } from "@/app/_trpc/serverClient";
import { trpc } from "../app/_trpc/client";

import { Menu } from "lucide-react";

function FoodCardMenu({
  foodCards,
}: {
  foodCards: Awaited<ReturnType<(typeof serverClient)["getFoodCards"]>>;
}) {
  const getFoodCards = trpc.getFoodCards.useQuery(undefined, {
    initialData: foodCards,
  });

  return (
    <Sheet>
      <SheetTrigger>
        <HoverCard>
          <HoverCardTrigger>
            <Menu />
          </HoverCardTrigger>
          <HoverCardContent>Foodcard menu</HoverCardContent>
        </HoverCard>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your foodCards</SheetTitle>
          <div className="flex flex-col gap-3">
            {getFoodCards.data && getFoodCards.data.length === 0 ? (
              <span className="text-center mt-5">
                No foodcards.. Maybe add one?
              </span>
            ) : (
              getFoodCards.data?.map((foodCard) => (
                <FoodCard
                  key={foodCard.id}
                  id={foodCard.id}
                  title={foodCard.title as string}
                  description={foodCard.description as string}
                  createdAt={foodCard.createdAt as string}
                />
              ))
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default FoodCardMenu;
