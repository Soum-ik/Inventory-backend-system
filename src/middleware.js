const { NextResponse } = require("next/server");
const { VerifyToken } = require("./app/utility/JWTTokenHelper");

export async function middleware(req, res) {
  if (req.nextUrl.pathname.startsWith("/api/dashboard")) {
    try {
      let token = req.cookies.get("token");
      if (!token) {
        throw new Error("Token not found");
      }

      let payload = await VerifyToken(token);

      const requestHeader = new Headers(req.headers);
      requestHeader.set("email", payload.email);
      requestHeader.set("id", payload.id);

      return NextResponse.next({
        request: { headers: requestHeader },
      });
    } catch (error) {
      return NextResponse.json(
        { status: "fail", data: "unauthorized" },
        { status: 401 },
        { error: error.message }
      );
    }
  }
}
