import { Link } from 'react-router-dom';
import { Header } from '../Header/Header.jsx';
import shared from '../../styles/shared.module.css';

const SignupPage = () => {
  return (
    <>
      <Header>
        <Link to="/">
          <button className={shared.navButton}>Main</button>
        </Link>
      </Header>
      <main>
        <h1>I am the singup page!</h1>
      </main>
    </>
  );
};

export { SignupPage };
