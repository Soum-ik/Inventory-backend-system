import { headers } from "next/headers";
const { NextResponse } = require("next/server");


export async function POST(req, res) {
  try {
    let headerList = headers();
    let email = headerList.get("email");
    let id = headerList.get("id");

    return NextResponse.json({ status: "success", data: email });
  } catch (error) { 
    return NextResponse.json({ status: "fail" });
  }
}
