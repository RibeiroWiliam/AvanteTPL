import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { startTime, endTime, publisherId } = await request.json()
  try {
    const newAvailability = await prisma.availability.create({
      data: { startTime, endTime, publisherId }
    });
    return NextResponse.json({ newAvailability }, {status: 201});
  } catch (error) {
    console.error('Error creating availability:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
  }
}