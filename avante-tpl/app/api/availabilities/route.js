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
  const availabilities = await request.json()
  const createdAvailabilities = []
  const errors = []

  for (const availability of availabilities){
    try{
      const { startTime, endTime, publisherId } = availability
      const newAvailability = await prisma.availability.create({
        data: { startTime, endTime, publisherId }
      });
      createdAvailabilities.push(newAvailability)
    }
    catch(error){
      console.error(error)
      errors.push(error)
    }
  }
  return NextResponse.json({createdAvailabilities, errors}, { status: 201 });
}