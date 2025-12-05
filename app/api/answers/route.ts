import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    if (!answers || !answers.length) {
      return NextResponse.json(
        { success: false, message: "Answers missing" },
        { status: 400 }
      );
    }

    const userId = answers[0].userId;
    const sessionId = answers[0].sessionId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "sessionId is required" },
        { status: 400 }
      );
    }

    const cleanData = answers.map((a: any) => ({
      userId,
      sessionId,
      questionId: a.questionId,
      score: a.score,
    }));

    await prisma.userAnswers.createMany({
      data: cleanData,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Server error", error: e.message },
      { status: 500 }
    );
  }
}
