import { API_BASE } from '../lib/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Phone, Mail, ShieldCheck, LogIn, UserPlus, Lock } from 'lucide-react'
import clsx from 'clsx'

export default function Login() {
  const { t, setIsLoggedIn, setUserName, setUserContact } = useApp()
  const navigate = useNavigate()
  
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [method, setMethod] = useState<'phone'|'email'>('phone')
  const [name, setName] = useState('')
  
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const [step, setStep] = useState(0) // 0: Enter Details, 1: Enter OTP (Register Only)
  const [otp, setOtp] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact || !password) {
      alert("Please enter both contact details and password.")
      return
    }
    if (!captchaVerified) {
      alert("Please verify Captcha.")
      return
    }

    if (mode === 'register') {
      if (step === 0) {
        // Request OTP
        try {
          const res = await fetch(API_BASE + '/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contact })
          })
          const data = await res.json()
          if (data.success) {
            if (data.test_otp) {
              // Only shown in testing mode (no API key set)
              alert(`[TESTING MODE]\nYour OTP is: ${data.test_otp}\n\n(Once API key is added, this will be sent via real SMS)`)
            } else {
              // Real SMS was sent
              alert(`OTP sent to ${contact} via SMS! Please check your messages.`)
            }
            setStep(1)
          }
        } catch (err) {
          console.error(err)
        }
      } else {
        // Verify OTP
        try {
          const res = await fetch(API_BASE + '/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contact, otp })
          })
          const data = await res.json()
          if (data.success) {
            setIsLoggedIn(true)
            setUserName(name || 'Farmer')
            setUserContact(contact)
            navigate('/dashboard')
          } else {
            alert("Invalid OTP! Please check the OTP shown in the pop-up.")
          }
        } catch (err) {
          console.error(err)
        }
      }
    } else {
      // Login mode - instant redirect
      setIsLoggedIn(true)
      setUserName(name || 'Farmer')
      setUserContact(contact)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="card w-full max-w-md animate-fade-in">
        


        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-900 mb-2">
            {mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h1>
          <p className="text-charcoal-500">
            {mode === 'login' ? t('auth.loginSubtitle') : t('auth.registerSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {mode === 'register' && step === 1 ? (
            <div className="animate-fade-in space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-green-700 text-2xl mb-1">📱</p>
                <p className="text-sm text-green-800 font-medium mb-1">OTP sent to:</p>
                <p className="font-bold text-green-900 text-lg">{contact}</p>
                <button type="button" onClick={() => setStep(0)} className="text-xs text-green-600 hover:underline mt-2 block mx-auto">
                  ← Change Number
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal-700 mb-2 text-center">
                  Enter 4-digit OTP
                </label>
                <input 
                  type="text" 
                  inputMode="numeric"
                  maxLength={4}
                  className="input-field text-center text-3xl tracking-[0.5em] font-bold py-4" 
                  placeholder="••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                  autoFocus
                />
                <p className="text-xs text-center text-charcoal-400 mt-2">
                  Didn't receive OTP?{' '}
                  <button type="button" className="text-green-600 font-bold hover:underline" onClick={() => {
                    setStep(0)
                    setTimeout(() => (document.querySelector('form') as HTMLFormElement)?.requestSubmit(), 100)
                  }}>
                    Resend
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <>

              {/* Name Input */}
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-bold text-charcoal-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                      <UserPlus size={18}/>
                    </span>
                    <input 
                      type="text" 
                      className="input-field pl-10" 
                      placeholder="e.g. Ramesh Patil"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={mode === 'register'}
                    />
                  </div>
                </div>
              )}
              
              {/* Method Tabs */}
              <div className="flex border border-cream-200 rounded-lg overflow-hidden">
                <button 
                  type="button"
                  className={clsx('flex-1 py-2 font-semibold text-sm flex items-center justify-center gap-2', method === 'phone' ? 'bg-green-50 text-green-700' : 'bg-white text-charcoal-500 hover:bg-cream-50')}
                  onClick={() => setMethod('phone')}
                >
                  <Phone size={16}/> {t('auth.phone')}
                </button>
                <button 
                  type="button"
                  className={clsx('flex-1 py-2 font-semibold text-sm flex items-center justify-center gap-2', method === 'email' ? 'bg-green-50 text-green-700' : 'bg-white text-charcoal-500 hover:bg-cream-50')}
                  onClick={() => setMethod('email')}
                >
                  <Mail size={16}/> {t('auth.email')}
                </button>
              </div>

              {/* Contact Input */}
              <div>
                <label className="block text-sm font-bold text-charcoal-700 mb-2">
                  {method === 'phone' ? t('auth.enterPhone') : t('auth.enterEmail')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                    {method === 'phone' ? <Phone size={18}/> : <Mail size={18}/>}
                  </span>
                  <input 
                    type={method === 'phone' ? 'tel' : 'email'} 
                    className="input-field pl-10" 
                    placeholder={method === 'phone' ? '9876543210' : 'farmer@example.com'}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-bold text-charcoal-700 mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                    <Lock size={18}/>
                  </span>
                  <input 
                    type="password" 
                    className="input-field pl-10" 
                    placeholder={t('auth.enterPassword')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Simulated Captcha */}
              <div className="bg-charcoal-50 border border-charcoal-200 p-4 rounded-xl flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="captcha" 
                  className="w-5 h-5 accent-green-600 rounded"
                  checked={captchaVerified}
                  onChange={(e) => setCaptchaVerified(e.target.checked)}
                />
                <label htmlFor="captcha" className="font-medium text-charcoal-700 flex items-center gap-2 cursor-pointer select-none">
                  <ShieldCheck size={18} className={captchaVerified ? "text-green-600" : "text-charcoal-400"}/> 
                  {t('auth.imNotRobot')}
                </label>
              </div>
            </>
          )}

          <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-2">
            {mode === 'login' ? <LogIn size={18} /> : (step === 0 ? <UserPlus size={18} /> : <ShieldCheck size={18} />)} 
            {mode === 'login' ? t('auth.loginBtn') : (step === 0 ? t('auth.sendOTP') : t('auth.verifyOTP'))}
          </button>
        </form>

        {step === 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal-500">
              {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-green-600 font-bold hover:underline"
              >
                {mode === 'login' ? t('auth.registerBtn') : t('auth.loginBtn')}
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
