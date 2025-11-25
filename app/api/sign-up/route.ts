import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");

    const body = await req.json();
    const { email, password, username, lastName } = body;

    const hashedPassword = await hash(password, 10);

    const created = await prisma.user.create({
      data: {
        email,
        username,
        lastName,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: created.id, email: created.email },
      JWT_SECRET,
      { expiresIn: "10h" }
    );

    return NextResponse.json({
      success: true,
      token: token,
      user: created,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Sign up failed",
      error: (error as Error).message,
    });
  }
}
