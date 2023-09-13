import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const foodCards = sqliteTable("foodCards", {
  id: integer("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  createdAt: text("date").default(sql`CURRENT_DATE`),
});

export const meals = sqliteTable("meals", {
  id: integer("id").primaryKey(),
  foodCardId: integer("foodCardId").references(() => foodCards.id),
  mealName: text("mealName"),
  description: text("description"),
  day: text("day"),
  createdAt: text("date").default(sql`CURRENT_DATE`),
});
