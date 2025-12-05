import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const internId = searchParams.get("internId");

    if (!internId) {
      return NextResponse.json(
        { message: "internId required" },
        { status: 400 }
      );
    }

    const internship = await prisma.internships.findUnique({
      where: { id: internId },
    });

    return NextResponse.json(internship, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
