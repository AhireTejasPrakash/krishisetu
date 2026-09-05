import os

path = "src/pages/Dashboard.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# The block to remove
block = """      {/* Interactive Ticker from Home */}
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

new_content = content.replace(block, "")

with open(path, "w", encoding="utf-8") as f:
    f.write(new_content)
    
print("Removed Ticker")
