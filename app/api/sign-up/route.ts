import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const created = await prisma.user.create({
      data: {
        name: data.username,
        email: data.email,
        password: data.password,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating question",
      error: (error as Error).message,
    });
  }
}
