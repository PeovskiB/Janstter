import React, { useState, ChangeEvent } from 'react';
import InputForm from './InputForm';
import PredictionResult from './PredictionResult';

interface PredictionResponse {
  prediction: string;
  chance: number;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');
  const [chance, setChance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Set loading to true before making the request
      setLoading(true);

      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: PredictionResponse = await response.json();

      setPrediction(data.prediction);
      setChance(data.chance);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Set loading back to false after the request completes
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Hello World</h1>
      <div className="row">
        <div className="col-md-8">
          <InputForm onInputChange={handleInputChange} onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-8">
          <PredictionResult prediction={prediction} chance={chance} loading={loading} /> {/* Pass loading prop */}
        </div>
      </div>
    </div>
  );
};

export default App;
