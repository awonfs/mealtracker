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
          <SheetDescription>
            Here you can see all your foodCards.
          </SheetDescription>
          <div>
            {getFoodCards.data?.map((foodCard) => {
              return (
                <div key={foodCard.id}>
                  <h1>{foodCard.title}</h1>
                  <p>{foodCard.description}</p>
                  <p>{foodCard.createdAt}</p>
                </div>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default FoodCardMenu;
