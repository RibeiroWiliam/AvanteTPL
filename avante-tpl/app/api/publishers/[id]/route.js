import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
  
}

export async function PUT(request, { params }) {
  const id = params.id;
  const { name, password, isAdm } = await request.json();

  try {
    // Verifica se o publisher existe antes de atualizá-lo
    const existingPublisher = await prisma.publisher.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPublisher) {
      return NextResponse.json({ message: 'Publisher not found' }, { status: 404 });
    }

    // Atualiza o publisher com os novos dados
    const updatedPublisher = await prisma.publisher.update({
      where: { id: parseInt(id) },
      data: {
        name: name || existingPublisher.name,
        password: password || existingPublisher.password,
        isAdm: isAdm !== undefined ? isAdm : existingPublisher.isAdm
      }
    });

    return NextResponse.json({ updatedPublisher }, { status: 200 });
  } catch (error) {
    console.error('Error updating publisher:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, {params}) {
  const id = params.id;
  try {
    // Verifica se o publisher existe antes de excluí-lo
    const existingPublisher = await prisma.publisher.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPublisher) {
      return NextResponse.json({ message: 'Publisher not found' }, { status: 404 });
    }

    // Exclui o publisher
    await prisma.publisher.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Publisher deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(params.id)
    console.error('Error deleting publisher:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}