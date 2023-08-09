import styles from "./NavBarPages.module.css";

const SecondaryNavBar = () => {
  return (
    <nav className={styles.navBarContainer}>
      <div className={styles.containerImageLogo}>
        <a href="/">
          <figure>
            <img src="assets/images/task3.png" alt="Logo" />
          </figure>
        </a>
      </div>
    </nav>
  );
};

export default SecondaryNavBar;
