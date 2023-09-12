import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/Loading/Loading';
import Userimage from '../../images/icon.png';
import './profileEdit.css';

type ProfileEditProps = {
  profile: UserType
};

function ProfileEdit({ profile }: ProfileEditProps) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserType>(profile);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getUser();
      setUserData(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (<Loading />);
  }

  function isValid() {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (userData) {
      const emailValid = regexEmail.test(userData.email);
      if (userData.name.length < 3
        || userData.email.length === 0
        || emailValid === false) {
        return true;
      }
    }
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>) {
    const { target } = event;
    if (userData) {
      setUserData({ ...userData, [target.id]: target.value });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (userData) {
      await updateUser(userData);
    }
    navigate('/profile');
  }

  return (
    <form action="" className="form-edit" onSubmit={ (event) => handleSubmit(event) }>
      <label htmlFor="image" className="edit-image">
        <img
          src={ userData.image === '' ? Userimage
            : userData.image }
          alt="foto do perfil"
        />
        <input
          id="image"
          type="text"
          value={ userData.image }
          data-testid="edit-input-image"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="name">
        Nome
        <p>Você pode usar um nome social se preferir.</p>
        <input
          id="name"
          className="name"
          type="text"
          data-testid="edit-input-name"
          value={ userData.name }
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="email">
        E-mail
        <p>Utilize um email que seja checado diariamente.</p>
        <input
          id="email"
          type="text"
          className="name"
          data-testid="edit-input-email"
          value={ userData.email }
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="description">
        Descrição
        <br />
        <textarea
          name=""
          id="description"
          cols={ 45 }
          rows={ 5 }
          data-testid="edit-input-description"
          value={ userData.description }
          onChange={ (event) => handleChange(event) }
        />
      </label>

      <button
        data-testid="edit-button-save"
        type="submit"
        disabled={ isValid() }
      >
        Editar perfil

      </button>
    </form>
  );
}

export default ProfileEdit;
