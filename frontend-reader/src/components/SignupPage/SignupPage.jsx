import { Link } from 'react-router-dom';
import { Header } from '../Header/Header.jsx';
import shared from '../../styles/shared.module.css';
import { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

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
          <form>
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
            <label htmlFor="confirmPass" className={shared.cardLabel}>
              Confirm Password:
            </label>
            <input
              className={shared.cardInput}
              type="password"
              id="confirmPass"
              value={confirmPass}
              onChange={(event) => setConfirmPass(event.target.value)}
              required
            />
            <button className={shared.cardSubmitButton}>Sign up</button>
          </form>
        </div>
      </main>
    </>
  );
};

export { SignupPage };
