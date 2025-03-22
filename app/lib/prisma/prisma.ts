import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
// app/lib/prisma/prisma.ts
import { PrismaClient } from "@prisma/client";

function createPrismaClient() {
  if (process.env.NODE_ENV === "production") {
    // Create Turso client
    const tursoClient = createClient({
      url: process.env.TURSO_DATABASE_URL || "",
      authToken: process.env.TURSO_AUTH_TOKEN || "",
    });

    // Create Prisma client with Turso adapter
    const client = new PrismaClient({
      // @ts-ignore - The adapter option is available when using preview features
      adapter: new PrismaLibSQL(tursoClient),
    });

    // Override the $transaction method for Turso compatibility
    const originalTransaction = client.$transaction;
    client.$transaction = async function (arg) {
      if (typeof arg === "function") {
        // For callback-style transactions, just execute the callback
        return await arg(client);
      }

      return await originalTransaction.call(this, arg);
    };

    return client;
  }

  // Use local SQLite in development
  return new PrismaClient();
}

// Use global to maintain a singleton instance
declare global {
  var prismaGlobal: ReturnType<typeof createPrismaClient> | undefined;
}

export const prisma = global.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}
