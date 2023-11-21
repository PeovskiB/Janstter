import React, { ChangeEvent } from 'react';

const InputForm: React.FC<{ onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, onSubmit: () => void }> = ({ onInputChange, onSubmit }) => (
  <div>
    <div className="form-group">
      <textarea
        className="form-control"
        placeholder="Enter the case..."
        onChange={onInputChange}
        rows={14} // Set the number of visible rows
      />
    </div>
    <div className="text-center">
      <button
        className="btn btn-primary btn-lg"
        type="button"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
    
  </div>
);

export default InputForm;
