import { NextRequest, NextResponse } from "next/server"

const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default function middleware(req: NextRequest) {
  // only require authentication if the password is set in the environment variables
  if (!PASSWORD) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === "" && pwd === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="Protected", charset="UTF-8"`,
    },
  });
}

