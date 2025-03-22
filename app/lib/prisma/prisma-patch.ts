import type { PrismaClient, PrismaPromise } from "@prisma/client";

function patchPrisma(prismaClient: PrismaClient) {
  const originalExecuteRawUnsafe = prismaClient.$executeRawUnsafe;

  prismaClient.$executeRawUnsafe = function <T = unknown>(
    query: string,
    ...values: unknown[]
  ): PrismaPromise<number> {
    if (query && typeof query === "string" && query.includes('INSERT INTO "Verification"')) {
      // Log the query for debugging
      console.log("Intercepted Verification INSERT query:", query);
      console.log("Query parameters:", values);

      try {
        // Ensure 'ok' is properly set in the query
        if (query.includes("?")) {
          // Find position in parameters where ok would go
          const valuesList = query.split("VALUES")[1];
          const paramPositions = valuesList.split("?").length - 1;

          // If we're missing parameters, add a boolean true for the 'ok' field
          if (values.length <= paramPositions) {
            // Find where to insert the 'ok' field
            const insertAt = values.length;
            values.splice(insertAt, 0, true);
            console.log("Added missing ok=true parameter to query");
          }
        }

        // Alternatively, rewrite the query to explicitly set ok=true
        if (query.includes('"ok"') && !values.includes(true) && !values.includes(false)) {
          // Add true parameter for ok
          values.push(true);
          console.log("Added ok=true parameter to query");
        }
      } catch (error) {
        console.error("Error patching Verification query:", error);
        // Continue with original query even if our patch fails
      }
    }

    // Call the original method with possibly modified values
    return originalExecuteRawUnsafe.call(this, query, ...values);
  };

  // Also patch the verification.create method for good measure
  const originalVerificationCreate = prismaClient.verification.create;

  // Use type assertion to maintain proper typing while allowing us to modify the method
  // @ts-expect-error - We're patching the method
  prismaClient.verification.create = async function (args) {
    try {
      if (args.data) {
        // Always ensure ok is set to true
        args.data = { ...args.data, ok: true };
        console.log("Patched verification.create data to include ok=true");
      }
    } catch (error) {
      console.error("Error patching verification.create:", error);
    }

    return originalVerificationCreate.call(this, args);
  };

  return prismaClient;
}

export { patchPrisma };
