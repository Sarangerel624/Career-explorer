import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { questions } = await req.json();

    const created = await prisma.question.createMany({
      data: questions,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating question",
      error: (error as Error).message,
    });
  }
}

export async function GET() {
  return NextResponse.json({ message: "hi" });
}
