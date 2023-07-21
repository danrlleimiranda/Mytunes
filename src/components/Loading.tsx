import React from 'react';
import { ClipLoader } from 'react-spinners';

function Loading() {
  return (
    <div>
      <ClipLoader color="rgba(54, 215, 183, 1)" />
      <h1>
        Carregando...
      </h1>
    </div>
  );
}

export default Loading;
