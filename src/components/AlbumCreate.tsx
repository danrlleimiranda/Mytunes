import { Link } from 'react-router-dom';
import { AlbumType } from '../types';
import './albumCreate.css';

type AlbumProps = {
  album: AlbumType

};
function AlbumCreate({ album }: AlbumProps) {
  return (
    <Link
      to={ `/album/${album.collectionId}` }
      data-testid={ `link-to-album-${album.collectionId}` }
    >
      <div className="music-card">
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <h3>{album.collectionName}</h3>
        <p>{album.artistName}</p>
      </div>
    </Link>
  );
}

export default AlbumCreate;
