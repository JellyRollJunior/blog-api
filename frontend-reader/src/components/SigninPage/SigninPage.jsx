import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SigninPage.module.css';
import sharedStyles from '../../styles/sharedStyles.module.css';
import { postRequest } from '../../api/api.js';

const SigninPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    try {
      // Request token and save to local storage
      event.preventDefault();
      const body = { username, password };
      setLoading(true);
      const request = await postRequest('/auth/login', body, null, {
        'Content-Type': 'application/json',
      });
      console.log(request);
      localStorage.setItem('token', request.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <h1>The Chiikawa Chronicle</h1>
        <p>なんか小さくてかわいいやつ</p>
        <hr />
      </header>
      <main>
        <div className={sharedStyles.formCard}>
          <h2 className={sharedStyles.cardTitle}>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className={sharedStyles.cardLabel}>
              Username:
            </label>
            <input
              className={sharedStyles.cardInput}
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <label htmlFor="password" className={sharedStyles.cardLabel}>
              Password:
            </label>
            <input
              className={sharedStyles.cardInput}
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <button className={sharedStyles.cardSubmitButton}>Sign in</button>
          </form>
          <h4 className={styles.signup}>
            Don't have an account? <Link to="signup">Sign up</Link>
          </h4>
        </div>
      </main>
    </>
  );
};

export { SigninPage };
