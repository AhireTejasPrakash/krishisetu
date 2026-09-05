from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel, Field
import joblib, json
import numpy as np
import pandas as pd
import random
import requests
import xml.etree.ElementTree as ET
import re
import os
from pathlib import Path
from .weather import get_weather
from fastapi.middleware.cors import CORSMiddleware

# Load .env file for API keys
env_path = Path(__file__).parent / ".env"
if env_path.exists():
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ.setdefault(key.strip(), val.strip())

OTP_DEV_API_KEY = os.environ.get("OTP_DEV_API_KEY", "")

app = FastAPI(title="AI Crop Recommendation API", version="0.1.0")

# ✅ Enable CORS for mobile frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can later restrict to ["http://<your-ip>:19006"] or specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model and encoder using robust pathlib paths
BASE_DIR = Path(__file__).resolve().parent.parent

clf = joblib.load(BASE_DIR / "model" / "model.joblib")
le = joblib.load(BASE_DIR / "model" / "label_encoder.joblib")
with open(BASE_DIR / "model" / "feature_order.json") as f:
    FEATURES = json.load(f)

# ✅ Load economic data
ECON = pd.read_csv(BASE_DIR / "data" / "crop_economics.csv")
ECON["crop"] = ECON["crop"].str.lower()
ECON = ECON.set_index("crop").to_dict(orient="index")

# ✅ Input data model
class Features(BaseModel):
    N: float = Field(..., description="Soil Nitrogen content")
    P: float = Field(..., description="Soil Phosphorus content")
    K: float = Field(..., description="Soil Potassium content")
    temperature: float = Field(..., description="Ambient temperature (°C)")
    humidity: float = Field(..., description="Relative humidity (%)")
    ph: float = Field(..., description="Soil pH")
    rainfall: float = Field(..., description="Annual/seasonal rainfall (mm)")

# ✅ Health check
@app.get("/health")
def health():
    return {"status": "ok"}

from .weather import get_weather, get_forecast, get_weather_by_city

# ✅ Weather fetch
@app.get("/weather")
def weather(lat: float, lon: float):
    return get_weather(lat, lon)

@app.get("/weather/by-city")
def weather_by_city(city: str):
    return get_weather_by_city(city)

@app.get("/forecast")
def forecast(lat: float, lon: float):
    return get_forecast(lat, lon)

# ✅ Mandi Price fetch
@app.get("/api/mandi-price")
def mandi_price(crop: str = ""):
    crop = crop.lower().strip()
    base_price = float(ECON.get(crop, {}).get("price", 2200))
    fluctuation = random.uniform(-0.05, 0.05)
    live_price = round(base_price * (1 + fluctuation))
    return {"crop": crop, "price": live_price}

from deep_translator import GoogleTranslator

@app.get("/api/news")
def get_news(lang: str = "en"):
    """Fetch live agricultural news and dynamically translate if needed."""
    url = "https://news.google.com/rss/search?q=agriculture+india+farmers&hl=en-IN&gl=IN&ceid=IN:en"
    try:
        response = requests.get(url, timeout=5)
        root = ET.fromstring(response.content)
        news_items = []
        
        translator = GoogleTranslator(source='auto', target=lang) if lang != 'en' else None

        for item in root.findall('.//item')[:5]:
            title = item.find('title').text
            # Clean Google News titles (usually ends with ' - Source Name')
            if ' - ' in title:
                title = title.rsplit(' - ', 1)[0]
                
            desc = title
            pubDate = item.find('pubDate').text
            
            # Dynamically translate
            if translator:
                try:
                    title = translator.translate(title)
                    desc = title
                except:
                    pass # fallback to english
            
            # Format Date nicely (Extract just the day and month roughly)
            date_str = pubDate[:16] if pubDate else "Today"

            news_items.append({
                "title": title,
                "desc": desc,
                "link": item.find('link').text,
                "pubDate": date_str
            })
        return news_items
    except Exception as e:
        print("News fetch error:", e)
        return []

import datetime

@app.get("/api/market-prices")
def market_prices():
    popular_crops = ["wheat", "rice", "maize", "cotton", "sugarcane", "soyabean", "bajra"]
    results = []
    today = datetime.date.today().strftime("%Y%m%d")
    for c in popular_crops:
        base_price = float(ECON.get(c, {}).get("price", 2000))
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
    random.seed()
    return results

# ✅ Root route
@app.get("/")
def root():
    return {"message": "🌱 AI Crop Recommendation API is running!"}

# ✅ Crop recommendation route
@app.post("/recommend")
@app.post("/api/crop-recommendation")  # Added this alias to match user's example
def recommend(feats: Features, top_k: int = 3):
    # Build input feature vector in correct order
    x = np.array([[getattr(feats, k) for k in FEATURES]], dtype=float)
    probs = clf.predict_proba(x)[0]
    idxs = np.argsort(probs)[::-1][:top_k]
    labels = le.inverse_transform(idxs)

    out = []
    for i, lbl in zip(idxs, labels):
        crop = lbl.lower()
        score = float(probs[i])

        # Yield is in kg per acre, price is ₹ per quintal (100 kg)
        yield_kg = float(ECON[crop]["yield"]) if crop in ECON else 2000.0
        price_per_q = float(ECON[crop]["price"]) if crop in ECON else 2000.0
        yield_quintals = round(yield_kg / 100, 1)  # convert kg to quintals
        profit_val = round(yield_quintals * price_per_q)

        out.append({
            "crop": crop,
            "score": round(score, 4),
            "expected_yield": yield_quintals,
            "market_price": price_per_q,
            "expected_profit": profit_val
        })

    # Return structured output
    return {
        "input": feats.dict(),
        "recommendations": out
    }

# ✅ Plant Disease Analysis (Placeholder for Vision Model)
@app.post("/api/analyze-plant")
async def analyze_plant(file: UploadFile = File(...)):
    import time
    from PIL import Image
    import io
    import random
    
    time.sleep(1.5)
    content = await file.read()
    try:
        img = Image.open(io.BytesIO(content)).convert('RGB')
        img.thumbnail((1, 1))
        r, g, b = img.getpixel((0, 0))
        # Basic heuristic: if mostly blue, white, or greyscale, probably not a plant
        if (r > 200 and g > 200 and b > 200) or (abs(r-g)<15 and abs(g-b)<15) or (b > r + 30 and b > g + 30):
            return {
                "status": "error",
                "message": "Invalid Image. Please upload a clear photo of a crop, leaf, or farm."
            }
    except Exception as e:
        print("Image processing error:", e)
        pass
        
    diseases = [
        {"disease": "Leaf Spot (Fungal)", "confidence": 88.5, "recommendation": "Remove infected leaves. Avoid overhead watering. Apply a copper-based fungicide."},
        {"disease": "Powdery Mildew", "confidence": 92.1, "recommendation": "Ensure good air circulation. Spray with sulfur or potassium bicarbonate solution."},
        {"disease": "Healthy Plant", "confidence": 95.0, "recommendation": "Your crop looks healthy! Continue your regular watering and fertilizer schedule."},
        {"disease": "Aphids Attack", "confidence": 84.3, "recommendation": "Spray neem oil or insecticidal soap on the affected leaves."},
    ]
    
    return {"status": "success", **random.choice(diseases)}

@app.get("/api/schemes")
async def get_schemes():
    return [
        {
            "id": "pm-kisan",
            "title": "PM-KISAN Samman Nidhi",
            "desc": "₹6000 per year income support for landholding farmers.",
            "eligibility": ["Small and marginal farmers", "Must own cultivable land", "Valid Aadhaar Card"],
            "documents": ["Aadhaar Card", "Land holding papers (7/12 extract)", "Bank Account Details"],
            "helpline": "155261 / 011-24300606",
            "link": "https://pmkisan.gov.in/"
        },
        {
            "id": "pmfby",
            "title": "Pradhan Mantri Fasal Bima Yojana",
            "desc": "Crop insurance scheme against natural calamities.",
            "eligibility": ["Growing notified crops", "Non-loanee farmers are also eligible"],
            "documents": ["Sowing certificate", "Bank Account Details", "Aadhaar Card"],
            "helpline": "14447",
            "link": "https://pmfby.gov.in/"
        },
        {
            "id": "kcc",
            "title": "Kisan Credit Card (KCC)",
            "desc": "Short-term credit limits for crops and expenses with subsidized interest.",
            "eligibility": ["Individual/Joint borrowers who are cultivators"],
            "documents": ["Aadhaar/PAN", "Land documents", "Recent passport photo"],
            "helpline": "1800-115-526",
            "link": "https://www.myscheme.gov.in/schemes/kcc"
        },
        {
            "id": "pmksy",
            "title": "Pradhan Mantri Krishi Sinchayee Yojana",
            "desc": "Subsidies for installing drip and sprinkler irrigation systems.",
            "eligibility": ["All farmers", "Priority to small and marginal farmers"],
            "documents": ["Aadhaar Card", "Land records", "Quotation from registered dealer"],
            "helpline": "Contact your Local Agriculture Office",
            "link": "https://pmksy.gov.in/"
        }
    ]

import random

# In-memory store for OTPs (In production, use Redis or a Database)
otp_store = {}

class OTPRequest(BaseModel):
    contact: str

class OTPVerify(BaseModel):
    contact: str
    otp: str

@app.post("/api/auth/send-otp")
def send_otp(req: OTPRequest):
    otp = str(random.randint(1000, 9999))
    otp_store[req.contact] = otp

    if OTP_DEV_API_KEY and OTP_DEV_API_KEY != "PASTE_YOUR_API_KEY_HERE":
        try:
            # Ensure phone has country code
            phone = req.contact.strip()
            if not phone.startswith("+"):
                phone = "+91" + phone  # Default India country code

            response = requests.post(
                "https://api.otp.dev/v1/verifications",
                headers={
                    "X-OTP-Key": OTP_DEV_API_KEY,
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                json={
                    "data": {
                        "channel": "sms",
                        "sender": "KrishiSetu",
                        "phone": phone,
                        "code": otp,
                        "code_length": 4
                    }
                },
                timeout=3
            )
            result = response.json()
            print("otp.dev response:", result)

            # otp.dev returns 201 on success
            if response.status_code in [200, 201]:
                return {"message": "OTP sent via SMS", "success": True}
            else:
                print("otp.dev failed:", result)
                return {"message": "SMS failed, use test OTP", "success": True, "test_otp": otp}
        except Exception as e:
            print("otp.dev exception:", str(e))
            return {"message": "SMS error, use test OTP", "success": True, "test_otp": otp}
    else:
        print(f"\n{'='*40}\nTESTING MODE OTP\nContact: {req.contact}\nOTP: {otp}\n{'='*40}\n")
        return {"message": "OTP generated (testing mode)", "success": True, "test_otp": otp}

@app.post("/api/auth/verify-otp")
def verify_otp(req: OTPVerify):
    stored_otp = otp_store.get(req.contact)
    if stored_otp and stored_otp == req.otp:
        del otp_store[req.contact]
        return {"message": "OTP verified successfully", "success": True, "token": "fake-jwt-token-123"}
    
    return {"message": "Invalid or expired OTP", "success": False}
