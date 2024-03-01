import { CreateToken } from "@/app/utility/JWTTokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let resBody = await req.json();
    const result = await prisma.users.findUnique({
      where: resBody,
    });
    console.log(result);

    if (result.length === 0) {
      return NextResponse.json({ status: "fail", data: result });
    } else {
      let token = await CreateToken(result["email"], result["id"]);
      const experiData = new Date(Date.now() + 24 * 60 * 60 * 3600);
      const cookieString = `token=${token}; expires=${experiData.toUTCString()}; path=/ `;
      console.log(cookieString, "cookie");
      return NextResponse.json(
        { status: "successfull", data: token },
        { status: 200, headers: { "set-cookie": cookieString } }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "failed", data: error });
  }
}
