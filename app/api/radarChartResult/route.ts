import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { userId, radarData } = await req.json();

  try {
    for (const item of radarData) {
      await prisma.radarChartResult.create({
        data: {
          userId,
          category: item.category,
          value: item.value,
        },
      });
    }
    return NextResponse.json({ success: true }); // ✅ зөв
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
