import { sendMail } from "@/app/utility/EmailIusser";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const { email } = await req.json();

    const data = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    console.log(data, 'data');
    if (data) {
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

      let EmailTo = "sarkarsoumik215@gmail.com";
      let EmailSubject = " Reset OTP here use otp and change the password";
      let EmailText = `you're code ${randomNumber}`;

      await sendMail(EmailSubject, EmailText, EmailTo);

      return NextResponse.json({
        status: "success",
        data: "your 6 digit code are going successfully",
        res: result,
      });
    } else {
      return NextResponse.json({
        status: "fail",
        data: "information are worng",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error });
  }
}
