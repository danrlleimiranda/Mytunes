import { useState } from 'react';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import './musicCard.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

type MusicCardProp = {
  previewUrl: string
  trackName: string
  trackId: number
};

function MusicCard({ previewUrl, trackName, trackId }: MusicCardProp) {
  const [checked, setChecked] = useState<boolean>();

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
    }
  };
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
      </audio>
      <label htmlFor={ `${trackId}` } data-testid={ `checkbox-music-${trackId}` }>
        {checked ? (<img src={ checkedHeart } alt="favorite" />)
          : (<img src={ emptyHeart } alt="favorite" />)}
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
  );
}

export default MusicCard;
