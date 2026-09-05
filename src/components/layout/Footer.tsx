import { Leaf, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal-800 text-cream-50 pt-12 pb-6 border-t border-charcoal-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Krishi<span className="text-green-400">Setu</span>
              </span>
            </div>
            <p className="text-charcoal-300 text-sm leading-relaxed mb-4">
              Easy and smart farming for everyone. Get the best crop advice, mandi prices, and weather updates.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">Crop Plan</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Mandi Prices</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Farm Advice</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Weather</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Help & Info</h3>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">Govt Schemes</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Farming Guides</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-charcoal-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Nashik, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-green-400 flex-shrink-0" />
                <span>+91 98765 43210 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-green-400 flex-shrink-0" />
                <span>help@krishisetu.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-charcoal-700 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-400">
          <p>© 2024 KrishiSetu. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Sample Data - For Demonstration Only
          </p>
        </div>
      </div>
    </footer>
  )
}
