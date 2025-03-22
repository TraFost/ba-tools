import type { Prisma, PrismaClient } from "@prisma/client";

function patchPrisma(prismaClient: PrismaClient) {
  const originalVerificationCreate = prismaClient.verification.create;

  // @ts-ignore - We're patching the method
  prismaClient.verification.create = async (args: Prisma.VerificationCreateArgs) => {
    if (args.data && args.data.ok === undefined) {
      args.data.ok = true;
    }
    return originalVerificationCreate.call(prismaClient.verification, args);
  };

  return prismaClient;
}

export { patchPrisma };
