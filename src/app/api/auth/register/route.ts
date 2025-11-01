import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

// Zod preprocessors to trim and normalize basic inputs (mitigates injection vectors)
const trim = (v: unknown) => (typeof v === 'string' ? v.trim() : v)
const toLowerTrim = (v: unknown) => (typeof v === 'string' ? v.trim().toLowerCase() : v)

// Password policy: 12-60 chars, at least 1 upper, 1 lower, 1 number, 1 special
const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,60}$/

const registerSchema = z.object({
  email: z.preprocess(toLowerTrim, z.string().email().max(254)),
  name: z.preprocess(
    trim,
    z
      .string()
      .min(1, 'Name is required')
      .max(40, 'Name must be 40 characters or fewer')
  ),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .max(60, 'Password must be at most 60 characters')
    .refine((val) => passwordPolicy.test(val), {
      message:
        'Password must include uppercase, lowercase, a number, and a special character',
    }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
