import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { comment, id, username } = body;

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return;
    } else {
      const commentCreated = await prisma.comments.create({
        data: {
          userId: id,
          text: comment,
          username,
        },
      });

      return NextResponse.json({
        message: "comment sucessfully created!",
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "aldaa garlaa!", status: 404 });
  }
}

export async function GET(req: Request) {
  try {
    const getAllComments = await prisma.comments.findMany({});
    return NextResponse.json(getAllComments, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "aldaa garlaa!", status: 404 });
  }
}
