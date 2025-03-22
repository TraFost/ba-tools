import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { tursoClient } from "lib/turso/turso-client";

const createPrismaClient = () => {
  if (process.env.NODE_ENV === "production") {
    // Use Turso in production
    return new PrismaClient({
      // @ts-ignore - The adapter option is available when using preview features
      adapter: new PrismaLibSQL(tursoClient),
    });
  }

  // Use local SQLite in development - no early return in the if block
  return new PrismaClient();
};

// Declare a type for global with our custom property
declare global {
  var prismaGlobal: ReturnType<typeof createPrismaClient> | undefined;
}

// Use the global variable without shadowing globalThis
export const prisma = global.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}
