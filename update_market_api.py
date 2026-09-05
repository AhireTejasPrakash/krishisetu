import os
import re

path = "api/main.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace market_prices logic to use daily seeding so prices don't flutter wildly on every single reload
new_logic = """import datetime

@app.get("/api/market-prices")
def market_prices():
    popular_crops = ["wheat", "rice", "maize", "cotton", "sugarcane", "soyabean", "bajra", "onion", "tomato"]
    results = []
    # Seed random with today's date so prices are consistent for the whole day!
    today = datetime.date.today().strftime("%Y%m%d")
    
    for c in popular_crops:
        base_price = float(ECON.get(c, {}).get("price", 2000))
        # Unique seed per crop per day
        random.seed(f"{today}_{c}")
        fluctuation = random.uniform(-0.08, 0.08)
        live_price = round(base_price * (1 + fluctuation))
        change = round(fluctuation * 100, 1)
        demand = "High" if change > 2 else ("Low" if change < -2 else "Normal")
        results.append({
            "crop": c.capitalize(),
            "price": live_price,
            "change": change,
            "demand": demand
        })
    # Reset random seed
    random.seed()
    return results
"""

# Regex substitution
content = re.sub(
    r'@app\.get\("/api/market-prices"\)\ndef market_prices\(\):.*?(?=\n# .* Root route|\n@app\.get\("/"))',
    new_logic,
    content,
    flags=re.DOTALL
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated main.py")
