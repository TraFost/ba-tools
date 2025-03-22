import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

function createPrismaClient() {
  if (process.env.NODE_ENV === "production") {
    // Create Turso client with more robust options
    const tursoClient = createClient({
      url: process.env.TURSO_DATABASE_URL || "",
      authToken: process.env.TURSO_AUTH_TOKEN || "",
      // Add timeouts and better error handling
      fetch: (url, options) => {
        const timeout = 30000; // 30 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        return fetch(url, {
          ...options,
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));
      },
    });

    // Use Turso in production with the adapter
    return new PrismaClient({
      // @ts-ignore - The adapter option is available when using preview features
      adapter: new PrismaLibSQL(tursoClient),
    });
  }

  // Use local SQLite in development
  return new PrismaClient();
}

// Declare a type for global with our custom property
declare global {
  var prismaGlobal: ReturnType<typeof createPrismaClient> | undefined;
}

// Use the global variable without shadowing globalThis
export const prisma = global.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}
