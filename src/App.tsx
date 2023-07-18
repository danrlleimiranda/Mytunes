import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './login/Login';
import Search from './Search/Search';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={ <Login /> }
      />
      <Route path="/search" element={ <Search /> } />
    </Routes>
  );
}

export default App;
