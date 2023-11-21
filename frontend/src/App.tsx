import React, { useState, ChangeEvent, useEffect } from 'react';
import InputForm from './InputForm';
import PredictionResult from './PredictionResult';
import CaseCard from './CaseCard';

interface CaseCardProps {
  title: string;
  violation: boolean;
  link: string;
}

interface PredictionResponse {
  prediction: string;
  chance: number;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');
  const [chance, setChance] = useState<number | null>(null);
  const [predictionLoading, setPredictionLoading] = useState<boolean>(false);
  const [similarCases, setSimilarCases] = useState<CaseCardProps[]>([]);
  const [similarCasesLoading, setSimilarCasesLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const fetchPrediction = async () => {
    try {
      setPredictionLoading(true);

      const predictionResponse = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });

      if (!predictionResponse.ok) {
        throw new Error('Network response for prediction was not ok');
      }

      const predictionData: PredictionResponse = await predictionResponse.json();

      setPrediction(predictionData.prediction);
      setChance(predictionData.chance);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setPredictionLoading(false);
    }
  };

  const fetchSimilarCases = async () => {
    try {
      setSimilarCasesLoading(true);

      const similarCasesResponse = await fetch('http://127.0.0.1:8000/findSimmilar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* Data if required */ }),
      });

      if (!similarCasesResponse.ok) {
        throw new Error('Network response for similar cases was not ok');
      }

      const similarCasesData = await similarCasesResponse.json();

      setSimilarCases(similarCasesData.court_cases);
    } catch (error) {
      console.error('Error fetching similar cases:', error);
    } finally {
      setSimilarCasesLoading(false);
    }
  };

  const handleSubmit = () => {
    // Call both fetch functions independently
    fetchPrediction();
    fetchSimilarCases();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Hello World</h1>
      <div className="row">
        <div className="col-md-8">
          {/* Include InputForm component */}
          <InputForm onInputChange={handleInputChange} onSubmit={handleSubmit} />

          {/* Conditional rendering for PredictionResult */}
          {predictionLoading ? (
            // Loading Spinner for prediction
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            // Display PredictionResult only if prediction is available
            prediction !== '' && (
              <PredictionResult prediction={prediction} chance={chance} loading={predictionLoading} />
            )
          )}
        </div>

        <div className="col-md-4">
          {similarCasesLoading ? (
            // Loading Spinner for similar cases
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            // Display similar cases using CaseCard component
            similarCases.map((caseData, index) => (
              <CaseCard key={index} title={caseData.title} violation={caseData.violation} link={caseData.link} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;