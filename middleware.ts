import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/firmalar/:path*",
    "/api/test-firma"
  ]
};
