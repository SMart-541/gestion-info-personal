import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

export async function POST(request: Request) {
  const body = await request.json();
  const { fullname, email, password } = body.values;

  if (!fullname || !email || !password)
    return NextResponse.json({
      error: "The request is missing a required field"
    }, { status: 400 });

  const exist = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (exist)
    return NextResponse.json({
      error: "User already exists"
    }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: fullname,
      email,
      hashedPassword
    }
  })

  return NextResponse.json(user);
}