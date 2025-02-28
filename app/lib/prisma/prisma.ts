import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

// Declare a type for global with our custom property
declare global {
	var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

// Use the global variable without shadowing globalThis
export const prisma = global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
	global.prismaGlobal = prisma;
}
