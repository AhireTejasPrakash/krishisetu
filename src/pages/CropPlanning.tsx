import { API_BASE } from '../lib/api'
import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function CropPlanning() {
  const { t } = useApp()
  const [showResults, setShowResults] = useState(false)
  const [recommendedCrops, setRecommendedCrops] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  })

  // Auto-fill weather data if location is available
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(`${API_BASE}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            if (res.ok) {
              const weatherData = await res.json()
              setFormData(prev => ({
                ...prev,
                temperature: weatherData.temperature ? Math.round(weatherData.temperature).toString() : prev.temperature,
                humidity: weatherData.humidity ? Math.round(weatherData.humidity).toString() : prev.humidity,
                rainfall: '120' // Default fallback, hard to predict realtime exact rainfall accumulation without pro API, user requested "Rainfall = 120 mm get thus form whther"
              }))
            }
          } catch (err) {
            console.error("Auto-fill weather failed:", err)
          }
        },
        () => console.log("Location denied")
      )
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    for (const [key, value] of Object.entries(formData)) {
      if (value === '' || isNaN(Number(value))) {
        setError(`Please enter a valid numeric value for ${key.toUpperCase()}`)
        return
      }
    }
    
    setError(null)
    setLoading(true)

    try {
      const payload = {
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall)
      }

      const res = await fetch(API_BASE + '/api/crop-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw new Error('Failed to fetch from the recommendation API')
      }

      const data = await res.json()
      setRecommendedCrops(data.recommendations || [])
      setShowResults(true)
    } catch (err: any) {
      setError(err.message || "Failed to connect to the backend server. Make sure it is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('cropPlanning.title')}</h1>
        <p className="text-charcoal-500">{t('cropPlanning.subtitle')}</p>
      </div>

      {!showResults ? (
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Enter Soil & Weather Details</h2>
          
          {error && (
            <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleGeneratePlan}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">{t('cropPlanning.nitrogen')}</label>
                <input required type="number" step="any" name="N" value={formData.N} onChange={handleChange} className="input-field" placeholder="e.g. 90" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">{t('cropPlanning.phosphorus')}</label>
                <input required type="number" step="any" name="P" value={formData.P} onChange={handleChange} className="input-field" placeholder="e.g. 40" />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">{t('cropPlanning.potassium')}</label>
                <input required type="number" step="any" name="K" value={formData.K} onChange={handleChange} className="input-field" placeholder="e.g. 40" />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">{t('cropPlanning.temperature')}</label>
                <input required type="number" step="any" name="temperature" value={formData.temperature} onChange={handleChange} className="input-field" placeholder="e.g. 25" />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">{t('cropPlanning.humidity')}</label>
                <input required type="number" step="any" name="humidity" value={formData.humidity} onChange={handleChange} className="input-field" placeholder="e.g. 60" />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">{t('cropPlanning.ph')}</label>
                <input required type="number" step="any" name="ph" value={formData.ph} onChange={handleChange} className="input-field" placeholder="e.g. 6.5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">{t('cropPlanning.rainfall')}</label>
                <input required type="number" step="any" name="rainfall" value={formData.rainfall} onChange={handleChange} className="input-field" placeholder="e.g. 200" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-4 disabled:opacity-50">
              {loading ? t('cropPlanning.analyzing') : t('cropPlanning.generatePlan')}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <button onClick={() => setShowResults(false)} className="text-green-600 hover:underline mb-4">
            ← Change my answers
          </button>
          
          <h2 className="text-xl font-bold">{t('cropPlanning.recommended')}</h2>
          
          {recommendedCrops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedCrops.map((crop, idx) => (
                <div key={idx} className="card border-2 border-green-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold capitalize flex items-center gap-2">
                      🌱 {crop.crop}
                    </h3>
                    {idx === 0 && <span className="badge-green">Top Match</span>}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm border-b border-cream-100 pb-2">
                      <span className="text-charcoal-600">Confidence Score:</span>
                      <span className="font-bold text-blue-600 flex items-center gap-1">⭐ {(crop.score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-cream-100 pb-2">
                      <span className="text-charcoal-600">{t('cropPlanning.yield')}:</span>
                      <span className="font-bold text-charcoal-800">📈 {crop.expected_yield} quintals</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-cream-100 pb-2">
                      <span className="text-charcoal-600">{t('cropPlanning.marketPrice')}:</span>
                      <span className="font-bold text-amber-600">💰 ₹{crop.market_price}/q</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2">
                      <span className="text-charcoal-600">{t('cropPlanning.profit')}:</span>
                      <span className="font-bold text-green-700 text-base">💵 ₹{crop.expected_profit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-cream-50 border border-cream-200 rounded-xl">
              <p className="text-charcoal-600">{t('cropPlanning.noRecommendations')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
