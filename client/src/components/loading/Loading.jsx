import React from 'react'

import './Loading.scss';

function Loading() {
  return (
      <div className="loading">
          <div className="loading__anime-wrap">
              <span className="loading__anime-text">Loading</span>
              <svg className="loading__anime">
                  <circle className="loading__anime-circle" cx="50%" cy="50%" r="40" fill="none" />
              </svg>
          </div>
      </div>
  );
}

export default Loading