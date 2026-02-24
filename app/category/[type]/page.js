'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CategoryPage() {
  const params = useParams()
  const category = params.type
  
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    // Mock data for now
    setVendors([
      { id: 1, name: 'Sample Halal Restaurant', address: '123 Main St', category: 'halal' },
      { id: 2, name: 'Vegan Cafe', address: '456 Oak Ave', category: 'vegan' },
    ].filter(v => v.category === category))
  }, [category])

  const categoryInfo = {
    halal: { title: 'Halal Places', icon: '🥩', color: 'green' },
    vegan: { title: 'Vegan Places', icon: '🌱', color: 'green' },
    'non-gmo': { title: 'Non-GMO Places', icon: '🌾', color: 'green' }
  }

  const info = categoryInfo[category] || { title: 'Places', icon: '📍', color: 'green' }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-white mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-3xl font-bold">{info.icon} {info.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {vendors.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No vendors listed yet in this category.</p>
        ) : (
          <div className="grid gap-4">
            {vendors.map(vendor => (
              <div key={vendor.id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
                <p className="text-gray-600">{vendor.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}