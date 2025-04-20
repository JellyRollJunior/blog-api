import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.footerSeparator}/>
      <div className={styles.iconHolder}>
        <a className={styles.github} href="https://github.com/jellyrolljunior" target="”_blank”"></a>
        <a className={styles.linkedin} href="https://www.linkedin.com/in/jellyrolljunior/" target="”_blank”"></a>
        <a className={styles.instagram} href="https://www.instagram.com/river.flows__" target="”_blank”"></a>
      </div>
      Created by JellyRollJunior (Brandon Lin)
    </footer>
  );
};

export { Footer };
