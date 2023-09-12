import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/Login';
import Search from './pages/Search/Search';
import { AlbumType, SongType, UserType } from './types';
import Album from './pages/album/Index';
import Layout from './components/Layout';
import Favorites from './pages/favorites/Favorites';
import Profile from './pages/profile/Profile';
import NotFound from './pages/notFound/NotFound';
import ProfileEdit from './pages/profileEdit/ProfileEdit';
import iconImage from './images/icon.png';

function App() {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [profile, setProfile] = useState<UserType>({ name: '',
    email: '',
    image: iconImage,
    description: '' });
  const [inputValue, setInputValue] = useState<string>('');
  const [album, setAlbum] = useState<AlbumType | undefined>();
  const handleDelete = (id: number) => {
    setFavoriteSongs(favoriteSongs.filter((song) => song.trackId !== id));
  };
  return (
    <Routes>
      <Route
        path="/"
        element={ <Login /> }
      />

      <Route path="" element={ <Layout profile={ profile } /> }>
        <Route
          path="/search"
          element={ <Search
            albums={ albums }
            setAlbums={ setAlbums }
            inputValue={ inputValue }
            setInputValue={ setInputValue }
          /> }
        />
        <Route
          path="album/:id"
          element={ <Album
            handleDelete={ handleDelete }
            setAlbum={ setAlbum }
            album={ album }
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
        <Route
          path="/profile"
          element={ <Profile
            profile={ profile }
            setProfile={ setProfile }
          /> }
        />
        <Route path="/profile/edit" element={ <ProfileEdit profile={ profile } /> } />

      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
