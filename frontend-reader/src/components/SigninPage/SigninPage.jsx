import { Link } from 'react-router-dom';
import styles from './SigninPage.module.css';
import sharedStyles from '../../styles/sharedStyles.module.css';

const SigninPage = () => {
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
          <form action="POST">
            <label htmlFor="username" className={sharedStyles.cardLabel}>Username: </label>
            <input type="text" name="username" id="username" required className={sharedStyles.cardInput} />
            <label htmlFor="password" className={sharedStyles.cardLabel}>Password: </label>
            <input type="password" name="password" id="password" required className={sharedStyles.cardInput} />
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
