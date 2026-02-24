'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VendorSignup() {
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    phone: '',
    categories: {
      halal: false,
      vegan: false,
      nonGmo: false
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Vendor registration submitted! (Demo - database coming soon)')
    console.log('Form data:', formData)
  }

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      categories: {
        ...formData.categories,
        [category]: !formData.categories[category]
      }
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Link href="/" className="text-green-600 mb-4 inline-block">← Back to Home</Link>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">List Your Business</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Categories (select all that apply)</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.categories.halal}
                    onChange={() => handleCategoryChange('halal')}
                  />
                  Halal Certified
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.categories.vegan}
                    onChange={() => handleCategoryChange('vegan')}
                  />
                  Vegan Friendly
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.categories.nonGmo}
                    onChange={() => handleCategoryChange('nonGmo')}
                  />
                  Non-GMO / Organic
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Submit for Review
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Your listing will be reviewed by our team before going live.
          </p>
        </div>
      </div>
    </main>
  )
}