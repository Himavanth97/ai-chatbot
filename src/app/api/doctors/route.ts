import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        department: true,
      }
    });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Failed to fetch doctors", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}
