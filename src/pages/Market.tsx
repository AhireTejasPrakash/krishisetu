import { API_BASE } from '../lib/api'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function Market() {
  const [marketPrices, setMarketPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    // API INTEGRATION READY
    // Replace 'YOUR_API_ENDPOINT' with your actual backend URL
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        const res = await fetch(API_BASE + '/api/market-prices')
        if (res.ok) {
          const data = await res.json()
          setMarketPrices(data)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("Failed to fetch API", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Mandi Prices</h1>
        <p className="text-charcoal-500">Check today's live crop prices in your nearby markets.</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold mb-4">Current Prices (₹ per Quintal)</h2>
        
        {loading ? (
          <div className="p-8 text-center text-charcoal-500">Loading market prices from server...</div>
        ) : error || marketPrices.length === 0 ? (
          <div className="p-8 text-center bg-cream-50 border border-cream-200 rounded-xl">
            <p className="text-charcoal-600 font-bold">No market data available.</p>
            <p className="text-sm text-charcoal-500 mt-2">The API endpoint is ready. Connect your backend database to display live prices here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table min-w-[600px]">
              <thead>
                <tr>
                  <th>Crop Name</th>
                  <th>Today's Price</th>
                  <th>Price Change</th>
                  <th>Market Demand</th>
                </tr>
              </thead>
              <tbody>
                {marketPrices.map((item, idx) => (
                  <tr key={idx}>
                    <td className="font-bold">{item.crop}</td>
                    <td className="font-bold text-lg">₹{item.price}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1 font-medium ${item.change > 0 ? 'text-green-600' : item.change < 0 ? 'text-red-600' : 'text-charcoal-500'}`}>
                        {item.change > 0 ? <TrendingUp size={16}/> : item.change < 0 ? <TrendingDown size={16}/> : <Minus size={16}/>}
                        {Math.abs(item.change)}%
                      </span>
                    </td>
                    <td>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.demand === 'High' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.demand} Demand
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
