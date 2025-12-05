import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET( req: Request,{ params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const answers = await prisma.userAnswers.findMany({
      where: { userId },
      include: { question: true },
    });

    const categories: Record<string, number[]> = {};

    answers.forEach((a) => {
      const cat = a.question.category;
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(a.score);
    });

    const radarData = Object.entries(categories).map(([category, scores]) => ({
      category,
      value: scores.reduce((a, b) => a + b, 0) / scores.length,
    }));

    return NextResponse.json(radarData);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
