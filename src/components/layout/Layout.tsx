import { ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  showSidebar?: boolean
}

export default function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-sans">
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        {showSidebar && <Sidebar />}
        
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  )
}
