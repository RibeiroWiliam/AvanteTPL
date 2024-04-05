import { prisma } from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;

  try {
    // Verifica se o publisher existe antes de atualizá-lo
    const publisher = await prisma.publisher.findUnique({
      where: { id },
      include: {
        availabilities: true,
      },
    });

    if (!publisher) {
      return NextResponse.json({ message: 'Publisher not found' }, { status: 404 });
    }

    return NextResponse.json( publisher, { status: 200 });
  } catch (error) {
    console.error('Error finding publisher:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const id = params.id;
  const { name, password, isAdm } = await request.json();

  try {
    // Verifica se o publisher existe antes de atualizá-lo
    const existingPublisher = await prisma.publisher.findUnique({
      where: { id },
    });

    if (!existingPublisher) {
      return NextResponse.json({ message: 'Publisher not found' }, { status: 404 });
    }

    // Atualiza o publisher com os novos dados
    const updatedPublisher = await prisma.publisher.update({
      where: { id },
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
      where: { id },
    });

    if (!existingPublisher) {
      return NextResponse.json({ message: 'Publisher not found' }, { status: 404 });
    }

    // Exclui o publisher
    await prisma.publisher.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Publisher deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(params.name)
    console.error('Error deleting publisher:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}