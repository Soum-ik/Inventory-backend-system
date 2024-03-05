import { headers } from "next/headers";
const { NextResponse } = require("next/server");
import { PrismaClient } from "@prisma/client";

// get
export async function GET(req, res) {
  try {
    let headerList = headers();
    let id = headerList.get("id");
    console.log(id);
    const prisma = new PrismaClient();

    const result = await prisma.categories.findMany({
      where: {
        user_id: parseInt(id),
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail" });
  }
}

// post
export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();

    let headerList = headers();
    let id = headerList.get("id");
    let reqBody = await req.json();
    reqBody.user_id = parseInt(id);
    const result = await prisma.categories.create({ data: reqBody });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail" });
  }
}
export async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();

    let headerList = headers();
    let user_id = headerList.get("id");

    const { searchParams } = new URL(req.url);
    const cat_id = searchParams.get("cat_id");
    const reqBody = await req.json();
    const result = await prisma.categories.update({
      where: {
        id: parseInt(cat_id),
        user_id: parseInt(user_id),
      },
      data: reqBody,
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail" });
  }
}

// delete
export async function DELETE(req, res) {
  try {
    let headerList = headers();
    let user_id = headerList.get("id");
    console.log(user_id);
    const { searchParams } = new URL(req.url);
    const cat_id = searchParams.get("cat_id");

    const prisma = new PrismaClient();
    const result = await prisma.categories.delete({
      where: {
        id: parseInt(cat_id),
        user_id: parseInt(user_id),
      },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail" });
  }
}

// seletc categori one
export async function PATCH(req, res) {
  try {
    let headerList = headers();
    let user_id = headerList.get("id");
    const { searchParams } = new URL(req.url);
    const cat_id = searchParams.get("cat_id");

    const prisma = new PrismaClient();
    const result = await prisma.categories.findUnique({
      where: {
        id: parseInt(user_id),
        user_id: parseInt(cat_id),
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail" });
  }
}
