import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/Login';
import Search from './pages/Search/Search';
import { AlbumType, SongType } from './types';
import Album from './pages/album/Index';
import Layout from './components/Layout';
import Favorites from './pages/favorites/Favorites';
import Profile from './pages/profile/Profile';
import NotFound from './pages/notFound/NotFound';
import ProfileEdit from './pages/profileEdit/ProfileEdit';

function App() {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  const handleDelete = (id: number) => {
    setFavoriteSongs(favoriteSongs.filter((song) => song.trackId !== id));
  };
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
        <Route
          path="album/:id"
          element={ <Album
            handleDelete={ handleDelete }
          /> }
        />
        <Route
          path="favorites"
          element={ <Favorites
            favoriteSongs={ favoriteSongs }
            setFavoriteSongs={ setFavoriteSongs }
            handleDelete={ handleDelete }
          /> }
        />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />

      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
