import { prisma } from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const assignments = await prisma.assignment.findMany({
    include: {
      publishers: true,
    },
  });

  return NextResponse.json(assignments);
}

export async function POST(request) {
  try {
    const assignmentsData = await request.json(); // Receber um array de objetos
    const createdAssignments = [];

    // Iterar sobre cada objeto no array e criar a atribuição correspondente
    for (const assignmentData of assignmentsData) {
      const { startTime, endTime, publisherIds, equipmentId } = assignmentData;
      const newAssignment = await prisma.assignment.create({
        data: {
          startTime,
          endTime,
          equipmentId,
          publishers: {
            connect: publisherIds.map((id) => ({ id })),
          },
        },
      });
      createdAssignments.push(newAssignment);
    }

    return NextResponse.json(createdAssignments, { status: 201 });
  } catch (error) {
    console.error("Error creating assignments:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
