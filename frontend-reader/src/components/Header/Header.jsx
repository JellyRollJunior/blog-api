import styles from './Header.module.css';
import shared from '../../styles/shared.module.css';

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>{children}</nav>
      <h1 className={`${shared.fontSizeHeadingLarge} ${shared.marginTopSmall}`}>The Chiikawa Chronicle</h1>
      <p className={shared.marginTopSmall}>なんか小さくてかわいいやつ</p>
      <hr className={shared.marginTopXLarge} />
    </header>
  );
};

export { Header };
