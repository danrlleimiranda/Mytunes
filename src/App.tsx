import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/Login';
import Search from './pages/Search/Search';
import { AlbumType } from './types';
import Album from './pages/album/Index';
import Layout from './components/Layout';
import Favorites from './pages/favorites/Favorites';

function App() {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  return (
    <Routes>
      <Route
        path="/"
        element={ <Login /> }
      />

      <Route path="" element={ <Layout /> }>
        <Route
          path="/search"
          element={ <Search albums={ albums } setAlbums={ setAlbums } /> }
        />
        <Route path="album/:id" element={ <Album /> } />
        <Route path="favorites" element={ <Favorites /> } />

      </Route>
    </Routes>
  );
}

export default App;
