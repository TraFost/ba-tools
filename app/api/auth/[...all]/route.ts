// app/api/auth/[...all]/route.ts
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "lib/auth/auth";
import { type NextRequest, NextResponse } from "next/server";

// Get the original handlers
const originalHandlers = toNextJsHandler(auth);

// Create patched handlers
export async function POST(req: NextRequest) {
  try {
    // Clone the request to read the body
    const clonedReq = req.clone();
    const body = await clonedReq.json().catch(() => ({}));

    // Log the request for debugging (optional)
    console.log("Auth POST request:", {
      url: req.url,
      bodyType: typeof body,
      hasBody: !!body,
    });

    // Process the request normally
    return originalHandlers.POST(req);
  } catch (error) {
    // If the error is about the 'ok' field, try to intercept and fix it
    if (error.message?.includes("'ok' type mismatch")) {
      console.log("Intercepted 'ok' field error, attempting to fix");

      // Create a custom error response that will help debug
      return NextResponse.json(
        {
          error: "Authentication error",
          hint: "There's an issue with the 'ok' field in the Verification model. Please check your database schema and better-auth configuration.",
        },
        { status: 500 },
      );
    }

    // For other errors, re-throw
    throw error;
  }
}

// Pass through the GET handler
export const GET = originalHandlers.GET;
