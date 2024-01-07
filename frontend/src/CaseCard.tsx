import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

interface CaseCardProps {
  title: string;
  violation: boolean;
  link: string;
  violations?: string | number[];
  nonViolations?: string | number[];
}

const CaseCard: React.FC<CaseCardProps> = ({ title, violation, link, violations, nonViolations = [] }) => {
  const parsedViolations: number[] = Array.isArray(violations) ? violations : parseNumbers(violations);
  const parsedNonViolations: number[] = Array.isArray(nonViolations) ? nonViolations : parseNumbers(nonViolations);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Outcome: {!violation ? 'Violation' : 'Non-Violation'}</p>
        <div className="d-flex">
          {parsedViolations.length > 0 && (
            <div className="mr-2">
              {parsedViolations.map((violation, index) => (
                <Badge key={index} bg="danger" className="mr-1" style={{ fontSize: '1.2rem', margin: '2px' }}>
                  {violation}
                </Badge>
              ))}
            </div>
          )}
          {parsedNonViolations.length > 0 && (
            <div className="mr-2">
              {parsedNonViolations.map((nonViolation, index) => (
                <Badge key={index} bg="success" className="mr-1" style={{ fontSize: '1.2rem', margin: '2px' }}>
                  {nonViolation}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Button variant="primary" href={link} target="_blank" rel="noopener noreferrer">
          View Case
        </Button>
      </div>
    </div>
  );
};

// Helper function to parse numbers from JSON array string or return an empty array
const parseNumbers = (value?: string | number[]): number[] => {
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'number' ? v : parseInt(v, 10))).filter((v) => !isNaN(v));
  }
  if (typeof value === 'string') {
    try {
      const parsedValue = JSON.parse(value);
      // Ensure parsedValue is an array before mapping over it
      return Array.isArray(parsedValue) ? parsedValue.map(Number).filter(Number.isFinite) : [];
    } catch (error) {
      console.error('Error parsing value:', error);
      return [];
    }
  }
  return [];
};

export default CaseCard;
