import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { success: false, message: "Answers missing" },
        { status: 400 }
      );
    }

    const userId = answers[0].userId;
    let sessionId = answers[0].sessionId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    // 1) Session ID байхгүй бол шинээр үүсгэнэ
    if (!sessionId) {
      const newSession = await prisma.testSession.create({
        data: { userId },
      });
      sessionId = newSession.id; // Шинэ sessionId авах
    }

    // 2) Session үнэхээр байгаа эсэхийг баталгаажуулах
    const exists = await prisma.testSession.findUnique({
      where: { id: sessionId },
    });

    if (!exists) {
      return NextResponse.json(
        { success: false, message: "Invalid sessionId" },
        { status: 400 }
      );
    }

    // 3) Хариултуудыг бэлтгэх
    const cleanData = answers.map((a: any) => ({
      userId,
      sessionId,
      questionId: a.questionId,
      score: a.score,
    }));

    // 4) createMany хийх
    await prisma.userAnswers.createMany({
      data: cleanData,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true, sessionId });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Server error", error: e.message },
      { status: 500 }
    );
  }
}
