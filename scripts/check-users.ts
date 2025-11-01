import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    if (users.length === 0) {
      console.log('❌ No users found in database. You need to register first!')
      console.log('\nGo to your app and click "Register here" to create an account.')
    } else {
      console.log(`✅ Found ${users.length} user(s) in database:\n`)
      users.forEach((user, i) => {
        console.log(`${i + 1}. ${user.email} (${user.name})`)
        console.log(`   Created: ${user.createdAt.toISOString()}`)
      })
    }
  } catch (error) {
    console.error('Error checking database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()
