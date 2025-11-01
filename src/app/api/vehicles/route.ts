import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { VehicleBrand, VehicleStatus } from '@prisma/client'

const vehicleSchema = z.object({
  brand: z.nativeEnum(VehicleBrand),
  model: z.string().min(1),
  year: z.number().min(1900).max(2100),
  vin: z.string().min(17).max(17),
  color: z.string().min(1),
  mileage: z.number().min(0),
  price: z.number().min(0),
  status: z.nativeEnum(VehicleStatus).optional(),
  description: z.string().optional(),
  features: z.string().optional(),
  images: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(vehicles)
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = vehicleSchema.parse(body)

    const vehicle = await prisma.vehicle.create({
      data,
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: _error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
