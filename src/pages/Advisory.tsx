import { API_BASE } from '../lib/api'
import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function Advisory() {
  const { t, language } = useApp()
  const [advice, setAdvice] = useState<any>(null)
  const [news, setNews] = useState<any[]>([])
  const [loadingNews, setLoadingNews] = useState(true)
  const [newsError, setNewsError] = useState(false)
  
  useEffect(() => {
    // Fetch live Agricultural News from Python backend
    const fetchNews = async () => {
      try {
        setLoadingNews(true)
        const res = await fetch(`${API_BASE}/api/news?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          setNews(data)
        } else {
          setNewsError(true)
        }
      } catch (err) {
        console.error("Failed to fetch news", err)
        setNewsError(true)
      } finally {
        setLoadingNews(false)
      }
    }

    // Generate Dynamic Advice based on Real-Time Weather
    const fetchWeatherForAdvice = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            try {
              const res = await fetch(`${API_BASE}/weather?lat=${lat}&lon=${lon}`)
              if (res.ok) {
                const weatherData = await res.json()
                
                // Logic Engine: Generate dynamic advice based on LIVE weather
                const temp = weatherData.temperature
                const hum = weatherData.humidity
                const desc = weatherData.weather.toLowerCase()

                let waterAdvice = language === 'mr' ? "✅ हवामान सामान्य आहे. तुमच्या पिकासाठी नियमित सिंचन वेळापत्रक फॉलो करा." : 
                                  language === 'hi' ? "✅ मौसम सामान्य है। अपनी फसल के लिए नियमित सिंचाई का पालन करें।" : 
                                  "✅ Weather is normal. Follow standard irrigation schedule for your specific crop."
                
                if (desc.includes('rain') || desc.includes('drizzle')) {
                  waterAdvice = language === 'mr' ? "🌧️ पावसाची शक्यता आहे. पाणी साचण्यापासून वाचण्यासाठी आज पाणी देऊ नका." :
                                language === 'hi' ? "🌧️ बारिश की संभावना है। जलभराव से बचने के लिए आज पानी न दें।" :
                                "🌧️ Rain expected. Skip watering today to prevent waterlogging and root rot."
                } else if (temp > 35) {
                  waterAdvice = language === 'mr' ? `🔥 जास्त उष्णता (${temp}°C). उष्णतेपासून बचाव करण्यासाठी संध्याकाळी भरपूर पाणी द्या.` :
                                language === 'hi' ? `🔥 अत्यधिक गर्मी (${temp}°C). गर्मी के तनाव से बचने के लिए शाम को गहरी सिंचाई करें।` :
                                `🔥 High heat (${temp}°C). Provide deep evening irrigation to prevent heat stress.`
                } else if (hum < 30) {
                  waterAdvice = language === 'mr' ? "🏜️ खूप कोरडे वातावरण. जमिनीत पुरेसा ओलावा असल्याची खात्री करा." :
                                language === 'hi' ? "🏜️ बहुत शुष्क परिस्थितियाँ। मिट्टी में पर्याप्त नमी सुनिश्चित करें।" :
                                "🏜️ Very dry conditions. Ensure adequate soil moisture."
                }

                let pestAdvice = language === 'mr' ? "✅ सध्या हवामान कीड आणि रोगांच्या प्रादुर्भावासाठी कमी धोक्याचे आहे." :
                                 language === 'hi' ? "✅ वर्तमान में मौसम प्रमुख कीट प्रकोपों के लिए कम जोखिम वाला है।" :
                                 "✅ Weather conditions are currently low-risk for major pest outbreaks."
                
                if (hum > 75 && temp > 25) {
                  pestAdvice = language === 'mr' ? "⚠️ जास्त आर्द्रता आणि उष्णतेमुळे बुरशीजन्य रोग आणि मावा कीड वाढण्याचा धोका आहे. पानांवर लक्ष ठेवा." :
                               language === 'hi' ? "⚠️ उच्च आर्द्रता और गर्मी के कारण फंगल रोगों और एफिड्स का खतरा बढ़ जाता है। पत्तियों की बारीकी से निगरानी करें।" :
                               "⚠️ High humidity and warmth increase the risk of Fungal diseases and Aphids. Monitor leaves closely."
                } else if (temp > 30 && hum < 40) {
                  pestAdvice = language === 'mr' ? "⚠️ कोरड्या उष्णतेमुळे कोळी कीड आणि पांढरी माशी आकर्षित होऊ शकते. पानांच्या खालच्या बाजूला लक्ष ठेवा." :
                               language === 'hi' ? "⚠️ शुष्क गर्मी स्पाइडर माइट्स और सफेद मक्खियों को आकर्षित कर सकती है। पत्तियों के निचले हिस्से पर नज़र रखें।" :
                               "⚠️ Dry heat can attract Spider Mites and Whiteflies. Keep an eye on leaf undersides."
                }

                setAdvice({ water: waterAdvice, pest: pestAdvice })
              }
            } catch (err) {
              console.error("Failed to fetch weather for advice", err)
            }
          },
          (err) => console.log("Location denied for advice generator")
        )
      }
    }

    fetchNews()
    
    // Only fetch weather advice once, not every time language changes
    if (!advice) {
      fetchWeatherForAdvice()
    }
  }, [language])

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('advisory.title')}</h1>
        <p className="text-charcoal-500">{t('advisory.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card border-t-4 border-t-blue-500">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">💧 {t('advisory.waterTitle')}</h2>
          {advice ? (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-medium text-blue-900 leading-relaxed">{advice.water}</p>
            </div>
          ) : (
            <p className="text-sm text-charcoal-500">{t('advisory.loadingWeather')}</p>
          )}
        </div>

        <div className="card border-t-4 border-t-amber-500">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">🐛 {t('advisory.pestTitle')}</h2>
          {advice ? (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm font-medium text-amber-900 leading-relaxed">{advice.pest}</p>
            </div>
          ) : (
            <p className="text-sm text-charcoal-500">{t('advisory.loadingWeather')}</p>
          )}
        </div>
      </div>

      {/* Live News Section */}
      <div className="card mt-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📰 {t('advisory.newsTitle')}</h2>
        {loadingNews ? (
          <p className="text-charcoal-500">{t('advisory.loadingNews')}</p>
        ) : newsError || news.length === 0 ? (
          <p className="text-red-600">{t('advisory.newsError')}</p>
        ) : (
          <div className="space-y-4">
            {news.map((item, idx) => (
              <a 
                key={idx} 
                href={item.link} 
                target="_blank" 
                rel="noreferrer"
                className="block p-4 border border-cream-200 rounded-xl hover:bg-green-50 transition-colors"
              >
                <h3 className="font-bold text-green-900 mb-1">{item.title}</h3>
                <p className="text-sm text-charcoal-600 line-clamp-2">{item.desc}</p>
                <p className="text-xs text-charcoal-400 mt-2">
                  {t('advisory.published')}: {item.pubDate}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
