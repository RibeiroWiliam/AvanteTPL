import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const publishers = await prisma.publisher.findMany();

  return NextResponse.json({ publishers });
}

export async function POST(request) {
  const { name, password, isAdmin } = await request.json()
  try {
    const newPublisher = await prisma.publisher.create({
      data: { name, password, isAdmin }
    });
    return NextResponse.json({ newPublisher }, {status: 201});
  } catch (error) {
    console.error('Error creating publisher:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
  }
}

