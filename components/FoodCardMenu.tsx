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

import { Menu } from "lucide-react";

function FoodCardMenu() {
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default FoodCardMenu;
