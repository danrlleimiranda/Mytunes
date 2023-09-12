import { useEffect, useState } from 'react';
import checkedHeart from '../../images/checked_heart.png';
import emptyHeart from '../../images/empty_heart.png';
import './musicCard.css';
import { addSong, removeSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';

type MusicCardProp = {
  previewUrl: string
  trackName: string
  trackId: number
  handleDelete: (trackId: number) => void
};

function MusicCard({ previewUrl, trackName, trackId,
  handleDelete }: MusicCardProp) {
  const [checked, setChecked] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleClick = () => {
    if (!checked) {
      addSong({ previewUrl,
        trackName,
        trackId });
    } else {
      removeSong({ previewUrl,
        trackName,
        trackId });
      handleDelete(trackId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getFavoriteSongs();
      const favoriteSongs = response.map((song) => song.trackId);
      setLoading(false);
      if (favoriteSongs.includes(trackId)) {
        setChecked(true);
      }
    };
    fetchData();
  }, [trackId]);

  if (loading) {
    return (
      <div className="loading-status">
        <p>Carregando...</p>
      </div>
    );
  }
  return (
    <div className="song-card">
      <div>
        <p>{trackName}</p>
      </div>

      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
      </audio>
      <div className="song">
        <label htmlFor={ `${trackId}` } data-testid={ `checkbox-music-${trackId}` }>
          {checked ? <img src={ checkedHeart } alt="favorite" />
            : <img src={ emptyHeart } alt="favorite" />}
          <input
            type="checkbox"
            id={ `${trackId}` }
            checked={ checked }
            onChange={ handleChange }
            className="checks"
            name="musics"
            onClick={ handleClick }
          />

        </label>
      </div>

    </div>
  );
}

export default MusicCard;
