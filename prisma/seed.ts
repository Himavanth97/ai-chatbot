import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing old data...')
  await prisma.appointment.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.department.deleteMany()

  console.log('Seeding Departments...')
  const emergency = await prisma.department.create({
    data: { name: 'Emergency Medicine', layoutType: 'emergency', floorLocation: 'Floor 1, Wing A' }
  })
  const cardiology = await prisma.department.create({
    data: { name: 'Cardiology', layoutType: 'cardiology', floorLocation: 'Floor 3, Wing B' }
  })
  const pediatrics = await prisma.department.create({
    data: { name: 'Pediatrics', layoutType: 'pediatrics', floorLocation: 'Floor 2, Wing C' }
  })
  const oncology = await prisma.department.create({
    data: { name: 'Oncology', layoutType: 'oncology', floorLocation: 'Floor 4, Wing D' }
  })

  console.log('Seeding Doctors...')
  const drJenkins = await prisma.doctor.create({
    data: { name: 'Dr. Sarah Jenkins', specialtyId: emergency.id, availability: 'Mon-Fri Night Shift (7 PM - 7 AM)', contactInfo: 's.jenkins@care.hospital' }
  })
  const drVance = await prisma.doctor.create({
    data: { name: 'Dr. Marcus Vance', specialtyId: cardiology.id, availability: 'Mon/Wed/Fri (8 AM - 4 PM)', contactInfo: 'm.vance@care.hospital' }
  })
  const drPatel = await prisma.doctor.create({
    data: { name: 'Dr. Priya Patel', specialtyId: pediatrics.id, availability: 'Tue/Thu/Sat (9 AM - 5 PM)', contactInfo: 'p.patel@care.hospital' }
  })
  const drVolkov = await prisma.doctor.create({
    data: { name: 'Dr. Alexei Volkov', specialtyId: oncology.id, availability: 'Mon-Thu (10 AM - 6 PM)', contactInfo: 'a.volkov@care.hospital' }
  })

  console.log('Seeding Patients & Appointments...')
  const johnDoe = await prisma.patient.create({
    data: { name: 'John Doe', dob: new Date('1980-05-15'), medicalHistory: '[]' }
  })
  await prisma.appointment.create({
    data: {
      patientId: johnDoe.id,
      doctorId: drJenkins.id,
      departmentId: emergency.id,
      status: 'Triage Level 2 (Severe)',
      vitalsLog: JSON.stringify({ bp: '140/90', pulse: '105 bpm' })
    }
  })

  const babyLiam = await prisma.patient.create({
    data: { name: 'Baby Liam', dob: new Date('2024-01-10'), medicalHistory: '[]' }
  })
  await prisma.appointment.create({
    data: {
      patientId: babyLiam.id,
      doctorId: drPatel.id,
      departmentId: pediatrics.id,
      status: 'Routine Checkup',
      vitalsLog: JSON.stringify({ weight: '12.5 kg', nextVaccine: 'MMR' })
    }
  })

  const robertChen = await prisma.patient.create({
    data: { name: 'Robert Chen', dob: new Date('1965-11-20'), medicalHistory: '[]' }
  })
  await prisma.appointment.create({
    data: {
      patientId: robertChen.id,
      doctorId: drVance.id,
      departmentId: cardiology.id,
      status: 'Post-Op Monitoring',
      vitalsLog: JSON.stringify({ efRate: '45%', heartRateHistory: [72, 75, 71, 74] })
    }
  })

  const elenaRostova = await prisma.patient.create({
    data: { name: 'Elena Rostova', dob: new Date('1978-08-30'), medicalHistory: '[]' }
  })
  await prisma.appointment.create({
    data: {
      patientId: elenaRostova.id,
      doctorId: drVolkov.id,
      departmentId: oncology.id,
      status: 'Chemo Cycle 3/6',
      vitalsLog: JSON.stringify({ regimen: 'Cisplatin 50mg', day: '14 of 21' })
    }
  })

  console.log('Database successfully seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
