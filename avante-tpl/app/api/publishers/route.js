import { prisma } from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function GET() {
  const publishers = await prisma.publisher.findMany();

  return NextResponse.json({ publishers });
}

// Função para gerar um hash de senha
async function hashPassword(password) {
  try {
    const saltRounds = 10; // Número de rounds de hashing (quanto maior, mais seguro, mas mais lento)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password');
  }
}

export async function POST(request) {
  try {
    const { name, password, isAdmin } = await request.json();

    // Validar entrada
    if (!name || !password) {
      return NextResponse.json({ message: 'Nome de usuário e senha são obrigatórios' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword)

    const newPublisher = await prisma.publisher.create({
      data: { name, password: hashedPassword, isAdmin: JSON.parse(isAdmin) }
    });

    // Retornar apenas informações não sensíveis
    return NextResponse.json({ id: newPublisher.id, name: newPublisher.name }, { status: 201 });
  } catch (error) {
    console.error('Error creating publisher:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}