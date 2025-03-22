import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "lib/prisma/prisma";

// Create a custom adapter that removes the 'ok' field when creating verification records
let customPrismaAdapter = prismaAdapter(prisma, {
  provider: "sqlite",
});

// Only modify the adapter in production, since local works fine
if (process.env.NODE_ENV === "production") {
  // Create a wrapper function that modifies the adapter instance
  const originalAdapter = customPrismaAdapter;
  customPrismaAdapter = (options) => {
    const adapter = originalAdapter(options);

    // Replace the create method to strip out the 'ok' field for verification records
    const originalCreate = adapter.create;
    adapter.create = async (params) => {
      // Check if this is a verification record creation
      if (params && params.model === "verification" && params.data) {
        // Remove the 'ok' field if it exists
        if (params.data.ok !== undefined) {
          const { ok, ...restData } = params.data;
          return originalCreate({
            ...params,
            data: restData,
          });
        }
      }

      return originalCreate(params);
    };

    return adapter;
  };
}

export const auth = betterAuth({
  database: customPrismaAdapter,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  // Session optimization settings
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  },
});
