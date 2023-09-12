import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/Loading/Loading';
import Userimage from '../../../images/icon.webp';
import './profile.css';

type ProfileProps = {
  profile: UserType;
  setProfile: (profile: UserType) => void
};

function Profile({ profile, setProfile }: ProfileProps) {
  const [loading, setLoading] = useState(false);

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
    <div className="profile">
      <div className="editProfile">
        <img
          src={ profile.image === '' ? Userimage : profile.image }
          alt={ `${profile.name}` }
          data-testid="profile-image"
        />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
      <div>
        <p>Nome</p>
        <p>{profile.name}</p>
      </div>
      <div>
        <p>E-mail</p>
        <p>{profile.email}</p>
      </div>
      <div>
        <p>Descrição</p>
        <p>{profile.description}</p>
      </div>
    </div>
  );
}

export default Profile;
