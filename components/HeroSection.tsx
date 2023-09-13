import { Beef, Soup, UtensilsCrossed } from "lucide-react";
import FoodCardForm from "./FoodCardForm";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="flex flex-col w-3/4 md:flex-row justify-center gap-4 md:gap-8 border p-4 md:p-6 md:w-3/5">
      <div className="flex-1 md:flex-2 mb-4 md:mb-0">
        <FoodCardForm />
      </div>
      <Separator className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-center md:text-left">
          Create a food card and start tracking{" "}
          <br className="hidden md:block" /> your weekly meals
        </h1>

        <Separator className="mt-6" />

        <div className="flex gap-3 justify-center mt-6">
          <Beef />
          <Soup />
          <UtensilsCrossed />
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-3">
          <span>
            Checkout the github repository{" "}
            <Link
              className="text-primary hover:underline"
              href="https://github.com/awonfs/trpc-drizzle"
            >
              here
            </Link>
          </span>
          <span className="text-center md:text-left">
            This project is for personal use and also{" "}
            <br className="hidden md:block" /> a way to learn Next.js with TRPC
            and Drizzle
          </span>
          <span className="text-center md:text-left">
            <span className="text-center md:text-left">
              This site is built with{" "}
              <span className="text-purple-500">Next.js </span>,{" "}
              <span className="text-cyan-500">TailwindCSS</span>,{" "}
              <span className="text-primary">ShadcnUI</span>,{" "}
              <span className="text-blue-500">TRPC</span>,{" "}
              <span className="text-green-500">Drizzle</span> and{" "}
              <span className="text-gray-500">sqlite</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
