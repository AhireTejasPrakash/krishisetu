import { API_BASE } from '../lib/api'
import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { FileText, ArrowRight, CheckCircle } from 'lucide-react'

export default function Schemes() {
  const { t } = useApp()
  const [selectedScheme, setSelectedScheme] = useState<any>(null)
  const [step, setStep] = useState(0) // 0: List, 1: Guide, 2: Form Helper

  const [schemesList, setSchemesList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_BASE + '/api/schemes')
      .then(res => res.json())
      .then(data => {
        setSchemesList(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load real-time schemes", err)
        setLoading(false)
      })
  }, [])

  const handleSchemeClick = (scheme: any) => {
    setSelectedScheme(scheme)
    setStep(1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('schemes.title')}</h1>
        <p className="text-charcoal-500">{t('schemes.subtitle')}</p>
      </div>

      {step === 0 && loading && (
        <div className="text-center py-8 text-charcoal-500">
          Loading real-time government schemes...
        </div>
      )}

      {step === 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemesList.map(scheme => (
            <div key={scheme.id} className="card hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-green-500" onClick={() => handleSchemeClick(scheme)}>
              <h3 className="text-xl font-bold mb-2 text-green-800">{scheme.title}</h3>
              <p className="text-charcoal-600 mb-4">{scheme.desc}</p>
              <button className="flex items-center gap-2 text-green-700 font-bold text-sm">
                {t('schemes.viewGuide')} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {step === 1 && selectedScheme && (
        <div className="card animate-slide-up border border-green-200">
          <button onClick={() => setStep(0)} className="text-green-600 hover:underline mb-4 text-sm font-bold">
            ← {t('common.cancel')}
          </button>
          
          <h2 className="text-2xl font-bold text-green-900 mb-2">{selectedScheme.title}</h2>
          <p className="text-charcoal-600 mb-6">{selectedScheme.desc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2"><CheckCircle size={18}/> {t('schemes.eligibility')}</h3>
              <ul className="list-disc list-inside text-amber-800 text-sm space-y-2">
                {selectedScheme.eligibility.map((el: string, i: number) => <li key={i}>{el}</li>)}
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2"><FileText size={18}/> {t('schemes.documents')}</h3>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-2">
                {selectedScheme.documents.map((doc: string, i: number) => <li key={i}>{doc}</li>)}
              </ul>
            </div>
          </div>

          <div className="mb-6 p-4 bg-cream-50 border border-cream-200 rounded-xl">
            <p className="text-charcoal-800 font-medium">📞 Official Helpline: <span className="font-bold text-green-700">{selectedScheme.helpline}</span></p>
          </div>

          <a href={selectedScheme.link} target="_blank" rel="noreferrer" className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg">
            <ArrowRight size={20} /> Apply on Official Govt Portal
          </a>
        </div>
      )}
    </div>
  )
}
