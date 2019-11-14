import React from 'react';
import './LoadingIcon.less';

export const LoadingIcon = () => (
  <div className="t4t-loading-icon-container">
    <div className="loading-text">F E T C H I N G</div>
    <div className="loading-animation">
      <div className="loading-contents">
        <div className="dots">.</div>
        <div className="dots">.</div>
        <div className="dots">.</div>
        <div className="dots">.</div>
      </div>
    </div>
  </div>
);

export default LoadingIcon;