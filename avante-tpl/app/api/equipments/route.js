import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const equipments = await prisma.equipment.findMany();

  return NextResponse.json(equipments);
}

export async function POST(request) {
  try {
    const { name, type } = await request.json();

    // Validar entrada
    if (!name || !type) {
      return NextResponse.json({ message: 'Nome e tipo de equipamento são obrigatórios' }, { status: 400 });
    }

    const newEquipment = await prisma.equipment.create({
      data: { name, type}
    });

    // Retornar apenas informações não sensíveis
    return NextResponse.json(newEquipment, { status: 201 });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}