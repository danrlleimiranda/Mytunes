import React from 'react';
import { ClipLoader } from 'react-spinners';
import './loading.css';

function Loading() {
  return (
    <div className="loading">
      <ClipLoader color="rgba(0, 128, 0, 1)" />
      <h1>
        Carregando...
      </h1>
    </div>
  );
}

export default Loading;
