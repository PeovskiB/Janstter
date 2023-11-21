import React from 'react';

interface PredictionResultProps {
  prediction: string;
  chance: number | null;
  loading: boolean;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, chance, loading }) => {
  const getProgressBarColor = () => {
    const hue = (1 - (chance ?? 0)) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <div className="mt-4">
      {loading ? (
        // Loading Spinner
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // Prediction Result
        <div className="text-center">
          <h1>{prediction}</h1>

          {/* Bootstrap Progress Bar */}
          <div className="progress" style={{ height: '40px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${chance ? chance * 100 : 0}%`,
                backgroundColor: getProgressBarColor(),
                color: '#000000',
              }}
              aria-valuenow={chance ? chance * 100 : 0}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <h4>{Math.round((chance ?? 0) * 100)}%</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionResult;
