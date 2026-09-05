import os

file_path = "src/index.css"
try:
    with open(file_path, "rb") as f:
        content_bytes = f.read()
    
    # Let's decode properly. Wait, it's mixed encoding now.
    # We can just read the original file without the broken part.
    # The broken part starts at "@ k e y f r a m e s" which in bytes is ...
    # Let's just rewrite the custom animations and charting at the end.
    
    # Read as string, ignoring errors
    content_str = content_bytes.decode('utf-8', errors='ignore')
    
    # Find where the garbage starts
    clean_content = content_str.split('.custom-tooltip {')[0]
    
    rebuilt = clean_content + """.custom-tooltip {
  @apply bg-white border border-cream-300 rounded-xl shadow-dropdown px-3 py-2.5 text-sm;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
"""

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(rebuilt)
    
    print("index.css fixed successfully")
except Exception as e:
    print(f"Error: {e}")
