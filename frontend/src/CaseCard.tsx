import React from 'react';

interface CaseCardProps {
  title: string;
  violation: boolean;
  link: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ title, violation, link }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">Violation: {violation ? 'Yes' : 'No'}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        View Case
      </a>
    </div>
  </div>
);

export default CaseCard;
