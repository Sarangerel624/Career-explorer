import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, internId } = body;
    const exists = await prisma.savedInternships.findUnique({
      where: {
        userId_internId: { userId, internId },
      },
    });
    if (!exists) {
      await prisma.savedInternships.create({ data: { userId, internId } });
    }

    return NextResponse.json({
      message: "sucessfully saved internship",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: { err },
      status: 404,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { userId, internId } = body;
    await prisma.savedInternships.delete({
      where: { userId_internId: { userId, internId } },
    });

    return NextResponse.json({
      message: "sucessfully delete ",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: { err },
      status: 404,
    });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "userId required" }, { status: 400 });
    }

    const saved = await prisma.savedInternships.findMany({
      where: { userId },
      include: { intern: true },
    });

    return NextResponse.json(saved);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
