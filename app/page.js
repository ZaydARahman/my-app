import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Trusted Dietary Places</h1>
        <p className="text-xl">Discover Halal, Vegan, and Non-GMO restaurants & markets</p>
      </div>

      {/* Category Buttons */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Halal Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-3">🥩</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Halal</h3>
            <p className="text-gray-600 mb-4">Certified halal restaurants and butchers</p>
            <Link href="/category/halal" className="bg-green-600 text-white px-4 py-2 rounded inline-block">
              Browse Halal
            </Link>
          </div>

          {/* Vegan Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-3">🌱</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Vegan</h3>
            <p className="text-gray-600 mb-4">Plant-based and vegan-friendly places</p>
            <Link href="/category/vegan" className="bg-green-600 text-white px-4 py-2 rounded inline-block">
              Browse Vegan
            </Link>
          </div>

          {/* Non-GMO Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-3">🌾</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Non-GMO</h3>
            <p className="text-gray-600 mb-4">100% organic and non-GMO verified</p>
            <Link href="/category/non-gmo" className="bg-green-600 text-white px-4 py-2 rounded inline-block">
              Browse Non-GMO
            </Link>
          </div>
        </div>
      </div>

      {/* Vendor CTA */}
      <div className="bg-white py-12 px-4 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Are You a Vendor?</h2>
          <p className="text-gray-600 mb-6">List your restaurant or market and reach customers looking for you.</p>
          <Link href="/vendor/signup" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold">
            List Your Business
          </Link>
        </div>
      </div>
    </main>
  )
}