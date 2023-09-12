import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading/Loading';
import { SongType, AlbumType, MusicType } from '../../types';
import MusicCard from '../../components/musicCard/MusicCard';
import './album.css';

export type AlbumProps = {
  handleDelete:(trackId: number) => void;
  album: AlbumType | undefined;
  setAlbum: (albumData: AlbumType) => void
};

function Album({ handleDelete, album, setAlbum }: AlbumProps) {
  const [loading, setLoading] = useState(false);
  const [onlyMusics, setOnlyMusics] = useState<SongType[] | MusicType[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      const albumMusics = await getMusics(id as string);
      console.log(albumMusics);
      const [albumData, ...musicListData] = albumMusics;
      setAlbum(albumData);
      setOnlyMusics(musicListData);
      setLoading(false);
    };
    fetchMusic();
  }, [id]);

  if (loading) return (<Loading />);

  return (
    <div>
      <div className="album-card">
        <img src={ album?.artworkUrl100 } alt={ `${album?.collectionName}` } />
        <div>
          <h2 data-testid="artist-name">{album?.artistName}</h2>
          <p data-testid="album-name">{album?.collectionName}</p>
        </div>
      </div>
      <div className="songs-list">
        {onlyMusics.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            handleDelete={ handleDelete }
          />
        ))}

      </div>
    </div>
  );
}

export default Album;
