
import streamlit as st
import joblib, json
import numpy as np

st.set_page_config(page_title="AI Crop Recommender", layout="centered")

st.title("🌱 AI-based Crop Recommendation (Demo)")
st.write("Enter soil & weather values to get top crop suggestions. (Demo model with synthetic data)")

clf = joblib.load("model/model.joblib")
le = joblib.load("model/label_encoder.joblib")
with open("model/feature_order.json") as f:
    FEATURES = json.load(f)

cols = st.columns(2)
N = cols[0].number_input("Nitrogen (N)", 0.0, 200.0, 80.0, 1.0)
P = cols[1].number_input("Phosphorus (P)", 0.0, 200.0, 50.0, 1.0)
K = cols[0].number_input("Potassium (K)", 0.0, 200.0, 40.0, 1.0)
temperature = cols[1].number_input("Temperature (°C)", 0.0, 50.0, 26.0, 0.1)
humidity = cols[0].number_input("Humidity (%)", 0.0, 100.0, 70.0, 0.1)
ph = cols[1].number_input("Soil pH", 3.5, 9.5, 6.5, 0.1)
rainfall = cols[0].number_input("Rainfall (mm)", 0.0, 500.0, 120.0, 0.1)

x = np.array([[N,P,K,temperature,humidity,ph,rainfall]], dtype=float)

if st.button("Recommend Crops"):
    probs = clf.predict_proba(x)[0]
    idxs = np.argsort(probs)[::-1][:3]
    labels = le.inverse_transform(idxs)
    st.subheader("Top Recommendations")
    for rank, (i, lbl) in enumerate(zip(idxs, labels), start=1):
        st.write(f"**{rank}. {lbl}** — score: {probs[i]:.3f}")
