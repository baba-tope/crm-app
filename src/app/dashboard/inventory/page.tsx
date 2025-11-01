'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  vin: string
  color: string
  mileage: number
  price: number
  status: string
  images?: string | null
}

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchVehicles()
  }, [])

  async function fetchVehicles() {
    try {
      const res = await fetch('/api/vehicles')
      if (res.ok) {
        const data = await res.json()
        setVehicles(data)
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteVehicle(id: string) {
    if (!confirm('Are you sure you want to delete this vehicle?')) return

    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setVehicles(vehicles.filter((v) => v.id !== id))
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error)
    }
  }

  const filteredVehicles = vehicles
    .filter((v) => filter === 'all' || v.status === filter)
    .filter((v) =>
      `${v.brand} ${v.model} ${v.year} ${v.vin}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

  if (loading) {
    return <div className="text-center py-10">Loading inventory...</div>
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Inventory</h1>
        <Link
          href="/dashboard/inventory/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Vehicle
        </Link>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
          <option value="RESERVED">Reserved</option>
          <option value="IN_SERVICE">In Service</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No vehicles found
          </div>
        ) : (
          filteredVehicles.map((vehicle) => {
            const vehicleImages = vehicle.images ? JSON.parse(vehicle.images as string) : []
            const mainImage = vehicleImages[0]
            
            return (
            <div
              key={vehicle.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
            >
              {mainImage && (
                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                  <Image
                    src={mainImage}
                    alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {vehicle.year} {vehicle.brand.replace(/_/g, ' ')}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      vehicle.status === 'AVAILABLE'
                        ? 'bg-green-100 text-green-800'
                        : vehicle.status === 'SOLD'
                        ? 'bg-blue-100 text-blue-800'
                        : vehicle.status === 'RESERVED'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{vehicle.model}</p>
                <p className="text-sm text-gray-500 mb-1">
                  VIN: {vehicle.vin}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Color: {vehicle.color}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Mileage: {vehicle.mileage.toLocaleString()} mi
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-3">
                  ${vehicle.price.toLocaleString()}
                </p>
                <div className="mt-4 flex space-x-2">
                  <Link
                    href={`/dashboard/inventory/${vehicle.id}`}
                    className="flex-1 text-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteVehicle(vehicle.id)}
                    className="flex-1 px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )})
        )}
      </div>
    </div>
  )
}
