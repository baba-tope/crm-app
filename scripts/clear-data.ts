import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearData() {
  console.log(' Clearing database...\n')

  try {
    // Delete in order to respect any foreign key constraints
    const deletedVehicles = await prisma.vehicle.deleteMany({})
    console.log(`   OK Deleted ${deletedVehicles.count} vehicles`)

    const deletedContacts = await prisma.contact.deleteMany({})
    console.log(`   OK Deleted ${deletedContacts.count} contacts`)

    console.log('\nOK Database cleared successfully!\n')
  } catch (error) {
    console.error('FAIL Error clearing database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

clearData()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
