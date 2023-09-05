import React from "react";
import FoodCardMenu from "./FoodCardMenu";
import { serverClient } from "../app/_trpc/serverClient";
import Link from "next/link";

async function Header() {
  const foodCards = await serverClient.getFoodCards();
  return (
    <header className="container p-6 flex justify-around items-center ">
      <Link href={"/"}>
        <h1 className="text-xl">MealTracker</h1>
      </Link>
      <FoodCardMenu foodCards={foodCards} />
    </header>
  );
}

export default Header;
