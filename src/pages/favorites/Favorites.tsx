import { useEffect, useState } from 'react';
import MusicCard from '../../components/MusicCard';
import { SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading';

type FavoriteProps = {
  favoriteSongs: SongType[]
  setFavoriteSongs: (favoritesList: SongType[]) => void
  handleDelete: (trackId: number) => void
};

function Favorites({ favoriteSongs, setFavoriteSongs, handleDelete }: FavoriteProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const favorites = await getFavoriteSongs();
      setFavoriteSongs(favorites);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      {favoriteSongs.map((song) => (<MusicCard
        key={ song.trackId }
        previewUrl={ song.previewUrl }
        trackName={ song.trackName }
        trackId={ song.trackId }
        handleDelete={ handleDelete }
      />))}
    </div>
  );
}

export default Favorites;
