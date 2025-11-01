import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { VehicleBrand, VehicleStatus } from '@prisma/client'

const vehicleSchema = z.object({
  brand: z.nativeEnum(VehicleBrand).optional(),
  model: z.string().min(1).optional(),
  year: z.number().min(1900).max(2100).optional(),
  vin: z.string().min(17).max(17).optional(),
  color: z.string().min(1).optional(),
  mileage: z.number().min(0).optional(),
  price: z.number().min(0).optional(),
  status: z.nativeEnum(VehicleStatus).optional(),
  description: z.string().optional(),
  features: z.string().optional(),
  images: z.string().optional(),
})

export async function GET(
  request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await segmentData.params

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }

    return NextResponse.json(vehicle)
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = vehicleSchema.parse(body)

    const { id } = await segmentData.params

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data,
    })

    return NextResponse.json(vehicle)
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

export async function DELETE(
  request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await segmentData.params

    await prisma.vehicle.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Vehicle deleted' })
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
