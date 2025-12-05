// app/api/login/route.ts (Next.js route)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");

    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found, please sign up" },
        { status: 404 }
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "10h",
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      createdAt: user.createdAt,
    };
    console.log(safeUser);

    return NextResponse.json(
      { success: true, token: token, user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error logging in",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
