import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);  // URL object
  const userId = searchParams.get("userId"); // query параметр авах
    
  if (!userId) {
    return NextResponse.json({ success: false, error: "userId missing" }, { status: 400 });
  }

  const results = await prisma.radarChartResult.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (results.length <= 1) return NextResponse.json([]);

  const prevTest = results.slice(1); // хамгийн сүүлчийн тестийг хассаны дараа
  return NextResponse.json(prevTest);
}

