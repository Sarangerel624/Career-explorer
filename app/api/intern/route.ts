import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
 
    const body = await req.json();

    // body.data -> [{ internship1 }, { internship2 }, ...]
    const internships = body.data;

    if (!Array.isArray(internships)) {
      return NextResponse.json({ message: "data must be an array" }, { status: 400 });
    }

    const created = await prisma.internships.createMany({
      data: internships,
    });

    return NextResponse.json(
      { message: "Successfully created!", count: created.count },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "aldaa garlaa!", error: err }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const getAllInternships = await prisma.internships.findMany({});
    return NextResponse.json(getAllInternships, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "aldaa garlaa!", status: 404 });
  }
}