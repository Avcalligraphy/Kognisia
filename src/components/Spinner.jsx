import React from "react";
import "../style.css";

function Spinner() {
  return (
    <div className="spinner-container">
      <svg
        className="spinner"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#333"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="56.55"
          strokeDashoffset="14.14"
        />
      </svg>
    </div>
  );
}

export default Spinner;

