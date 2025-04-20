import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '../../api/api.js';
import { Header } from '../Header/Header.jsx';
import { ReturnHomeButton } from '../ReturnHomeButton/ReturnHomeButton.jsx';
import { Footer } from '../Footer/Footer.jsx';
import shared from '../../styles/shared.module.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // check passwords match
    if (password != confirmPass) {
      setError('Passwords must match.');
      return;
    }
    // handle signup fetch
    setLoading(true);
    try {
      const body = { username, password };
      const response = await postRequest('/users', body, null, {
        'Content-Type': 'application/json',
      });
      console.log(response);
      setError(null);
      navigate('/signin');
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header>
        <Link to="/">
          <button className={shared.navButton}>Main</button>
        </Link>
      </Header>
      <main>
        <div className={shared.formCard}>
          <h2 className={shared.cardTitle}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {loading && <h4 className={shared.centerAlign}>Authenticating...</h4>}
            {error && <h4 className={`${shared.error} ${shared.centerAlign}`}>{error}</h4>}
            <label htmlFor="username" className={shared.cardLabel}>
              Username:
            </label>
            <input
              className={shared.cardInput}
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              minLength="6"
              maxLength="24"
              required
            />
            <label htmlFor="password" className={shared.cardLabel}>
              Password:
            </label>
            <input
              className={shared.cardInput}
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength="6"
              maxLength="24"
              required
            />
            <label htmlFor="confirmPass" className={shared.cardLabel}>
              Confirm Password:
            </label>
            <input
              className={shared.cardInput}
              type="password"
              id="confirmPass"
              value={confirmPass}
              onChange={(event) => setConfirmPass(event.target.value)}
              minLength="6"
              maxLength="24"
              required
            />
            <button className={shared.cardSubmitButton}>Sign up</button>
          </form>
          <div className={shared.marginTopMedium}>
            <ReturnHomeButton />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export { SignupPage };
