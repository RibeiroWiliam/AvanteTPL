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
  const assignmentsData = await request.json(); // Receber um array de objetos
  const createdAssignments = [];
  const errors = []

  // Iterar sobre cada objeto no array e criar a atribuição correspondente
  for (const assignmentData of assignmentsData) {
    const { startTime, endTime, publisherIds, equipmentId } = assignmentData;
    try{
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
    catch(error){
      console.error(error)
      errors.push(error)
    }   
  }
  return NextResponse.json({createdAssignments, errors}, { status: 201 });
}

export async function PUT(request) {
  try {
    const assignmentsData = await request.json(); // Receber um array de objetos
    const updatedAssignments = [];
    const errors = [];

    // Iterar sobre cada objeto no array e atualizar a atribuição correspondente
    for (const assignmentData of assignmentsData) {
      const { id, publisherIds } = assignmentData;
      try {
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
                  connect: { id: publisherId },
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
      } catch (error) {
        errors.push(error);
      }
    }

    return NextResponse.json({ updatedAssignments, errors }, { status: 200 });
  } catch (error) {
    console.error("Error updating assignments:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { assignmentIds } = await request.json(); // Receber um array de IDs de atribuição
    const deletedAssignments = [];
    console.log(assignmentIds)

    for (const id of assignmentIds) {
      const deletedAssignment = await prisma.assignment.delete({
        where: {
          id,
        },
      });
      deletedAssignments.push(deletedAssignment);
    }

    return NextResponse.json(deletedAssignments);
  } catch (error) {
    console.error("Error deleting assignments:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
