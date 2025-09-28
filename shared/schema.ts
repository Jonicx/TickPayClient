import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, timestamp, integer, boolean, json, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Calculator configuration settings for admin management
export const calculatorSettings = pgTable("calculator_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vatPercentage: numeric("vat_percentage", { precision: 5, scale: 2 }).notNull().default("18.00"),
  commissionPercentage: numeric("commission_percentage", { precision: 5, scale: 2 }).notNull().default("4.90"),
  bookingFeeAmount: numeric("booking_fee_amount", { precision: 10, scale: 2 }).notNull().default("7.50"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCalculatorSettingsSchema = createInsertSchema(calculatorSettings).pick({
  vatPercentage: true,
  commissionPercentage: true,
  bookingFeeAmount: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCalculatorSettings = z.infer<typeof insertCalculatorSettingsSchema>;
export type CalculatorSettings = typeof calculatorSettings.$inferSelect;
