import { publicProcedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import { todos, foodCards, meals } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos).all();
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (options) => {
    await db.insert(todos).values({ content: options.input, done: 0 }).run();
    return true;
  }),
  deleteTodo: publicProcedure.input(z.number()).mutation(async (options) => {
    await db.delete(todos).where(eq(todos.id, options.input)).run();
    return true;
  }),
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
  getFoodCard: publicProcedure.input(z.number()).query(async (id) => {
    return await db
      .select({
        title: foodCards.title,
        description: foodCards.description,
      })
      .from(foodCards)
      .where(eq(foodCards.id, id.input))
      .run();
  }),
  deleteFoodCard: publicProcedure.input(z.number()).mutation(async (id) => {
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
    return await db
      .select({
        mealName: meals.mealName,
        description: meals.description,
        day: meals.day,
      })
      .from(meals)
      .where(eq(meals.foodCardId, id.input))
      .run();
  }),
});
export type AppRouter = typeof appRouter;
