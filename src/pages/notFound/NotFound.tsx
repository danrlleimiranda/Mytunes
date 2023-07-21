import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <h1>
      Página não encontrada, retorne para a
      {' '}
      <Link to="/search"> página de pesquisa</Link>
    </h1>
  );
}

export default NotFound;
