import { Header } from '../Header/Header.jsx';
import { Link } from 'react-router-dom';
import { ReturnHomeButton } from '../ReturnHomeButton/ReturnHomeButton.jsx';
import { Footer } from '../Footer/Footer.jsx';
import shared from '../../styles/shared.module.css';

const ErrorPage = () => {
  return (
    <>
      <Header>
        <Link to="/">
          <button className={shared.navButton}>Main</button>
        </Link>
      </Header>
      <main>
        <div className={shared.formCard}>
          <h2 className={shared.cardTitle}>404 Page not found</h2>
          <ReturnHomeButton />
        </div>
      </main>
      <Footer />
    </>
  );
};

export { ErrorPage };
