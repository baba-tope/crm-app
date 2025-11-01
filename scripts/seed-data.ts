import { PrismaClient, VehicleBrand, VehicleStatus } from '@prisma/client'

const prisma = new PrismaClient()

// Note: Images start empty - users can upload real images via the dashboard
// This avoids broken placeholder URLs and demonstrates the Vercel Blob upload workflow

// Vehicle templates with variants - 3 per brand
const vehicleTemplates = [
  // American Brands (11 brands)
  { brand: VehicleBrand.FORD, model: 'F-150 Lightning', basePrice: 64995, description: 'Electric pickup with impressive range and towing capacity', features: ['Electric', '4WD', 'Pro Power Onboard', 'BlueCruise'], variants: [{ year: 2024, color: 'Oxford White', mileage: 1250, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Antimatter Blue', mileage: 2100, priceAdjust: -2000, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Stone Gray', mileage: 8500, priceAdjust: -8000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.CHEVROLET, model: 'Corvette Stingray', basePrice: 72995, description: 'Mid-engine sports car with breathtaking performance', features: ['V8 Engine', 'Magnetic Ride Control', 'Performance Exhaust'], variants: [{ year: 2024, color: 'Torch Red', mileage: 890, priceAdjust: 0, status: VehicleStatus.RESERVED }, { year: 2024, color: 'Arctic White', mileage: 450, priceAdjust: 1500, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Rapid Blue', mileage: 5200, priceAdjust: -6500, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.DODGE, model: 'Charger SRT Hellcat', basePrice: 85995, description: 'Supercharged muscle car with 717 horsepower', features: ['Supercharged V8', 'Launch Control', 'Adaptive Damping'], variants: [{ year: 2024, color: 'F8 Green', mileage: 1100, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Pitch Black', mileage: 780, priceAdjust: 2000, status: VehicleStatus.RESERVED }, { year: 2023, color: 'TorRed', mileage: 6400, priceAdjust: -10000, status: VehicleStatus.SOLD }] },
  { brand: VehicleBrand.RAM, model: '1500 TRX', basePrice: 98995, description: 'Supercharged off-road pickup with unmatched capability', features: ['Supercharged V8', '4WD', 'Off-Road Package', 'Performance Suspension'], variants: [{ year: 2024, color: 'Hydro Blue', mileage: 2300, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Diamond Black', mileage: 1500, priceAdjust: -1500, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Ignition Orange', mileage: 7800, priceAdjust: -12000, status: VehicleStatus.RESERVED }] },
  { brand: VehicleBrand.JEEP, model: 'Wrangler Rubicon 4xe', basePrice: 56895, description: 'Plug-in hybrid with legendary off-road capability', features: ['Plug-in Hybrid', '4WD', 'Rock-Trac', 'Fox Shocks'], variants: [{ year: 2024, color: 'Sarge Green', mileage: 3400, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Bright White', mileage: 2100, priceAdjust: -1000, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Sting-Gray', mileage: 9200, priceAdjust: -7500, status: VehicleStatus.SOLD }] },
  { brand: VehicleBrand.GMC, model: 'Sierra 1500 Denali', basePrice: 71995, description: 'Premium full-size pickup with luxury appointments', features: ['V8 Engine', 'MultiPro Tailgate', 'CarbonPro Bed', 'Adaptive Cruise'], variants: [{ year: 2024, color: 'Onyx Black', mileage: 1850, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Summit White', mileage: 1200, priceAdjust: -1200, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Smokey Quartz', mileage: 8100, priceAdjust: -9000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.CADILLAC, model: 'Escalade ESV', basePrice: 98995, description: 'Luxury full-size SUV with extended wheelbase', features: ['V8 Engine', '38" Curved OLED', 'Super Cruise', 'AKG Audio'], variants: [{ year: 2024, color: 'Black Raven', mileage: 1800, priceAdjust: 0, status: VehicleStatus.SOLD }, { year: 2024, color: 'Crystal White', mileage: 950, priceAdjust: 1500, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Mahogany Metallic', mileage: 7500, priceAdjust: -13000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.LINCOLN, model: 'Navigator Black Label', basePrice: 112995, description: 'Ultimate luxury SUV with refined elegance', features: ['Twin-Turbo V6', 'Perfect Position Seats', 'Revel Audio', 'Panoramic Roof'], variants: [{ year: 2024, color: 'Pristine White', mileage: 1100, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Infinite Black', mileage: 680, priceAdjust: 2500, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Ceramic Pearl', mileage: 6900, priceAdjust: -15000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.BUICK, model: 'Enclave Avenir', basePrice: 54995, description: 'Premium three-row SUV with quiet cabin', features: ['V6 Engine', 'QuietTuning', 'Wireless CarPlay', '7 Passenger Seating'], variants: [{ year: 2024, color: 'Summit White', mileage: 2400, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Dark Moon Blue', mileage: 1800, priceAdjust: -800, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Ebony Twilight', mileage: 9500, priceAdjust: -8500, status: VehicleStatus.SOLD }] },
  { brand: VehicleBrand.CHRYSLER, model: 'Pacifica Hybrid', basePrice: 52995, description: 'Plug-in hybrid minivan with family-focused features', features: ['Plug-in Hybrid', 'Stow n Go', 'Uconnect Theater', 'Hands-Free Sliding Doors'], variants: [{ year: 2024, color: 'Ceramic Gray', mileage: 3100, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Bright White', mileage: 2500, priceAdjust: -600, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Fathom Blue', mileage: 11200, priceAdjust: -7800, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.TESLA, model: 'Model S Plaid', basePrice: 108990, description: 'Tri-motor AWD electric sedan with incredible acceleration', features: ['Tri-Motor AWD', 'Autopilot', 'Glass Roof', '396mi Range'], variants: [{ year: 2024, color: 'Deep Blue Metallic', mileage: 2100, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Pearl White', mileage: 1500, priceAdjust: -1000, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Midnight Silver', mileage: 9800, priceAdjust: -12000, status: VehicleStatus.SOLD }] },
  
  // European Brands (18 brands)
  { brand: VehicleBrand.BMW, model: 'M3 Competition', basePrice: 82995, description: 'High-performance sedan with adaptive M suspension', features: ['Twin-Turbo I6', 'M xDrive', 'Carbon Fiber Roof', 'M Sport Seats'], variants: [{ year: 2024, color: 'Isle of Man Green', mileage: 1560, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Alpine White', mileage: 800, priceAdjust: 2000, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Brooklyn Grey', mileage: 7200, priceAdjust: -9000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.MERCEDES_BENZ, model: 'S 580 4MATIC', basePrice: 126950, description: 'Flagship luxury sedan with cutting-edge technology', features: ['V8 Turbo', '4MATIC AWD', 'MBUX Hyperscreen', 'Air Suspension'], variants: [{ year: 2024, color: 'Obsidian Black', mileage: 950, priceAdjust: 0, status: VehicleStatus.RESERVED }, { year: 2024, color: 'Selenite Grey', mileage: 1200, priceAdjust: -1500, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Polar White', mileage: 6500, priceAdjust: -15000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.AUDI, model: 'RS e-tron GT', basePrice: 149995, description: 'Electric grand tourer with stunning design', features: ['Dual Motor', 'Quattro AWD', 'Air Suspension', 'Bang & Olufsen'], variants: [{ year: 2024, color: 'Kemora Gray', mileage: 2300, priceAdjust: 0, status: VehicleStatus.IN_SERVICE }, { year: 2024, color: 'Glacier White', mileage: 1100, priceAdjust: 1200, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Daytona Grey', mileage: 7900, priceAdjust: -18000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.VOLKSWAGEN, model: 'ID.4 AWD Pro S', basePrice: 49995, description: 'Versatile electric SUV with practical design', features: ['Dual Motor AWD', 'IQ.Drive Assist', 'Panoramic Roof', 'Travel Assist'], variants: [{ year: 2024, color: 'Kings Red', mileage: 3800, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Dusk Blue', mileage: 2900, priceAdjust: -800, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Moonstone Gray', mileage: 12100, priceAdjust: -7500, status: VehicleStatus.SOLD }] },
  { brand: VehicleBrand.PORSCHE, model: 'Taycan Turbo S', basePrice: 189950, description: 'All-electric sports car with exceptional handling', features: ['Dual Motor AWD', '280mi Range', 'Sport Chrono', '800V Charging'], variants: [{ year: 2024, color: 'Frozen Blue Metallic', mileage: 1420, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Carrara White', mileage: 980, priceAdjust: 3000, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Jet Black', mileage: 5900, priceAdjust: -18000, status: VehicleStatus.IN_SERVICE }] },
  { brand: VehicleBrand.VOLVO, model: 'XC90 Recharge', basePrice: 72995, description: 'Plug-in hybrid luxury SUV with Scandinavian design', features: ['Plug-in Hybrid', 'AWD', 'Bowers & Wilkins', 'Pilot Assist'], variants: [{ year: 2024, color: 'Thunder Grey', mileage: 2600, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Crystal White', mileage: 1900, priceAdjust: -1000, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Onyx Black', mileage: 8800, priceAdjust: -9500, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.JAGUAR, model: 'F-PACE SVR', basePrice: 89995, description: 'High-performance luxury SUV with supercharged power', features: ['Supercharged V8', 'AWD', 'Adaptive Dynamics', 'Meridian Audio'], variants: [{ year: 2024, color: 'British Racing Green', mileage: 1700, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Yulong White', mileage: 1100, priceAdjust: 1500, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Santorini Black', mileage: 6700, priceAdjust: -11000, status: VehicleStatus.RESERVED }] },
  { brand: VehicleBrand.LAND_ROVER, model: 'Range Rover Sport P530', basePrice: 119500, description: 'Luxury performance SUV with off-road prowess', features: ['BMW V8', 'AWD', 'Air Suspension', 'Terrain Response'], variants: [{ year: 2024, color: 'Byron Blue', mileage: 1100, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Fuji White', mileage: 750, priceAdjust: 2200, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Carpathian Grey', mileage: 7100, priceAdjust: -14500, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.MINI, model: 'Cooper S Countryman', basePrice: 39995, description: 'Sporty compact crossover with go-kart handling', features: ['Turbo 4-Cyl', 'ALL4 AWD', 'Harman Kardon', 'Head-Up Display'], variants: [{ year: 2024, color: 'Chili Red', mileage: 4200, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Moonwalk Grey', mileage: 3100, priceAdjust: -700, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Midnight Black', mileage: 13500, priceAdjust: -6500, status: VehicleStatus.SOLD }] },
  { brand: VehicleBrand.FIAT, model: '500e Cabrio', basePrice: 38995, description: 'Electric convertible with Italian flair', features: ['Electric', 'Convertible', 'Fast Charging', 'Connected Services'], variants: [{ year: 2024, color: 'Ocean Green', mileage: 2800, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Glacier Blue', mileage: 1900, priceAdjust: -500, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Bossa Nova White', mileage: 9900, priceAdjust: -5500, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.ALFA_ROMEO, model: 'Giulia Quadrifoglio', basePrice: 84995, description: 'Italian sports sedan with race-bred performance', features: ['Twin-Turbo V6', 'RWD', 'Carbon Fiber Elements', 'Active Aero'], variants: [{ year: 2024, color: 'Rosso Competizione', mileage: 1400, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Trofeo White', mileage: 890, priceAdjust: 1800, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Vulcano Black', mileage: 6200, priceAdjust: -10500, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.MASERATI, model: 'Grecale Trofeo', basePrice: 104995, description: 'Luxury performance SUV with Italian craftsmanship', features: ['Twin-Turbo V6', 'AWD', 'Sonus Faber Audio', 'Active Suspension'], variants: [{ year: 2024, color: 'Blu Emozione', mileage: 1250, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Bianco Astro', mileage: 720, priceAdjust: 2500, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Nero Ribelle', mileage: 5800, priceAdjust: -13000, status: VehicleStatus.IN_SERVICE }] },
  { brand: VehicleBrand.FERRARI, model: 'Roma Spider', basePrice: 278995, description: 'Elegant convertible with Ferrari performance', features: ['Twin-Turbo V8', 'RWD', 'Retractable Hardtop', 'Race Mode'], variants: [{ year: 2024, color: 'Rosso Corsa', mileage: 450, priceAdjust: 0, status: VehicleStatus.RESERVED }, { year: 2024, color: 'Bianco Avus', mileage: 280, priceAdjust: 5000, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Blu Tour de France', mileage: 2100, priceAdjust: -25000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.LAMBORGHINI, model: 'Urus Performante', basePrice: 265995, description: 'Super SUV with unmistakable Lamborghini DNA', features: ['Twin-Turbo V8', 'AWD', 'Torque Vectoring', 'Carbon Ceramic Brakes'], variants: [{ year: 2024, color: 'Verde Mantis', mileage: 680, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Bianco Monocerus', mileage: 420, priceAdjust: 8000, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Nero Noctis', mileage: 3200, priceAdjust: -28000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.BENTLEY, model: 'Continental GT Speed', basePrice: 289995, description: 'Grand tourer combining luxury with sporting prowess', features: ['Twin-Turbo W12', 'AWD', 'Naim Audio', 'Rotating Display'], variants: [{ year: 2024, color: 'Verdant', mileage: 580, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Ice White', mileage: 350, priceAdjust: 12000, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Onyx', mileage: 2800, priceAdjust: -32000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.ROLLS_ROYCE, model: 'Ghost Extended', basePrice: 389995, description: 'Ultimate luxury sedan with effortless performance', features: ['Twin-Turbo V12', 'AWD', 'Bespoke Audio', 'Starlight Headliner'], variants: [{ year: 2024, color: 'English White', mileage: 420, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Black Diamond', mileage: 250, priceAdjust: 15000, status: VehicleStatus.RESERVED }, { year: 2023, color: 'Andalusian White', mileage: 1900, priceAdjust: -38000, status: VehicleStatus.AVAILABLE }] },
  { brand: VehicleBrand.ASTON_MARTIN, model: 'DB12', basePrice: 259995, description: 'Super tourer with stunning British design', features: ['Twin-Turbo V8', 'RWD', 'Adaptive Damping', 'Premium Audio'], variants: [{ year: 2024, color: 'Aston Martin Racing Green', mileage: 520, priceAdjust: 0, status: VehicleStatus.AVAILABLE }, { year: 2024, color: 'Lunar White', mileage: 310, priceAdjust: 8500, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Ultramarine Black', mileage: 2500, priceAdjust: -26000, status: VehicleStatus.IN_SERVICE }] },
  { brand: VehicleBrand.MCLAREN, model: '750S Spider', basePrice: 324995, description: 'Track-focused supercar with open-air thrills', features: ['Twin-Turbo V8', 'RWD', 'Carbon Fiber Monocoque', 'Active Aero'], variants: [{ year: 2024, color: 'McLaren Orange', mileage: 390, priceAdjust: 0, status: VehicleStatus.RESERVED }, { year: 2024, color: 'Silica White', mileage: 220, priceAdjust: 10000, status: VehicleStatus.AVAILABLE }, { year: 2023, color: 'Burton Blue', mileage: 1800, priceAdjust: -35000, status: VehicleStatus.AVAILABLE }] },
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
    console.log('🚗 Creating vehicles...')
    for (const template of vehicleTemplates) {
      for (let variantIndex = 0; variantIndex < template.variants.length; variantIndex++) {
        const variant = template.variants[variantIndex]
        
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
          images: null, // Start with no images - users can upload via dashboard
        }

        const created = await prisma.vehicle.create({ data: vehicleData })
        console.log(`   ✓ ${created.year} ${created.brand} ${created.model} (${created.color})`)
        
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
    console.log(`   - ${vehicleCount} vehicles added (3 per brand across all 29 brands)`)
    console.log(`   - 11 American brands: Ford, Chevrolet, Dodge, RAM, Jeep, GMC, Cadillac, Lincoln, Buick, Chrysler, Tesla`)
    console.log(`   - 18 European brands: BMW, Mercedes-Benz, Audi, VW, Porsche, Volvo, Jaguar, Land Rover, MINI, Fiat, Alfa Romeo, Maserati, Ferrari, Lamborghini, Bentley, Rolls-Royce, Aston Martin, McLaren`)
    console.log(`   - Vehicles start with no images - upload real images via dashboard`)
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
