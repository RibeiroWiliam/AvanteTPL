import { prisma } from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

export async function DELETE() {
  const deletedAssignments = await prisma.assignment.deleteMany();
  return NextResponse.json(deletedAssignments);
}
