import { db } from "./db";
import { lockers, type Locker, type InsertLocker } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getLockers(): Promise<Locker[]>;
  getLocker(id: number): Promise<Locker | undefined>;
  createLocker(locker: InsertLocker): Promise<Locker>;
}

export class DatabaseStorage implements IStorage {
  async getLockers(): Promise<Locker[]> {
    return await db.select().from(lockers);
  }

  async getLocker(id: number): Promise<Locker | undefined> {
    const [locker] = await db.select().from(lockers).where(eq(lockers.id, id));
    return locker;
  }

  async createLocker(insertLocker: InsertLocker): Promise<Locker> {
    const [locker] = await db.insert(lockers).values(insertLocker).returning();
    return locker;
  }
}

export const storage = new DatabaseStorage();
