import requests

API_KEY = "bc9d6746ce24b42dbf5e144cb0fbf01b"

def get_city_name(lat: float, lon: float) -> str:
    """Get city or district name from lat/lon using BigDataCloud + Nominatim fallback"""
    # 1. Try BigDataCloud (fast, zero quota, highly accurate for Indian villages/districts)
    try:
        url = f"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en"
        r = requests.get(url, timeout=3)
        if r.status_code == 200:
            data = r.json()
            city = data.get("locality") or data.get("city") or data.get("principalSubdivision")
            if city:
                return city
    except:
        pass

    # 2. Try Nominatim
    try:
        url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
        r = requests.get(url, headers={"User-Agent": "KrishiSetu-AgriPlatform/1.0"}, timeout=3)
        if r.status_code == 200:
            data = r.json()
            addr = data.get("address", {})
            return (addr.get("city") or addr.get("town") or 
                    addr.get("village") or addr.get("county") or addr.get("state_district") or "Your Location")
    except:
        pass
    return "Your Location"

def get_weather(lat: float, lon: float):
    # Using Open-Meteo for real-time current weather (No API Key Required!)
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto"
    r = requests.get(url, timeout=5)
    if r.status_code != 200:
        # Fallback fake data if internet is down so frontend doesn't crash
        return {"temperature": 32, "humidity": 65, "weather": "Sunny", "wind_speed": 10, "city": "Farm", "lat": lat, "lon": lon}
    
    data = r.json()
    current = data.get("current", {})
    
    code = current.get("weather_code", 0)
    desc = "Clear"
    if code <= 3: desc = "Cloudy"
    if code > 3 and code <= 67: desc = "Rain"
    if code > 67: desc = "Heavy Rain"
    
    return {
        "temperature": current.get("temperature_2m", 32),
        "humidity": current.get("relative_humidity_2m", 65),
        "weather": desc,
        "wind_speed": current.get("wind_speed_10m", 10),
        "city": get_city_name(lat, lon),
        "lat": lat,
        "lon": lon
    }

def get_weather_by_city(city_name: str):
    """Search city via Open-Meteo Geocoding and fetch weather"""
    city_name = city_name.strip()
    try:
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city_name}&count=1&language=en&format=json"
        r = requests.get(geo_url, timeout=4)
        if r.status_code == 200:
            results = r.json().get("results", [])
            if results:
                match = results[0]
                lat = match.get("latitude")
                lon = match.get("longitude")
                display_name = match.get("name")
                admin1 = match.get("admin1", "")
                full_name = f"{display_name}, {admin1}" if admin1 else display_name
                weather_info = get_weather(lat, lon)
                weather_info["city"] = full_name
                return weather_info
    except Exception as e:
        print("Geocoding failed:", e)
    # Default fallback to 19.9975, 73.7898
    w = get_weather(19.9975, 73.7898)
    w["city"] = city_name.capitalize()
    return w

def get_forecast(lat: float, lon: float):
    # Using Open-Meteo for the 7-day daily forecast since OpenWeatherMap's free tier only supports 5-day/3-hour.
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto"
    r = requests.get(url)
    if r.status_code != 200:
        raise Exception(f"Forecast API error: {r.text}")
    data = r.json()
    
    daily = data["daily"]
    forecast = []
    
    # Map WMO weather codes to simple text/icons
    def get_icon(code: int):
        if code == 0: return '☀️'
        if code <= 3: return '🌤️'
        if code <= 67: return '🌧️'
        return '☁️'
        
    for i in range(len(daily["time"])):
        forecast.append({
            "date": daily["time"][i],
            "max_temp": daily["temperature_2m_max"][i],
            "min_temp": daily["temperature_2m_min"][i],
            "icon": get_icon(daily["weather_code"][i])
        })
        
    return forecast
