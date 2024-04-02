import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request, {params}) {
  const id = params.id;
  console.log(id)
  try {
    // Verifica se o publisher existe antes de excluí-lo
    const existingAvailability = await prisma.availability.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingAvailability) {
      return NextResponse.json({ message: 'Availability not found' }, { status: 404 });
    }

    // Exclui o publisher
    await prisma.availability.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Availability deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(params.id)
    console.error('Error deleting availability:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}