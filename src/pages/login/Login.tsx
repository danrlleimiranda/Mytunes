import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import './login.css';
import Loading from '../../components/Loading';

function Login() {
  const initialFormValue = { name: '' };

  const [formValue, setFormValue] = useState(initialFormValue);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function isValid() {
    return formValue.name.length < 3;
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    await createUser(formValue);
  };

  const { name } = formValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFormValue(
      { name: target.value },
    );
  };

  if (loading) {
    return (<Loading />);
  }

  return (
    <div className="login-container">

      <form className="form-login">
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            name="name"
            value={ name }
            data-testid="login-name-input"
            className="input-login"
            placeholder="Digite seu login"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <button
          type="submit"
          disabled={ isValid() }
          data-testid="login-submit-button"
          className="button-login"
          onClick={ (event) => {
            handleSubmit(event);
            setLoading(true);
            setTimeout(() => {
              navigate('/search');
              setLoading(false);
            }, 2500);
          } }
        >
          Entrar

        </button>
      </form>
    </div>

  );
}

export default Login;
