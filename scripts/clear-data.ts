import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearData() {
  console.log('🗑️  Clearing database...\n')

  try {
    // Delete in order to respect any foreign key constraints
    const deletedVehicles = await prisma.vehicle.deleteMany({})
    console.log(`   ✓ Deleted ${deletedVehicles.count} vehicles`)

    const deletedContacts = await prisma.contact.deleteMany({})
    console.log(`   ✓ Deleted ${deletedContacts.count} contacts`)

    console.log('\n✅ Database cleared successfully!\n')
  } catch (error) {
    console.error('❌ Error clearing database:', error)
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
