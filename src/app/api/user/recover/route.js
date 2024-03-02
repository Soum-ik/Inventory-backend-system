import sendEmail from "@/app/utility/EmailIusser";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// send otp on database
export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const prisma = new PrismaClient();

    const data = await prisma.users.count({ where: { email: email } });

    if (data === 1) {
      let randomNumber = Math.floor(Math.random() * 9000000);
      console.log(randomNumber);
      const result = await prisma.users.update({
        where: {
          email: email,
        },
        data: {
          otp: randomNumber.toString(),
        },
      });

      let EmailSubject = " Reset OTP!  use otp and change your password password";
      let EmailText = `you're code ${randomNumber}`;
      let EmailTo = email;
       
console.log(EmailTo);
      await sendEmail(EmailText, EmailSubject, EmailTo);

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

// verify otp on database
export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let resBody = await req.json();
    const count = await prisma.users.count({
      where: resBody,
    });

    if (count === 1) {
      return NextResponse.json({ status: "success", data: "vaild code" });
    } else {
      return NextResponse.json({ status: "success", data: "unvaild code" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ data: "" });
  }
}

// reset password on database
export async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();
    let resBody = await req.json();
    const count = await prisma.users.count({
      where: {
        email: resBody["email"],
        otp: resBody["otp"],
      },
    });
    console.log(count, resBody["email"], resBody["otp"]);
    if (count === 1) {
      const data = await prisma.users.update({
        where: { email: resBody["email"] },
        data: { otp: "0", password: resBody["password"] },
      });
      return NextResponse.json({
        status: "password update successfully",
        data: data,
      });
    } else {
      return NextResponse.json({ status: "password not update" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ status: "fail" });
  }
}
