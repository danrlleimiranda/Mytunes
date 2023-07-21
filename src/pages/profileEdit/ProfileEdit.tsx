import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/Loading';

function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserType>();

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
      console.log(userData);
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
    <form action="" onSubmit={ (event) => handleSubmit(event) }>
      <label htmlFor="image">
        <img src={ userData?.image } alt="" />
        <input
          id="image"
          type="text"
          value={ userData?.image }
          data-testid="edit-input-image"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          type="text"
          data-testid="edit-input-name"
          value={ userData?.name }
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="email">
        E-mail
        <input
          id="email"
          type="text"
          data-testid="edit-input-email"
          value={ userData?.email }
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="description">
        Descrição
        <textarea
          name=""
          id="description"
          cols={ 30 }
          rows={ 10 }
          data-testid="edit-input-description"
          value={ userData?.description }
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
