'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Initialize Supabase client INSIDE the component
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Debug log (you can remove this later)
  console.log('URL exists:', !!supabaseUrl)
  console.log('Key exists:', !!supabaseAnonKey)

  // Only create client if variables exist
  const supabase = supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      categories: {
        ...formData.categories,
        [category]: !formData.categories[category]
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Check if Supabase client is available
    if (!supabase) {
      setMessage('Configuration error. Please try again later.')
      setLoading(false)
      return
    }

    // Build array of selected categories
    const selectedCategories = []
    if (formData.categories.halal) selectedCategories.push('halal')
    if (formData.categories.vegan) selectedCategories.push('vegan')
    if (formData.categories.nonGmo) selectedCategories.push('non-gmo')

    if (selectedCategories.length === 0) {
      setMessage('Please select at least one category.')
      setLoading(false)
      return
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('vendors')
      .insert([
        {
          business_name: formData.businessName,
          address: formData.address,
          phone: formData.phone,
          categories: selectedCategories,
          status: 'pending'
        }
      ])

    setLoading(false)
    if (error) {
      console.error('Error saving vendor:', error)
      setMessage('Error submitting form. Please try again.')
    } else {
      setMessage('Thank you! Your submission has been received and will be reviewed.')
      // Clear form
      setFormData({
        businessName: '',
        address: '',
        phone: '',
        categories: { halal: false, vegan: false, nonGmo: false }
      })
    }
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

            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-green-300"
            >
              {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}