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
  getFoodCards: publicProcedure.query(async () => {
    return await db.select().from(foodCards).all();
  }),
  addFoodCard: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async (values) => {
      const { title, description } = values.input;
      await db.insert(foodCards).values({ title, description }).run();
      return true;
    }),
  getFoodCardById: publicProcedure.input(z.number()).query(async (id) => {
    return await db.select().from(foodCards).where(eq(foodCards.id, id.input));
  }),
  deleteFoodCard: publicProcedure.input(z.number()).mutation(async (id) => {
    //*  First, delete all associated meals with the given foodCardId
    await db.delete(meals).where(eq(meals.foodCardId, id.input)).run();
    //* Then delete the foodCard itself
    await db.delete(foodCards).where(eq(foodCards.id, id.input)).run();
    return true;
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
      const { foodCardId, mealName, description, day } = values.input;
      await db
        .insert(meals)
        .values({ foodCardId, mealName, description, day })
        .run();
      return true;
    }),
  getMealsByFoodCardId: publicProcedure.input(z.number()).query(async (id) => {
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
      await db
        .update(meals)
        .set({ mealName, description, day })
        .where(eq(meals.id, id))
        .run();
      return true;
    }),
});
export type AppRouter = typeof appRouter;
