import { API_BASE } from '../lib/api'
import { useState, useEffect } from 'react'
import { Sprout, TrendingUp, CloudRain, ShieldAlert, LogOut, Search, MapPin, CheckCircle2, Circle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { t, language, userName, userContact, userCrop, setUserCrop, setIsLoggedIn } = useApp()
  const navigate = useNavigate()
  
  const [data, setData] = useState({
    weather: null as string | null,
    city: 'Detecting...',
    mandiPrice: null as string | null,
    alerts: 0,
    advice: [] as any[],
  })
  
  const [showCropModal, setShowCropModal] = useState(false)
  const [tempCrop, setTempCrop] = useState('')
  
  const [tasks, setTasks] = useState<{id: number, title: string, done: boolean}[]>([])
  
  const [locationSearch, setLocationSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)

  // AI Doctor state
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<any>(null)

  useEffect(() => {
    if (!userCrop) {
      setShowCropModal(true)
    } else {
      fetchMandiPrice(userCrop)
      generateTasks(userCrop)
    }
    
    // Always ask for GPS first as per user request
    fetchLocation()
    
    // Load tasks from local storage
    const savedTasks = localStorage.getItem('farmTasks')
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (e) {}
    }
  }, [userCrop])
  
  const generateTasks = (crop: string) => {
    const existing = localStorage.getItem('farmTasks')
    if (existing) return // don't override if already have tasks
    
    const defaultTasks = [
      { id: 1, title: `Morning: Field Inspection for ${crop}`, done: false },
      { id: 2, title: `Check soil moisture levels`, done: false },
      { id: 3, title: `Clean equipment and tools`, done: false }
    ]
    setTasks(defaultTasks)
    localStorage.setItem('farmTasks', JSON.stringify(defaultTasks))
  }
  
  const toggleTask = (id: number) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    setTasks(updated)
    localStorage.setItem('farmTasks', JSON.stringify(updated))
  }

  const fetchLocation = () => {
    setIsLoadingWeather(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(`${API_BASE}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            const weatherData = await res.json()
            updateWeatherState(weatherData)
          } catch (err) {
            console.error(err)
            setIsLoadingWeather(false)
          }
        },
        (err) => {
          console.warn("GPS Error/Denied:", err)
          const savedCity = localStorage.getItem('userCity') || 'Nashik'
          fetchWeatherByCity(savedCity)
        }
      )
    } else {
      const savedCity = localStorage.getItem('userCity') || 'Nashik'
      fetchWeatherByCity(savedCity)
    }
  }

  const fetchWeatherByCity = async (city: string) => {
    setIsLoadingWeather(true)
    try {
      const res = await fetch(`${API_BASE}/weather/by-city?city=${encodeURIComponent(city)}`)
      const weatherData = await res.json()
      if (weatherData.error) {
        alert("City not found. Please try another.")
      } else {
        localStorage.setItem('userCity', weatherData.city)
        updateWeatherState(weatherData)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingWeather(false)
      setShowSearch(false)
    }
  }

  const updateWeatherState = (weatherData: any) => {
    setData(prev => ({
      ...prev,
      weather: weatherData.temperature ? Math.round(weatherData.temperature).toString() : null,
      city: weatherData.city || 'Unknown',
      alerts: weatherData.temperature && weatherData.temperature > 35 ? 1 : 0,
      advice: generateAdvice(weatherData.temperature)
    }))
    setIsLoadingWeather(false)
  }

  const generateAdvice = (temp: number) => {
    let ad = []
    if (temp > 35) {
      ad.push({
        title: language === 'mr' ? "जास्त उष्णतेचा इशारा" : language === 'hi' ? "अत्यधिक गर्मी का अलर्ट" : "High Heat Alert",
        desc: language === 'mr' ? "तापमान खूप जास्त आहे. वेळेवर सिंचन करा आणि दुपारी फवारणी टाळा." : language === 'hi' ? "तापमान बहुत अधिक है। नियमित सिंचाई करें और दोपहर में रसायनों का छिड़काव न करें।" : "Temperatures are very high. Ensure frequent irrigation and avoid spraying chemicals in the afternoon."
      })
    } else {
      ad.push({
        title: language === 'mr' ? "हवामान अनुकूल आहे" : language === 'hi' ? "मौसम अनुकूल है" : "Weather is Optimal",
        desc: language === 'mr' ? "शेतीच्या दैनंदिन कामांसाठी उत्तम हवामान." : language === 'hi' ? "सामान्य कृषि गतिविधियों के लिए अच्छी स्थिति है।" : "Good conditions for general farming activities."
      })
    }
    
    if (userCrop) {
      ad.push({
        title: language === 'mr' ? `पीक काळजी: ${userCrop}` : language === 'hi' ? `फसल देखभाल: ${userCrop}` : `Crop Care: ${userCrop}`,
        desc: language === 'mr' ? `${userCrop} च्या पानांवर कीड किंवा रोगांची लक्षणे तपासा.` : language === 'hi' ? `${userCrop} की पत्तियों पर कीटों के शुरुआती लक्षणों की निगरानी करें।` : `Monitor ${userCrop} leaves for early signs of pests.`
      })
    }
    return ad
  }

  const fetchMandiPrice = async (crop: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/mandi-price?crop=${crop}`)
      const data = await res.json()
      setData(prev => ({ ...prev, mandiPrice: data.price }))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveCrop = () => {
    if (tempCrop.trim()) {
      setUserCrop(tempCrop.trim())
      setShowCropModal(false)
      generateTasks(tempCrop.trim())
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (locationSearch.trim()) {
      fetchWeatherByCity(locationSearch.trim())
    }
  }

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setImage(URL.createObjectURL(selectedFile))
      setDiagnosis(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return
    setAnalyzing(true)
    
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/analyze-plant", { method: "POST", body: formData })
      if (res.ok) {
        setDiagnosis(await res.json())
      } else {
        alert("Failed to analyze image. Ensure backend is running.")
      }
    } catch (err) {
      alert("Network error connecting to backend.")
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6 pb-12">

      {/* Onboarding Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-charcoal-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-slide-up">
            <h2 className="text-xl font-bold text-green-700 mb-2">{t('dashboard.cropPromptTitle')}</h2>
            <p className="text-charcoal-600 mb-6">{t('dashboard.cropPromptDesc')}</p>
            <input 
              type="text" 
              placeholder={t('dashboard.cropPlaceholder')}
              className="input-field mb-4"
              value={tempCrop}
              onChange={(e) => setTempCrop(e.target.value)}
              autoFocus
            />
            <button onClick={handleSaveCrop} className="btn-primary w-full py-3">
              {t('common.save')}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">Good Morning, {userName || 'Farmer'}! 👋</h1>
          {userContact && <p className="text-sm font-bold text-green-700 mt-1 mb-1 bg-green-50 inline-block px-2 py-0.5 rounded border border-green-200">{userContact}</p>}
          <p className="text-charcoal-500 text-sm">{t('dashboard.greetingSubtitle')}</p>
        </div>
        <button
          onClick={() => { setIsLoggedIn(false); navigate('/login') }}
          className="flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg border border-red-200 transition-colors shadow-sm bg-white"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-700 rounded-full"><Sprout /></div>
          <div>
            <p className="text-sm text-charcoal-500">{t('dashboard.currentCrop')}</p>
            <p className="text-xl font-bold capitalize">{userCrop || '--'}</p>
          </div>
        </div>
        
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-full"><TrendingUp /></div>
          <div>
            <p className="text-sm text-charcoal-500">{t('dashboard.marketSnapshot')}</p>
            <p className="text-xl font-bold">{data.mandiPrice ? `₹${data.mandiPrice}` : '--'}</p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-full"><CloudRain size={20} /></div>
              <p className="text-sm font-medium text-charcoal-600">Weather</p>
            </div>
            <button onClick={() => setShowSearch(!showSearch)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-full" title="Change Location">
               <Search size={16} />
            </button>
          </div>
          
          {showSearch ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mt-2">
               <input 
                 type="text" 
                 value={locationSearch}
                 onChange={e => setLocationSearch(e.target.value)}
                 placeholder="Enter City/District" 
                 className="flex-1 text-sm p-1.5 border border-cream-200 rounded"
                 autoFocus
               />
               <button type="submit" className="bg-blue-600 text-white p-1.5 rounded text-xs font-bold">Go</button>
            </form>
          ) : (
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold">{isLoadingWeather ? '...' : (data.weather ? `${data.weather}°C` : '--')}</p>
              <p className="text-sm text-charcoal-500 flex items-center gap-1"><MapPin size={12}/> {data.city}</p>
            </div>
          )}
        </div>

        <div className="card flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-700 rounded-full"><ShieldAlert /></div>
          <div>
            <p className="text-sm text-charcoal-500">{t('dashboard.alerts')}</p>
            <p className="text-xl font-bold text-red-600">{data.alerts} Warning(s)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="card flex flex-col">
          <h2 className="text-lg font-bold mb-4">{t('dashboard.todayAdvisory')}</h2>
          <div className="flex-1">
            {data.advice.length > 0 ? (
              data.advice.map((item: any, idx) => (
                <div key={idx} className="p-3 bg-blue-50 border border-blue-200 rounded-xl mb-3 last:mb-0">
                  <p className="font-bold text-blue-800">{item.title}</p>
                  <p className="text-blue-900 text-sm mt-1">{item.desc}</p>
                </div>
              ))
            ) : (
              <p className="text-charcoal-500 text-sm">{t('dashboard.noAdvice')}</p>
            )}
          </div>
        </div>

        <div className="card flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Farm Work (Tasks)</h2>
            <button onClick={() => generateTasks(userCrop || 'farm')} className="text-xs text-green-700 font-bold bg-green-50 px-2 py-1 rounded">Refresh</button>
          </div>
          {tasks.length > 0 ? (
            <ul className="space-y-3 flex-1">
              {tasks.map((task: any) => (
                <li 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${task.done ? 'bg-cream-50 border-cream-200' : 'bg-white border-green-200 hover:border-green-400'}`}
                >
                  <div className="mt-0.5">
                    {task.done ? <CheckCircle2 size={20} className="text-green-600" /> : <Circle size={20} className="text-charcoal-300" />}
                  </div>
                  <p className={`font-medium ${task.done ? 'text-charcoal-400 line-through' : 'text-charcoal-800'}`}>{task.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-charcoal-500 text-sm">No tasks added yet.</p>
          )}
        </div>
      </div>

      {/* AI Doctor included in Dashboard as requested */}
      <div className="card bg-green-50 border-green-200 mt-6">
        <h2 className="text-lg font-bold mb-2 text-green-900">📷 {t('advisory.askDoctor')}</h2>
        <p className="text-sm text-green-800 mb-4">{t('advisory.askDoctorDesc')}</p>
        
        {!image ? (
          <label className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center bg-white cursor-pointer hover:bg-green-50 transition-colors block">
            <span className="text-4xl mb-2 block">📱</span>
            <p className="font-bold text-green-700">{t('advisory.tapToSelect')}</p>
            <p className="text-xs text-charcoal-400 mt-1">{t('advisory.takePicture')}</p>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageCapture} />
          </label>
        ) : (
          <div className="bg-white p-4 rounded-xl border border-green-200">
            <div className="relative w-full h-48 mb-4">
              <img src={image} alt="Plant preview" className="w-full h-full object-cover rounded-lg" />
              <button 
                onClick={() => {setImage(null); setFile(null); setDiagnosis(null);}}
                className="absolute top-2 right-2 bg-charcoal-900/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-charcoal-900"
              >
                ✕ 
              </button>
            </div>
            
            {!diagnosis ? (
              <button onClick={handleAnalyze} disabled={analyzing} className="btn-primary w-full py-3 disabled:opacity-50 flex justify-center items-center gap-2">
                {analyzing ? t('advisory.analyzingImage') : t('advisory.findDisease')}
              </button>
            ) : diagnosis.status === 'error' ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                <p className="text-2xl mb-1">⚠️</p>
                <h3 className="font-bold text-amber-900">{diagnosis.message || "Invalid Plant Image"}</h3>
                <p className="text-xs text-amber-700 mt-1">Please ensure you take a clear photo of crop leaves, roots, or fruits.</p>
                <button onClick={() => {setImage(null); setFile(null); setDiagnosis(null);}} className="mt-4 text-sm text-green-700 font-bold hover:underline">
                  {t('advisory.scanAnother')}
                </button>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <h3 className="font-bold text-red-900 flex items-center gap-2">🩺 {diagnosis.disease}</h3>
                <p className="text-xs font-bold text-red-700 mb-3">{t('advisory.confidence')}: {diagnosis.confidence}%</p>
                <p className="text-sm text-charcoal-800 font-medium">{t('advisory.treatment')}</p>
                <p className="text-sm text-charcoal-600 mt-1">{diagnosis.recommendation}</p>
                <button onClick={() => {setImage(null); setFile(null); setDiagnosis(null);}} className="mt-4 text-sm text-green-700 font-bold hover:underline">
                  {t('advisory.scanAnother')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
