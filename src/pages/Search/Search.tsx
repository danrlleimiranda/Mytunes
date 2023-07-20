import React, { useEffect, useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import Loading from '../../components/Loading';
import AlbumCreate from '../../components/AlbumCreate';
import './search.css';

type SearchProps = {
  albums: AlbumType[] | null;
  setAlbums: (albums: AlbumType[]) => void
};

function Search({ albums, setAlbums }: SearchProps) {
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isAlbum, setIsAlbum] = useState<boolean>(true);

  function isValid() {
    return formValue.length < 2;
  }
  useEffect(() => {
    const fetchData = async () => {

    };
    fetchData();
  }, [formValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFormValue(
      target.value,
    );
  };

  const handleSubmit = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    const albumsList = await searchAlbumsAPI(formValue);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    if (albumsList.length > 0) {
      setAlbums([...albumsList]);
      setIsAlbum(true);
    } else {
      setAlbums([]);
      setIsAlbum(false);
    }
    setInputValue(formValue);
    setFormValue('');
  };

  if (loading) {
    return (<Loading />);
  }

  return (
    <>
      <div className="search-container">
        <form className="form-search">
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              id="search"
              data-testid="search-artist-input"
              value={ formValue }
              className="input-search"
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isValid() }
            className="button-search"
            onClick={ (event) => handleSubmit(event) }
          >
            Pesquisar

          </button>
        </form>

      </div>
      {albums !== null && albums.length > 0
      && <p>{`Resultado de álbuns de: ${inputValue} `}</p>}
      <div className="album-list">
        {!isAlbum && <h1>Nenhum álbum foi encontrado</h1>}
        {isAlbum && albums !== null && albums.map((album) => (
          <AlbumCreate
            key={ album.collectionId }
            album={ album }
          />
        ))}
      </div>
    </>
  );
}

export default Search;
