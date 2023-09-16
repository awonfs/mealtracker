import { publicProcedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import { foodCards, meals } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
  // Get all food cards.
  getFoodCards: publicProcedure.query(async () => {
    return await db.select().from(foodCards).all();
  }),
  addFoodCard: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async (values) => {
      // Extract the fields from the input
      const { title, description } = values.input;
      // Insert the food card into the database
      await db.insert(foodCards).values({ title, description }).run();
      // Return true to indicate that the mutation was successful
      return true;
    }),
  getFoodCardById: publicProcedure.input(z.number()).query(async (id) => {
    return await db.select().from(foodCards).where(eq(foodCards.id, id.input));
  }),

  addMeal: publicProcedure
    .input(
      z.object({
        foodCardId: z.number(),
        mealName: z.string(),
        description: z.string(),
        day: z.string(),
      })
    )
    .mutation(async (values) => {
      // Destructure the input values.
      const { foodCardId, mealName, description, day } = values.input;

      // Insert the new meal into the database.
      await db
        .insert(meals)
        .values({ foodCardId, mealName, description, day })
        .run();

      // Return true to indicate success.
      return true;
    }),
  getMealsByFoodCardId: publicProcedure.input(z.number()).query(async (id) => {
    // return all meals for the given food card id
    return await db.select().from(meals).where(eq(meals.foodCardId, id.input));
  }),
  deleteMeal: publicProcedure.input(z.number()).mutation(async (id) => {
    await db.delete(meals).where(eq(meals.id, id.input)).run();
    return true;
  }),
  editMeal: publicProcedure
    .input(
      z.object({
        id: z.number(),
        mealName: z.string(),
        description: z.string(),
        day: z.string(),
      })
    )
    .mutation(async (values) => {
      const { id, mealName, description, day } = values.input;

      // Update the meal with the given id
      await db
        .update(meals)
        .set({ mealName, description, day })
        .where(eq(meals.id, id))
        .run();

      // Return true to indicate that the meal was updated
      return true;
    }),
});
export type AppRouter = typeof appRouter;
