import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Sprout, TrendingUp, BookOpen, CloudSun, LogOut, Landmark } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import clsx from 'clsx'

export default function Sidebar() {
  const { setIsLoggedIn, t } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-cream-200 min-h-[calc(100vh-64px)] sticky top-16 shadow-sm">
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto scrollbar-thin">
        <p className="px-3 text-xs font-semibold text-charcoal-400 uppercase tracking-wider mb-2">Main Menu</p>
        
        <NavLink to="/dashboard" className={({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-charcoal-600 hover:bg-cream-100')}>
          <Home size={18} /> {t('dashboard.title')}
        </NavLink>
        <NavLink to="/crop-planning" className={({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-charcoal-600 hover:bg-cream-100')}>
          <Sprout size={18} /> {t('cropPlanning.title')}
        </NavLink>
        <NavLink to="/market" className={({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-charcoal-600 hover:bg-cream-100')}>
          <TrendingUp size={18} /> {t('market.title')}
        </NavLink>
        <NavLink to="/weather" className={({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-charcoal-600 hover:bg-cream-100')}>
          <CloudSun size={18} /> {t('weather.title')}
        </NavLink>
        <NavLink to="/advisory" className={({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-charcoal-600 hover:bg-cream-100')}>
          <BookOpen size={18} /> {t('advisory.title')}
        </NavLink>
        <NavLink to="/schemes" className={({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-charcoal-600 hover:bg-cream-100')}>
          <Landmark size={18} /> {t('schemes.title')}
        </NavLink>
      </div>

      <div className="p-4 border-t border-cream-200">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
