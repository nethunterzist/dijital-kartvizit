import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Temporarily simplified middleware - just pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*"
  ]
};
