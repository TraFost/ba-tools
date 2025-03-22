import type { PrismaClient } from "@prisma/client";

// Define a type that includes the potential 'ok' field
interface VerificationDataWithOk {
  [key: string]: unknown;
  ok?: boolean;
}

function patchPrisma(prismaClient: PrismaClient) {
  const originalVerificationCreate = prismaClient.verification.create;

  // Replace the verification.create method
  // @ts-expect-error - We're patching the method to handle the 'ok' field
  prismaClient.verification.create = async (args) => {
    // If there's an 'ok' field coming from better-auth, remove it
    if (args.data) {
      // Use a more specific type instead of any
      const { ok, ...cleanData } = args.data as VerificationDataWithOk;
      args.data = cleanData as typeof args.data;
    }

    return originalVerificationCreate.call(prismaClient.verification, args);
  };

  return prismaClient;
}

export { patchPrisma };
