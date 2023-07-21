import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/Loading';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserType>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getUser();
      setProfile(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (<Loading />);
  }
  return (
    <div>
      <Link to="/profile/edit">Editar perfil</Link>
      <img
        src={ profile?.image }
        alt={ `${profile?.name}` }
        data-testid="profile-image"
      />
      <div>
        <p>Nome</p>
        <p>{profile?.name}</p>
      </div>
      <div>
        <p>E-mail</p>
        <p>{profile?.email}</p>
      </div>
      <div>
        <p>Descrição</p>
        <p>{profile?.description}</p>
      </div>
      Profile

    </div>
  );
}

export default Profile;
