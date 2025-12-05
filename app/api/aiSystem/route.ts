// app/api/complete-test/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { analyzeAnswersWithGemini } from "@/lib/ai";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId, sessionId, answers } = await req.json();

    // 1) Ensure session exists
    let finalSessionId = sessionId;
    if (!finalSessionId) {
      const session = await prisma.testSession.create({
        data: { user: { connect: { id: userId } } },
      });
      finalSessionId = session.id;
    }

    // 2) Save answers
    await prisma.userAnswers.createMany({
      data: answers.map((a: any) => ({
        userId,
        sessionId: finalSessionId,
        questionId: a.questionId,
        score: a.score,
      })),
    });

    // 3) AI — outside transaction
    const aiResponse = await analyzeAnswersWithGemini(
      answers.map((a: any) => ({
        questionId: a.questionId,
        score: a.score,
      }))
    );

    // 4) Upsert AiSystem
    let aiSystem = await prisma.aiSystem.findFirst({
      where: { systemPrompt: aiResponse.systemPrompt },
    });

    if (!aiSystem) {
      aiSystem = await prisma.aiSystem.create({
        data: { systemPrompt: aiResponse.systemPrompt },
      });
    }

    // 5) Create AiResult
    const aiResult = await prisma.aiResult.create({
      data: {
        sessionId: finalSessionId,
        summary: aiResponse.summary,
        topCareers: aiResponse.topCareers,
        relatedCareers: aiResponse.relatedCareers,
        personalityType: aiResponse.personalityType,
        description: aiResponse.description,
        internshipOpportunities: aiResponse.internshipOpportunities,
        recommendedSkills: aiResponse.recommendedSkills,
        aiSystemId: aiSystem.id,
      },
    });

    // const parsed = JSON.parse(text);

    // return {
    //   summary: parsed.summary ?? "",
    //   topCareers: parsed.topCareers ?? [],
    //   relatedCareers: parsed.relatedCareers ?? [],
    //   personalityType: parsed.personalityType ?? "",
    //   description: parsed.description ?? "",
    //   internshipOpportunities: parsed.internshipOpportunities ?? [],
    //   recommendedSkills: parsed.recommendedSkills ?? [],
    //   systemPrompt,
    //   raw: text,
    // };

    return NextResponse.json({
      success: true,
      sessionId: finalSessionId,
      aiResult,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Complete test failed",
      error: (error as Error).message,
    });
  }
}
