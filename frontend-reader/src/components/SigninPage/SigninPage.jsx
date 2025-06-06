import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../api/api.js';
import { Header } from '../Header/Header.jsx';
import { ReturnHomeButton } from '../ReturnHomeButton/ReturnHomeButton.jsx';
import { Footer } from '../Footer/Footer.jsx';
import styles from './SigninPage.module.css';
import shared from '../../styles/shared.module.css';

const SigninPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Request token and save to local storage
      const body = { username, password };
      const request = await postRequest('/auth/login', body, null, {
        'Content-Type': 'application/json',
      });
      console.log(request);
      localStorage.setItem('token', request.token);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header>
        <Link to='/'>
          <button className={shared.navButton}>Main</button>
        </Link>
      </Header>
      <main>
        <div className={shared.formCard}>
          <h2 className={shared.cardTitle}>Sign In</h2>
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
              required
            />
            <button className={shared.cardSubmitButton}>Sign in</button>
          </form>
          <h4 className={styles.signup}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </h4>
          <ReturnHomeButton />
        </div>
      </main>
      <Footer />
    </>
  );
};

export { SigninPage };
