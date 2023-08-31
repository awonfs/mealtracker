import React from "react";
import FoodCardMenu from "./FoodCardMenu";
import { serverClient } from "../app/_trpc/serverClient";

async function Header() {
  const foodCards = await serverClient.getFoodCards();
  return (
    <header className="container p-6 flex justify-around items-center ">
      <h1 className="text-xl">MealTracker</h1>
      <FoodCardMenu foodCards={foodCards} />
    </header>
  );
}

export default Header;
