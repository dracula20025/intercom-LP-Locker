import { z } from 'zod';
import { insertLockerSchema, lockers } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  lockers: {
    list: {
      method: 'GET' as const,
      path: '/api/lockers' as const,
      responses: {
        200: z.array(z.custom<typeof lockers.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/lockers' as const,
      input: insertLockerSchema,
      responses: {
        201: z.custom<typeof lockers.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/lockers/:id' as const,
      responses: {
        200: z.custom<typeof lockers.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type LockerInput = z.infer<typeof api.lockers.create.input>;
export type LockerResponse = z.infer<typeof api.lockers.create.responses[201]>;
