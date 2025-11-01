import { PrismaClient, VehicleBrand, VehicleStatus } from '@prisma/client'

const prisma = new PrismaClient()

// Helper function to generate image URLs
const generateImageUrls = (brand: string, model: string, variant: number) => {
  const brandSlug = brand.toLowerCase().replace(/_/g, '-')
  const modelSlug = model.toLowerCase().replace(/\s+/g, '-')
  
  return [
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-exterior-front.jpg`,
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-exterior-side.jpg`,
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-exterior-rear.jpg`,
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-exterior-angle.jpg`,
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-interior-dashboard.jpg`,
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-interior-seats.jpg`,
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-interior-steering.jpg`,
    `https://images.unsplash.com/photo-${variant}/${brandSlug}-${modelSlug}-interior-tech.jpg`,
  ]
}

// Vehicle templates with variants
const vehicleTemplates = [
  // American Brands
  {
    brand: VehicleBrand.FORD,
    model: 'F-150 Lightning',
    basePrice: 64995,
    description: 'Electric pickup with impressive range and towing capacity',
    features: ['Electric', '4WD', 'Pro Power Onboard', 'BlueCruise', 'Panoramic Roof'],
    variants: [
      { year: 2024, color: 'Oxford White', mileage: 1250, priceAdjust: 0, status: VehicleStatus.AVAILABLE },
      { year: 2024, color: 'Antimatter Blue', mileage: 2100, priceAdjust: -2000, status: VehicleStatus.RESERVED },
      { year: 2023, color: 'Stone Gray', mileage: 8500, priceAdjust: -8000, status: VehicleStatus.AVAILABLE },
    ],
  },
  {
    brand: VehicleBrand.CHEVROLET,
    model: 'Corvette Stingray',
    basePrice: 72995,
    description: 'Mid-engine sports car with breathtaking performance',
    features: ['V8 Engine', 'Magnetic Ride Control', 'Performance Exhaust', 'Carbon Flash Accents'],
    variants: [
      { year: 2024, color: 'Torch Red', mileage: 890, priceAdjust: 0, status: VehicleStatus.RESERVED },
      { year: 2024, color: 'Arctic White', mileage: 450, priceAdjust: 1500, status: VehicleStatus.AVAILABLE },
      { year: 2023, color: 'Rapid Blue', mileage: 5200, priceAdjust: -6500, status: VehicleStatus.AVAILABLE },
    ],
  },
  {
    brand: VehicleBrand.TESLA,
    model: 'Model S Plaid',
    basePrice: 108990,
    description: 'Tri-motor AWD electric sedan with incredible acceleration',
    features: ['Tri-Motor AWD', 'Autopilot', 'Glass Roof', '396mi Range', 'Supercharging'],
    variants: [
      { year: 2024, color: 'Deep Blue Metallic', mileage: 2100, priceAdjust: 0, status: VehicleStatus.AVAILABLE },
      { year: 2024, color: 'Pearl White', mileage: 1500, priceAdjust: -1000, status: VehicleStatus.AVAILABLE },
      { year: 2023, color: 'Midnight Silver', mileage: 9800, priceAdjust: -12000, status: VehicleStatus.SOLD },
    ],
  },
  // European Brands
  {
    brand: VehicleBrand.BMW,
    model: 'M3 Competition',
    basePrice: 82995,
    description: 'High-performance sedan with adaptive M suspension',
    features: ['Twin-Turbo I6', 'M xDrive', 'Carbon Fiber Roof', 'M Sport Seats', 'Harman Kardon'],
    variants: [
      { year: 2024, color: 'Isle of Man Green', mileage: 1560, priceAdjust: 0, status: VehicleStatus.AVAILABLE },
      { year: 2024, color: 'Alpine White', mileage: 800, priceAdjust: 2000, status: VehicleStatus.RESERVED },
      { year: 2023, color: 'Brooklyn Grey', mileage: 7200, priceAdjust: -9000, status: VehicleStatus.AVAILABLE },
    ],
  },
  {
    brand: VehicleBrand.MERCEDES_BENZ,
    model: 'S 580 4MATIC',
    basePrice: 126950,
    description: 'Flagship luxury sedan with cutting-edge technology',
    features: ['V8 Turbo', '4MATIC AWD', 'MBUX Hyperscreen', 'Air Suspension', 'Burmester Audio'],
    variants: [
      { year: 2024, color: 'Obsidian Black', mileage: 950, priceAdjust: 0, status: VehicleStatus.RESERVED },
      { year: 2024, color: 'Selenite Grey', mileage: 1200, priceAdjust: -1500, status: VehicleStatus.AVAILABLE },
      { year: 2023, color: 'Polar White', mileage: 6500, priceAdjust: -15000, status: VehicleStatus.AVAILABLE },
    ],
  },
  {
    brand: VehicleBrand.PORSCHE,
    model: 'Taycan Turbo S',
    basePrice: 189950,
    description: 'All-electric sports car with exceptional handling',
    features: ['Dual Motor AWD', '280mi Range', 'Sport Chrono', 'Adaptive Air Suspension', '800V Charging'],
    variants: [
      { year: 2024, color: 'Frozen Blue Metallic', mileage: 1420, priceAdjust: 0, status: VehicleStatus.AVAILABLE },
      { year: 2024, color: 'Carrara White', mileage: 980, priceAdjust: 3000, status: VehicleStatus.AVAILABLE },
      { year: 2023, color: 'Jet Black', mileage: 5900, priceAdjust: -18000, status: VehicleStatus.IN_SERVICE },
    ],
  },
]

const usContacts = [
  {
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '(212) 555-0123',
    address: '456 Park Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10022',
    notes: 'Interested in luxury sedans, prefers European brands',
    status: 'active',
  },
  {
    firstName: 'James',
    lastName: 'Rodriguez',
    email: 'james.rodriguez@email.com',
    phone: '(310) 555-0147',
    address: '789 Sunset Boulevard',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90028',
    notes: 'Looking for electric vehicles, high budget',
    status: 'active',
  },
  {
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@email.com',
    phone: '(415) 555-0198',
    address: '123 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    notes: 'Tech professional, prefers Tesla or similar EVs',
    status: 'active',
  },
  {
    firstName: 'Michael',
    lastName: 'Thompson',
    email: 'michael.thompson@email.com',
    phone: '(312) 555-0256',
    address: '321 Michigan Avenue',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    notes: 'Family-oriented, needs SUV with 3rd row seating',
    status: 'active',
  },
  {
    firstName: 'Jessica',
    lastName: 'Williams',
    email: 'jessica.williams@email.com',
    phone: '(713) 555-0324',
    address: '567 Main Street',
    city: 'Houston',
    state: 'TX',
    zipCode: '77002',
    notes: 'Oil industry executive, interested in luxury trucks',
    status: 'active',
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@email.com',
    phone: '(602) 555-0412',
    address: '890 Central Avenue',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85004',
    notes: 'Loves sports cars, previous Corvette owner',
    status: 'active',
  },
  {
    firstName: 'Amanda',
    lastName: 'Garcia',
    email: 'amanda.garcia@email.com',
    phone: '(305) 555-0587',
    address: '234 Ocean Drive',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    notes: 'Real estate agent, wants convertible or luxury coupe',
    status: 'active',
  },
  {
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'robert.martinez@email.com',
    phone: '(214) 555-0643',
    address: '678 Commerce Street',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    notes: 'Business owner, looking for executive sedan',
    status: 'active',
  },
  {
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@email.com',
    phone: '(206) 555-0729',
    address: '456 Pine Street',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    notes: 'Environmental advocate, only interested in EVs',
    status: 'active',
  },
  {
    firstName: 'Christopher',
    lastName: 'Taylor',
    email: 'christopher.taylor@email.com',
    phone: '(617) 555-0815',
    address: '789 Beacon Street',
    city: 'Boston',
    state: 'MA',
    zipCode: '02115',
    notes: 'College professor, modest budget, prefers reliable brands',
    status: 'active',
  },
  {
    firstName: 'Jennifer',
    lastName: 'White',
    email: 'jennifer.white@email.com',
    phone: '(720) 555-0901',
    address: '321 16th Street',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    notes: 'Outdoor enthusiast, needs 4WD SUV or truck',
    status: 'active',
  },
  {
    firstName: 'Daniel',
    lastName: 'Harris',
    email: 'daniel.harris@email.com',
    phone: '(404) 555-0978',
    address: '567 Peachtree Street',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30308',
    notes: 'Tech startup founder, looking for high-performance vehicles',
    status: 'active',
  },
  {
    firstName: 'Michelle',
    lastName: 'Lee',
    email: 'michelle.lee@email.com',
    phone: '(503) 555-1024',
    address: '890 SW Broadway',
    city: 'Portland',
    state: 'OR',
    zipCode: '97205',
    notes: 'Marketing director, prefers hybrid or electric',
    status: 'active',
  },
  {
    firstName: 'Kevin',
    lastName: 'Clark',
    email: 'kevin.clark@email.com',
    phone: '(702) 555-1156',
    address: '234 Las Vegas Boulevard',
    city: 'Las Vegas',
    state: 'NV',
    zipCode: '89101',
    notes: 'Casino manager, wants luxury performance car',
    status: 'active',
  },
  {
    firstName: 'Rachel',
    lastName: 'Young',
    email: 'rachel.young@email.com',
    phone: '(615) 555-1287',
    address: '678 Broadway',
    city: 'Nashville',
    state: 'TN',
    zipCode: '37203',
    notes: 'Music producer, interested in American trucks and SUVs',
    status: 'active',
  },
]

async function seedData() {
  console.log('🌱 Starting database seed...\n')

  try {
    // Check if data already exists
    const existingVehicles = await prisma.vehicle.count()
    const existingContacts = await prisma.contact.count()

    if (existingVehicles > 0 || existingContacts > 0) {
      console.log(`⚠️  Database already has data:`)
      console.log(`   - ${existingVehicles} vehicles`)
      console.log(`   - ${existingContacts} contacts`)
      console.log('\nTo re-seed, delete existing data first or use a fresh database.\n')
      return
    }

    let vehicleCount = 0
    let vinCounter = 1

    // Seed vehicles from templates
    console.log('🚗 Creating vehicles with images...')
    for (const template of vehicleTemplates) {
      for (let variantIndex = 0; variantIndex < template.variants.length; variantIndex++) {
        const variant = template.variants[variantIndex]
        const images = generateImageUrls(template.brand, template.model, variantIndex + 1)
        
        const vehicleData = {
          brand: template.brand,
          model: template.model,
          year: variant.year,
          vin: `${template.brand.substring(0, 3)}${template.model.replace(/\s+/g, '').substring(0, 6).toUpperCase()}${variant.year}${String(vinCounter).padStart(3, '0')}`,
          color: variant.color,
          mileage: variant.mileage,
          price: template.basePrice + variant.priceAdjust,
          status: variant.status,
          description: template.description,
          features: JSON.stringify(template.features),
          images: JSON.stringify(images),
        }

        const created = await prisma.vehicle.create({ data: vehicleData })
        console.log(`   ✓ ${created.year} ${created.brand} ${created.model} (${created.color}) - ${images.length} images`)
        
        vehicleCount++
        vinCounter++
      }
    }

    // Seed contacts
    console.log('\n👥 Creating contacts across the US...')
    for (const contact of usContacts) {
      const created = await prisma.contact.create({ data: contact })
      console.log(`   ✓ ${created.firstName} ${created.lastName} (${created.city}, ${created.state})`)
    }

    console.log('\n✅ Database seeded successfully!')
    console.log(`\nSummary:`)
    console.log(`   - ${vehicleCount} vehicles added (3 variants per model)`)
    console.log(`   - Each vehicle has 8 images (4 exterior, 4 interior)`)
    console.log(`   - 15 contacts added across 15 US states`)
    console.log(`\nYou can now view this data in your dashboard! 🎉\n`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed
seedData()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
