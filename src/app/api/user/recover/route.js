import sendEmail from "@/app/utility/EmailIusser";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const prisma = new PrismaClient();

    const data = await prisma.users.count({ where: { email: email } });

    if (data === 1) {
      const randomNumber = Math.floor(Math.random() * 9000000);
      console.log(randomNumber);
      const result = await prisma.users.update({
        where: {
          email: email,
        },
        data: {
          otp: randomNumber.toString(),
        },
      });

      let EmailTo = "ratulsarkar216@gmail.com";
      let EmailSubject = " Reset OTP here use otp and change the password";
      let EmailText = `you're code ${randomNumber}`;

      await sendEmail(EmailSubject, EmailText, EmailTo);
      return NextResponse.json({
        status: "success",
        data: "6 digit data send successfully",
        res: result,
      });
    } else {
      return NextResponse.json({ status: "fail", data: "no user found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error });
  }
}
