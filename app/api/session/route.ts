import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "userId is missing",
      });
    }

    const session = await prisma.testSession.create({
      data: {
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json({ success: true, session });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Session creation failed",
      error: (error as Error).message,
    });
  }
}
