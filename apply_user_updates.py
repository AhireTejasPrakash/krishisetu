import os

# --- 1. Modify Login.tsx ---
login_path = "src/pages/Login.tsx"
with open(login_path, "r", encoding="utf-8") as f:
    login_content = f.read()

# I will replace the state initialization and form to include name
new_login_content = login_content.replace(
    """  const [method, setMethod] = useState<'phone'|'email'>('phone')""",
    """  const [method, setMethod] = useState<'phone'|'email'>('phone')
  const [name, setName] = useState('')"""
)

# Replace setUserName(contact) with setUserName(name || contact)
new_login_content = new_login_content.replace(
    """setUserName(contact)""",
    """setUserName(name || contact)"""
)

# Inject the Name input inside the form right before the Tabs (or after Tabs)
name_input_block = """
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
              
              {/* Method Tabs */}"""

new_login_content = new_login_content.replace(
    """              {/* Method Tabs */}""",
    name_input_block
)

with open(login_path, "w", encoding="utf-8") as f:
    f.write(new_login_content)

# --- 2. Modify Dashboard.tsx ---
dashboard_path = "src/pages/Dashboard.tsx"
with open(dashboard_path, "r", encoding="utf-8") as f:
    dashboard_content = f.read()

# Add the Ticker HTML exactly where requested (at the top of Dashboard return)
ticker_html = """
      {/* Interactive Ticker from Home */}
      <div className="w-full bg-green-900 text-green-100 py-2 -mt-6 mb-6 overflow-hidden whitespace-nowrap text-sm font-medium rounded-b-xl shadow-md">
        <div className="inline-block animate-[scroll_20s_linear_infinite]">
          <span className="mx-4">🌾 Wheat: ₹2200/q (+50)</span> • 
          <span className="mx-4">🍚 Rice: ₹3100/q (-20)</span> • 
          <span className="mx-4">🧅 Onion: ₹1800/q (+100)</span> • 
          <span className="mx-4">🍅 Tomato: ₹2500/q (0)</span> •
          <span className="mx-4">🌾 Wheat: ₹2200/q (+50)</span> • 
          <span className="mx-4">🍚 Rice: ₹3100/q (-20)</span> • 
          <span className="mx-4">🧅 Onion: ₹1800/q (+100)</span> • 
          <span className="mx-4">🍅 Tomato: ₹2500/q (0)</span>
        </div>
      </div>
"""

# Replace the start of the return div
dashboard_content = dashboard_content.replace(
    """<div className="space-y-6 pb-12">""",
    f"""<div className="space-y-6 pb-12">{ticker_html}"""
)

# Ask for GPS every time. So instead of checking localStorage for city first, we do fetchLocation() unconditionally.
# In useEffect:
dashboard_content = dashboard_content.replace(
    """    const savedCity = localStorage.getItem('userCity')
    if (savedCity) {
      fetchWeatherByCity(savedCity)
    } else {
      fetchLocation()
    }""",
    """    // Always ask for GPS first as per user request
    fetchLocation()"""
)

# And if fetchLocation fails, then check localStorage
dashboard_content = dashboard_content.replace(
    """          console.error("GPS Error:", err)
          setData(prev => ({ ...prev, city: 'GPS Disabled. Please search.' }))
          setIsLoadingWeather(false)""",
    """          console.error("GPS Error:", err)
          const savedCity = localStorage.getItem('userCity')
          if (savedCity) {
            fetchWeatherByCity(savedCity)
          } else {
            setData(prev => ({ ...prev, city: 'GPS Disabled. Please search.' }))
            setIsLoadingWeather(false)
          }"""
)

with open(dashboard_path, "w", encoding="utf-8") as f:
    f.write(dashboard_content)

print("Updates completed successfully.")
