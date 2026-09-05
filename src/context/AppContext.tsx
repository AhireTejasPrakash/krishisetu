import { createContext, useContext, useState, ReactNode } from 'react'
import { resolveTranslation } from '../i18n/translations'
import type { Language } from '../i18n/translations'

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'critical' | 'success'
  title: string
  message: string
  time: string
  read: boolean
  category: string
}

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isLoggedIn: boolean
  setIsLoggedIn: (val: boolean) => void
  userName: string
  setUserName: (name: string) => void
  userContact: string
  setUserContact: (contact: string) => void
  userCrop: string | null
  setUserCrop: (crop: string | null) => void
  notifications: Notification[]
  unreadCount: number
  markNotificationRead: (id: string) => void
  markAllRead: () => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Persist login across browser refreshes using localStorage
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(() => {
    return localStorage.getItem('ks_logged_in') === 'true'
  })

  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem('ks_user_name') || ''
  })

  const [userContact, setUserContactState] = useState<string>(() => {
    return localStorage.getItem('ks_user_contact') || ''
  })

  const [userCrop, setUserCropState] = useState<string | null>(() => {
    return localStorage.getItem('ks_user_crop') || null
  })

  const [notifications, setNotifications] = useState<Notification[]>([])

  const setIsLoggedIn = (val: boolean) => {
    setIsLoggedInState(val)
    localStorage.setItem('ks_logged_in', val ? 'true' : 'false')
    if (!val) {
      localStorage.removeItem('ks_user_name')
      localStorage.removeItem('ks_user_contact')
      localStorage.removeItem('ks_user_crop')
    }
  }

  const setUserName = (name: string) => {
    setUserNameState(name)
    localStorage.setItem('ks_user_name', name)
  }

  const setUserContact = (contact: string) => {
    setUserContactState(contact)
    localStorage.setItem('ks_user_contact', contact)
  }

  const setUserCrop = (crop: string | null) => {
    setUserCropState(crop)
    if (crop) localStorage.setItem('ks_user_crop', crop)
    else localStorage.removeItem('ks_user_crop')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const t = (key: string): string => resolveTranslation(language, key)

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      isLoggedIn, setIsLoggedIn,
      userName, setUserName,
      userContact, setUserContact,
      userCrop, setUserCrop,
      notifications, unreadCount,
      markNotificationRead, markAllRead,
      t,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
