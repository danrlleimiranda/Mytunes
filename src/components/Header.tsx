import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';

function Header() {
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
      <NavLink to="/search" data-testid="link-to-search">
        Pesquisar
      </NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">
        Favoritos
      </NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">
        Perfil
      </NavLink>
      {loading ? <span>Carregando...</span>
        : <p data-testid="header-user-name">{user}</p>}

    </header>
  );
}

export default Header;
