import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.lockers.list.path, async (req, res) => {
    const lockersList = await storage.getLockers();
    res.json(lockersList);
  });

  app.get(api.lockers.get.path, async (req, res) => {
    const locker = await storage.getLocker(Number(req.params.id));
    if (!locker) {
      return res.status(404).json({ message: 'Locker not found' });
    }
    res.json(locker);
  });

  app.post(api.lockers.create.path, async (req, res) => {
    try {
      // Coerce dates from strings if necessary
      const bodySchema = api.lockers.create.input.extend({
        unlockDate: z.coerce.date()
      });
      const input = bodySchema.parse(req.body);
      const locker = await storage.createLocker(input);
      res.status(201).json(locker);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  setTimeout(async () => {
    try {
      const existing = await storage.getLockers();
      if (existing.length === 0) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        await storage.createLocker({
          tokenAddress: "0x1234567890123456789012345678901234567890",
          tokenName: "Test Token",
          amount: "10000",
          unlockDate: tomorrow,
          ownerAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
        });
      }
    } catch (e) {
      console.error("Failed to seed database", e);
    }
  }, 1000);

  return httpServer;
}
