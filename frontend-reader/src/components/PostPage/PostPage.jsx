import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import shared from '../../styles/shared.module.css';

const PostPage = () => {
  return (
    <>
      <Header>
        <Link to="/">
          <button className={shared.navButton}>Main</button>
        </Link>
      </Header>
      <main>
        <h1>hi guys its the post page!</h1>
      </main>
    </>
  );
};

export { PostPage };
