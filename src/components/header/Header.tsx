import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import './header.css';
import { UserType } from '../../types';
import trybeTunesLogo from '../../images/trybetunes.png';
import Userimage from '../../images/icon.png';

type HeaderProps = {
  profile: UserType
};

function Header({ profile }: HeaderProps) {
  const [user, setUser] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getUser();
      setUser(response.name);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <header data-testid="header-component">
      <div className="link">
        <img src={ trybeTunesLogo } alt="" className="logo" />
        <Link to="/profile">
          <div className="user">
            <img
              src={ profile.image === ''
                ? Userimage : profile.image }
              alt={ ` foto de ${profile?.name}` }
            />
            {loading
              ? <p>Carregando...</p>
              : <p data-testid="header-user-name">{user}</p>}

          </div>
        </Link>

      </div>
      <div className="links">
        <NavLink to="/search" data-testid="link-to-search">
          Pesquisar
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favoritos
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Perfil
        </NavLink>
      </div>

    </header>
  );
}

export default Header;
