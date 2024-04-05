import { prisma } from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const availabilities = await prisma.Availability.findMany({
    include: {
      publisher: true,
    },
  });

  return NextResponse.json(availabilities);
}

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