import React from 'react';
import './css/body-blackout-style.css';
const BodyBlackoutStyle = ({ modalGiveScrubChange }) => {
    return (
      <div
        className="body-blackout-style"
        onClick={() => modalGiveScrubChange(false)}
      ></div>
    );
  };

export default BodyBlackoutStyle;