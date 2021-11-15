import React from 'react';
import './body-blackout-style.scss';

const BodyBlackoutStyle = ({ modalGiveScrubChange }) => {
    return (
      <div
        className="body-blackout-style"
        onClick={() => modalGiveScrubChange(false)}
      ></div>
    );
  };

export default BodyBlackoutStyle;