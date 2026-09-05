import { API_BASE } from '../lib/api'
import { useState, useEffect } from 'react'

export default function Weather() {
  const [weather, setWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [locationName, setLocationName] = useState("Locating you...")

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          try {
            // Fetch current weather
            const res = await fetch(`${API_BASE}/weather?lat=${lat}&lon=${lon}`)
            if (!res.ok) throw new Error("Failed to fetch weather from backend")
            const data = await res.json()
            
            // Fetch 7-day forecast
            const forecastRes = await fetch(`${API_BASE}/forecast?lat=${lat}&lon=${lon}`)
            if (forecastRes.ok) {
              const forecastData = await forecastRes.json()
              setForecast(forecastData)
            }
            
            setLocationName(data.city || "Your Location")
            setWeather({
              temp: data.temperature,
              humidity: data.humidity,
              wind: data.wind_speed,
              conditionText: data.weather,
              icon: data.weather.toLowerCase().includes("rain") ? '🌧️' : 
                    data.weather.toLowerCase().includes("cloud") ? '☁️' : '☀️'
            })
          } catch (error) {
            console.error("Failed to fetch weather data", error)
            setErrorMsg("Could not load weather data from backend server.")
          } finally {
            setLoading(false)
          }
        },
        (error) => {
          console.error("Location error:", error)
          setErrorMsg("Please enable Location Services to get real-time weather for your farm.")
          setLoading(false)
        }
      )
    } else {
      setErrorMsg("Geolocation is not supported by your browser.")
      setLoading(false)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Weather Report</h1>
        <p className="text-charcoal-500">{locationName}</p>
      </div>

      {loading ? (
        <div className="p-8 text-center bg-cream-50 border border-cream-200 rounded-xl">
          <p className="text-charcoal-600">Detecting your location & loading real-time weather...</p>
        </div>
      ) : errorMsg ? (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 font-bold">Oops!</p>
          <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
        </div>
      ) : weather ? (
        <>
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-6xl mb-2">{weather.icon}</p>
              <p className="text-5xl font-bold text-blue-900 mb-2">{weather.temp}°C</p>
              <p className="text-xl text-blue-800 font-medium capitalize">{weather.conditionText}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-blue-900 bg-white/60 p-6 rounded-xl min-w-[250px]">
              <div>
                <p className="text-blue-600 mb-1">Humidity</p>
                <p className="font-bold text-lg">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-blue-600 mb-1">Wind Speed</p>
                <p className="font-bold text-lg">{weather.wind} m/s</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-blue-200">
                <p className="text-blue-600 mb-1">Status</p>
                <p className="font-bold text-lg text-green-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live GPS Data
                </p>
              </div>
            </div>
          </div>

          {forecast.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mt-8 mb-4">7-Day Forecast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {forecast.map((day, idx) => {
                  const dateObj = new Date(day.date);
                  const dayName = idx === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                  return (
                    <div key={idx} className="card text-center p-4">
                      <p className="text-sm font-bold text-charcoal-500 mb-2">{dayName}</p>
                      <p className="text-3xl mb-2">{day.icon}</p>
                      <p className="font-bold text-lg">{Math.round(day.max_temp)}°</p>
                      <p className="text-sm text-charcoal-400">{Math.round(day.min_temp)}°</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
