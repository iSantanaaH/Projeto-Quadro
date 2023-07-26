import { useState } from "react";
import styles from "../styles/NavBar.module.css";
import { BiSearch } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";

type NavBarProps = {
  onAddCardTask: () => void;
};

const NavBar = ({ onAddCardTask }: NavBarProps) => {
  const [clickIconUser, setClickIconUser] = useState(false);
  const [dropdownUserFocused, setIsIconUserFocused] = useState(false);

  const handleClickIconUser = () => {
    setClickIconUser(true);
    setIsIconUserFocused(true);
  };

  const handleDisableDronpdownUser = () => {
    setClickIconUser(false);
    setIsIconUserFocused(false);
  };

  return (
    <nav className={styles.navBarContainer}>
      <div className={styles.containerImageLogo}>
        <a href="/">
          <figure>
            <img src="images/task3.png" alt="Logo" />
          </figure>
        </a>
      </div>
      <div className={styles.containerTitle}>
        <h2>Gestão de Tarefas</h2>
      </div>

      <div className={styles.searchAndAddTask}>
        <div>
          <button onClick={onAddCardTask} className={styles.buttonAddCardTask}>
            Adicionar Quadro
          </button>
        </div>
        <input type="search" placeholder="Search" required />
        <button type="button" className={styles.iconSearch}>
          <BiSearch />
        </button>
        <div className={styles.userMenu}>
          <button
            type="button"
            className={styles.iconUser}
            onClick={handleClickIconUser}
          >
            <HiOutlineUser />
          </button>
          {clickIconUser && (
            <div
              className={`${styles.divBackUserDropdown}`}
              onClick={handleDisableDronpdownUser}
            >
              <div className={styles.divStyleDropdown}>
                <div
                  className={`${styles.userDropdown} ${
                    dropdownUserFocused === false
                      ? styles.focusIconUserDisable
                      : ""
                  }`}
                >
                  <a href="/login">Login</a>
                  <a href="/registrar">Cadastrar</a>
                  <a href="#">Sair</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
