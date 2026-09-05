import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [N, setN] = useState('');
  const [P, setP] = useState('');
  const [K, setK] = useState('');
  const [temperature, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [ph, setPH] = useState('');
  const [rainfall, setRainfall] = useState('');

  type Recommendation = {
    crop: string;
    score: number;
    expected_yield: number;
    market_price: number;
    expected_profit: number;
  };

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    setError(null);
    try {
      const response = await axios.post('http://192.168.31.127:8000/recommend', {
        N: parseFloat(N),
        P: parseFloat(P),
        K: parseFloat(K),
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        ph: parseFloat(ph),
        rainfall: parseFloat(rainfall),
      });
      setRecommendations(response.data.recommendations);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch recommendations. Please check your backend or network.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🌱 Enter Soil & Weather Data</Text>

      <TextInput style={styles.input} placeholder="N" value={N} onChangeText={setN} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="P" value={P} onChangeText={setP} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="K" value={K} onChangeText={setK} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Temperature" value={temperature} onChangeText={setTemp} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Humidity" value={humidity} onChangeText={setHumidity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="pH" value={ph} onChangeText={setPH} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Rainfall" value={rainfall} onChangeText={setRainfall} keyboardType="numeric" />

      <Button title="Get Recommendations" onPress={getRecommendations} />

      {error && <Text style={styles.error}>{error}</Text>}

      {recommendations.map((rec, index) => (
        <View key={index} style={styles.result}>
          <Text style={styles.resultText}>🌾 Crop: {rec.crop}</Text>
          <Text>Score: {rec.score.toFixed(4)}</Text>
          <Text>Expected Yield: {rec.expected_yield}</Text>
          <Text>Market Price: ₹{rec.market_price}</Text>
          <Text>Expected Profit: ₹{rec.expected_profit.toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eef',
    borderRadius: 8,
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});
