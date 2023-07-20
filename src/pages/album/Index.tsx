import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading';
import { SongType, AlbumType } from '../../types';
import MusicCard from '../../components/MusicCard';

function Album() {
  const [album, setAlbum] = useState<AlbumType>();
  const [loading, setLoading] = useState(false);
  const [onlyMusics, setOnlyMusics] = useState<SongType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      const albumMusics = await getMusics(id as string);
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
      <div>
        <h1 data-testid="artist-name">{album?.artistName}</h1>
        <h2 data-testid="album-name">{album?.collectionName}</h2>
        <img src={ album?.artworkUrl100 } alt={ `${album?.collectionName}` } />
      </div>
      <div>
        {onlyMusics.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
          />
        ))}

      </div>
    </div>
  );
}

export default Album;
