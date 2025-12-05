import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ message: "userId required" }, { status: 400 });
    }

    const result = await prisma.aiResult.findFirst({
      where: { session: { userId } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        summary: true,
        topCareers: true,
        relatedCareers: true,
        personalityType: true,
        description: true,
        internshipOpportunities: true,
        recommendedSkills: true,
        createdAt: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: (err as Error).message },
      { status: 500 }
    );
  }
}
