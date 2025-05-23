import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>No data submitted. <button onClick={() => navigate("/")}>Go back</button></p>;
  }

  return (
    <div className="summary">
      <h2>Submission Successful</h2>
      <ul>
        {Object.entries(state).map(([key, val]) => (
          <li key={key}><strong>{key}:</strong> {val.toString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default SuccessPage;
