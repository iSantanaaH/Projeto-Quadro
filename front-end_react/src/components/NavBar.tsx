import styles from "../styles/NavBar.module.css";

import { FcSearch } from "react-icons/fc";
import { FiUser } from "react-icons/fi";

const navBar = () => {
  return (
    <nav className={styles.navBarContainer}>
      <div className={styles.containerTitle}>
        <h2>Quadro de Tarefas</h2>
      </div>
      <div className={styles.containerInputSearch}>
        <input type="search" placeholder="Search" />
        <button type="button">
          <FcSearch />
        </button>
        <button type="button">
          <FiUser />
        </button>
      </div>
    </nav>
  );
};

export default navBar;
