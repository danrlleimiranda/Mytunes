import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type AlbumProps = {
  album: AlbumType

};
function Album({ album }: AlbumProps) {
  return (
    <Link
      to={ `/album/${album.collectionId}` }
      data-testid={ `link-to-album-${album.collectionId}` }
    >
      <div>
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <h3>{album.collectionName}</h3>
        <p>{album.artistName}</p>
      </div>
    </Link>
  );
}

export default Album;
