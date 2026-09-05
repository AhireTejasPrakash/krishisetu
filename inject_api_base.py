import os, re

pages = [
    'src/pages/Dashboard.tsx',
    'src/pages/Advisory.tsx',
    'src/pages/CropPlanning.tsx',
    'src/pages/Login.tsx',
    'src/pages/Market.tsx',
    'src/pages/Schemes.tsx',
    'src/pages/Weather.tsx'
]

for path in pages:
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'fetch(' not in content:
        continue

    if 'API_BASE' not in content:
        content = "import { API_BASE } from '../lib/api'\n" + content

    # Replace backtick fetch calls
    content = content.replace("fetch(`/api/", "fetch(`${API_BASE}/api/")
    content = content.replace("fetch(`/weather", "fetch(`${API_BASE}/weather")
    content = content.replace("fetch(`/forecast", "fetch(`${API_BASE}/forecast")

    # Replace quote fetch calls
    content = content.replace("fetch('/api/", "fetch(API_BASE + '/api/")
    content = content.replace("fetch('/weather", "fetch(API_BASE + '/weather")
    content = content.replace("fetch('/forecast", "fetch(API_BASE + '/forecast")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated: {path}")

print("Done!")
