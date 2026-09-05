import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Sprout, TrendingUp, CloudSun, ShieldCheck, Smartphone, Download, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Home() {
  const { t } = useApp()
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [installed, setInstalled] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) {
      alert("App is already installed, or your browser doesn't support automatic installation. Try 'Add to Home Screen' from your browser menu.")
      return
    }
    installPrompt.prompt()
    const result = await installPrompt.userChoice
    if (result.outcome === 'accepted') {
      setInstalled(true)
      setInstallPrompt(null)
    }
  }

  const features = [
    { title: 'Crop Plan', desc: 'Predict best crops', icon: <Sprout size={24}/>, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Mandi Prices', desc: 'Live daily rates', icon: <TrendingUp size={24}/>, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Smart Weather', desc: 'Farm-focused alerts', icon: <CloudSun size={24}/>, color: 'text-blue-600', bg: 'bg-blue-100' }
  ]

  return (
    <div className="flex flex-col gap-12 pb-16">
      
      {/* Hero Section */}
      <section className="pt-4 md:pt-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <span role="img" aria-label="farmer">👨‍🌾</span> {t('hero.trusted')}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal-900 leading-tight mb-6 text-balance">
            {t('hero.headline')}
          </h1>
          
          <p className="text-lg md:text-xl text-charcoal-600 max-w-3xl mx-auto mb-10 text-balance">
            {t('hero.subheading')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="btn-primary text-base px-8 py-3 w-full sm:w-auto">
              Login
            </Link>
            <Link to="/market" className="btn-secondary text-base px-8 py-3 w-full sm:w-auto">
              {t('hero.ctaSecondary')}
            </Link>
          </div>

          {/* PWA Install Button with fallback */}
          {!installed && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleInstall}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-bold rounded-xl shadow-lg hover:bg-green-800 transition-colors"
              >
                <Download size={20} />
                Install KrishiSetu App
              </button>
            </div>
          )}
          {installed && (
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 font-bold rounded-xl">
                <Smartphone size={20} />
                ✓ KrishiSetu is Installed!
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-charcoal-600">
            <div className="flex items-center gap-1.5"><ShieldCheck size={18} className="text-green-600"/> 100% Free</div>
            <div className="flex items-center gap-1.5"><Smartphone size={18} className="text-green-600"/> Works Offline</div>
            <div className="flex items-center gap-1.5"><span className="font-bold text-green-600 text-lg">Aअ</span> Hindi & Marathi</div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase */}
      <section className="bg-white py-16 border-y border-cream-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">See how it works</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center bg-cream-50 rounded-3xl p-6 md:p-10 border border-cream-200">
            {/* Tabs */}
            <div className="w-full md:w-1/3 flex flex-col gap-3">
              {features.map((f, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`text-left p-4 rounded-2xl transition-all flex items-center gap-4 ${activeTab === i ? 'bg-white shadow-md border-green-200 border-2 scale-105' : 'hover:bg-cream-100 border-2 border-transparent'}`}
                >
                  <div className={`p-2 rounded-full ${f.bg} ${f.color}`}>{f.icon}</div>
                  <div>
                    <p className={`font-bold ${activeTab === i ? 'text-green-900' : 'text-charcoal-800'}`}>{f.title}</p>
                    <p className="text-xs text-charcoal-500">{f.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Preview Window */}
            <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-inner border border-cream-200 h-64 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {activeTab === 0 && (
                <div className="animate-fade-in w-full max-w-sm">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200 mb-4">
                    <p className="text-green-900 font-bold mb-1">Recommended Crop: Wheat</p>
                    <p className="text-sm text-green-800">Profit Estimate: ₹35,000 / acre</p>
                  </div>
                  <Link to="/crop-planning" className="text-sm font-bold text-green-700 flex items-center justify-center gap-1 hover:underline">Try Calculator <ArrowRight size={14}/></Link>
                </div>
              )}
              {activeTab === 1 && (
                <div className="animate-fade-in w-full max-w-sm">
                  <div className="flex justify-between items-center p-3 border-b border-cream-200 mb-2">
                    <span className="font-bold">Nashik Mandi</span>
                    <span className="text-green-600 font-bold">Open</span>
                  </div>
                  <div className="flex justify-between p-2 bg-cream-50 rounded"><span>Onion</span> <span className="font-bold">₹1850</span></div>
                  <div className="flex justify-between p-2"><span>Tomato</span> <span className="font-bold">₹2400</span></div>
                  <Link to="/market" className="mt-4 text-sm font-bold text-amber-700 flex items-center justify-center gap-1 hover:underline">View Live Market <ArrowRight size={14}/></Link>
                </div>
              )}
              {activeTab === 2 && (
                <div className="animate-fade-in w-full max-w-sm">
                   <div className="text-5xl mb-2">🌧️</div>
                   <p className="font-bold text-xl mb-1">Heavy Rain Alert</p>
                   <p className="text-sm text-charcoal-600 mb-4">Delay pesticide spray by 2 days.</p>
                   <Link to="/dashboard" className="text-sm font-bold text-blue-700 flex items-center justify-center gap-1 hover:underline">View Dashboard <ArrowRight size={14}/></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto bg-green-600 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start your smart farming today</h2>
          <p className="mb-8 text-green-100 text-lg">Join thousands of farmers making better choices and earning more money.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="px-8 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-cream-100">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
