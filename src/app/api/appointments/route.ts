import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
        department: true,
      }
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Failed to fetch appointments", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
