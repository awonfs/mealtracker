import React from "react";
import FoodCardMenu from "./FoodCardMenu";

function Header() {
  return (
    <header className="container p-6 flex justify-around items-center ">
      <h1 className="text-xl">MealTracker</h1>
      <FoodCardMenu />
    </header>
  );
}

export default Header;
