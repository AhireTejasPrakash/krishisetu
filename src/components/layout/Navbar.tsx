import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Leaf, Globe, Bell, Menu, X, ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import clsx from 'clsx'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Crop Planning', path: '/crop-planning' },
  { label: 'Market', path: '/market' },
  { label: 'Advisory', path: '/advisory' },
  { label: 'Weather', path: '/weather' },
]

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
]

export default function Navbar() {
  const { language, setLanguage, isLoggedIn, setIsLoggedIn, unreadCount, t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentLang = languages.find(l => l.code === language)

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 bg-white border-b border-cream-200 transition-shadow duration-200',
        scrolled ? 'shadow-card' : 'shadow-none'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <span className="text-lg font-bold text-charcoal-800 tracking-tight">
              Krishi<span className="text-green-600">Setu</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) => clsx('nav-link', isActive && 'nav-link-active text-green-700 font-semibold')}
            >{t('nav.home')}</NavLink>
            <NavLink
              to="/crop-planning"
              className={({ isActive }) => clsx('nav-link', isActive && 'nav-link-active text-green-700 font-semibold')}
            >{t('nav.cropPlanning')}</NavLink>
            <NavLink
              to="/market"
              className={({ isActive }) => clsx('nav-link', isActive && 'nav-link-active text-green-700 font-semibold')}
            >{t('nav.market')}</NavLink>
            <NavLink
              to="/advisory"
              className={({ isActive }) => clsx('nav-link', isActive && 'nav-link-active text-green-700 font-semibold')}
            >{t('nav.advisory')}</NavLink>
            <NavLink
              to="/schemes"
              className={({ isActive }) => clsx('nav-link', isActive && 'nav-link-active text-green-700 font-semibold')}
            >{t('schemes.title')}</NavLink>
            <NavLink
              to="/weather"
              className={({ isActive }) => clsx('nav-link', isActive && 'nav-link-active text-green-700 font-semibold')}
            >{t('nav.weather')}</NavLink>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Language dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="btn-ghost gap-1.5 text-charcoal-500 hover:text-charcoal-700"
              >
                <Globe size={15} />
                <span className="text-sm">{currentLang?.label}</span>
                <ChevronDown size={13} className={clsx('transition-transform', langOpen && 'rotate-180')} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-cream-200 rounded-xl shadow-dropdown overflow-hidden min-w-[130px] animate-slide-down">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code as any); setLangOpen(false) }}
                      className={clsx(
                        'w-full text-left px-4 py-2.5 text-sm hover:bg-cream-100 transition-colors',
                        language === lang.code ? 'text-green-700 font-semibold bg-green-50' : 'text-charcoal-700'
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications bell */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-lg text-charcoal-500 hover:text-charcoal-700 hover:bg-cream-100 transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* Auth buttons */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/dashboard" className="btn-ghost text-charcoal-700">
                  Dashboard
                </Link>
                <button
                  onClick={() => { setIsLoggedIn(false); navigate('/') }}
                  className="btn-ghost text-charcoal-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => { navigate('/login') }}
                  className="btn-ghost"
                >
                  Login
                </button>
                <Link to="/crop-planning" className="btn-primary text-sm px-4 py-2">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-charcoal-600 hover:bg-cream-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-cream-200 animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => clsx('block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', isActive ? 'bg-green-50 text-green-700' : 'text-charcoal-600 hover:bg-cream-100')}
            >{t('nav.home')}</NavLink>
            <NavLink
              to="/crop-planning"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => clsx('block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', isActive ? 'bg-green-50 text-green-700' : 'text-charcoal-600 hover:bg-cream-100')}
            >{t('nav.cropPlanning')}</NavLink>
            <NavLink
              to="/market"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => clsx('block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', isActive ? 'bg-green-50 text-green-700' : 'text-charcoal-600 hover:bg-cream-100')}
            >{t('nav.market')}</NavLink>
            <NavLink
              to="/advisory"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => clsx('block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', isActive ? 'bg-green-50 text-green-700' : 'text-charcoal-600 hover:bg-cream-100')}
            >{t('nav.advisory')}</NavLink>
            <NavLink
              to="/schemes"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => clsx('block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', isActive ? 'bg-green-50 text-green-700' : 'text-charcoal-600 hover:bg-cream-100')}
            >{t('schemes.title')}</NavLink>
            <NavLink
              to="/weather"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => clsx('block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', isActive ? 'bg-green-50 text-green-700' : 'text-charcoal-600 hover:bg-cream-100')}
            >{t('nav.weather')}</NavLink>

            {/* Language options on mobile */}
            <div className="pt-2 border-t border-cream-200">
              <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider px-3 mb-1">Language</p>
              <div className="flex gap-2 px-3">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code as any); setMobileOpen(false) }}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border',
                      language === lang.code
                        ? 'bg-green-600 text-white border-green-600'
                        : 'border-cream-300 text-charcoal-600 hover:bg-cream-100'
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile auth */}
            <div className="pt-2 border-t border-cream-200 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">Dashboard</Link>
                  <button onClick={() => { setIsLoggedIn(false); navigate('/'); setMobileOpen(false) }} className="btn-ghost w-full">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => { navigate('/login'); setMobileOpen(false) }} className="btn-secondary w-full">Login</button>
                  <Link to="/crop-planning" onClick={() => setMobileOpen(false)} className="btn-primary w-full">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Close dropdowns on outside click */}
      {langOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setLangOpen(false)} />
      )}
    </header>
  )
}
