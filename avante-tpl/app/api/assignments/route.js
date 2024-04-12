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

export async function PUT(request) {
  try {
    const assignmentsData = await request.json(); // Receber um array de objetos
    const updatedAssignments = [];

    // Iterar sobre cada objeto no array e criar a atribuição correspondente
    for (const assignmentData of assignmentsData) {
      const { id, publisherIds } = assignmentData;

      // Obter os IDs de editor atualmente conectados a esta atribuição
      const currentAssignment = await prisma.assignment.findUnique({
        where: {
          id,
        },
        include: {
          publishers: true,
        },
      });

      // Desconectar os IDs de editor que não estão na solicitação
      const disconnectPromises = currentAssignment.publishers
        .filter((publisher) => !publisherIds.includes(publisher.id))
        .map((publisher) =>
          prisma.assignment.update({
            where: {
              id,
            },
            data: {
              publishers: {
                disconnect: { id: publisher.id },
              },
            },
          })
        );

      await Promise.all(disconnectPromises);

      // Conectar os IDs de editor que estão na solicitação, mas não no banco de dados
      const connectPromises = publisherIds
        .filter(
          (publisherId) =>
            !currentAssignment.publishers.some(
              (publisher) => publisher.id === publisherId
            )
        )
        .map((publisherId) =>
          prisma.assignment.update({
            where: {
              id,
            },
            data: {
              publishers: {
                connectOrCreate: {
                  where: { id: publisherId },
                  create: { id: publisherId }
                },
              },
            },
          })
        );

      await Promise.all(connectPromises);

      // Retornar a atribuição modificada
      const modifiedAssignment = await prisma.assignment.findUnique({
        where: {
          id,
        },
        include: {
          publishers: true,
        },
      });

      updatedAssignments.push(modifiedAssignment);
    }

    return NextResponse.json(updatedAssignments, { status: 200 });
  } catch (error) {
    console.error("Error updating assignments:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const assignments = await prisma.assignment.deleteMany();

  return NextResponse.json(assignments);
}
