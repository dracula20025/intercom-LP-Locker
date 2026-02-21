import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const lockers = pgTable("lockers", {
  id: serial("id").primaryKey(),
  tokenAddress: text("token_address").notNull(),
  tokenName: text("token_name").notNull(),
  amount: text("amount").notNull(),
  unlockDate: timestamp("unlock_date").notNull(),
  ownerAddress: text("owner_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLockerSchema = createInsertSchema(lockers).omit({ 
  id: true, 
  createdAt: true 
});

export type Locker = typeof lockers.$inferSelect;
export type InsertLocker = z.infer<typeof insertLockerSchema>;
