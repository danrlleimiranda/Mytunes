import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/Login';
import Search from './pages/Search/Search';
import { AlbumType } from './types';
import Album from './pages/album/Index';

function App() {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  return (
    <Routes>
      <Route
        path="/"
        element={ <Login /> }
      />
      <Route path="/album/:id" element={ <Album /> } />
      <Route
        path="/search"
        element={ <Search albums={ albums } setAlbums={ setAlbums } /> }
      />
    </Routes>
  );
}

export default App;
