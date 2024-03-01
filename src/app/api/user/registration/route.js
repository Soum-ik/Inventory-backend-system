import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let resBody = await req.json();
    resBody.otp = "0";
    const data = await prisma.users.create({
      data: resBody,
    });

    return NextResponse.json({ status: "success", data: data });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
