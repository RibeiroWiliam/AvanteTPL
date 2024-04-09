import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const publisherId = params.id;

  try {
    // Consulta para obter todas as atribuições com os editores relacionados
    const assignments = await prisma.publisher.findUnique({
      where: { id: publisherId },
      include: {
        assignments: {
          include: {
            publishers: true,
            equipment: true
          }       
        }        
      },
    });

    return NextResponse.json(assignments, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter atribuições:', error);
    return NextResponse.json({  message: 'Erro ao obter atribuições.' }, { status: 500 });
  }
}
