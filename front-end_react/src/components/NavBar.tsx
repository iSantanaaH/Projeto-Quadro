import { useState } from "react";
import styles from "../styles/NavBar.module.css";
import { RefObject } from "react";


type NavBarProps = {
  onAddCardTask: () => void;
  textareaMainCardRef: RefObject<HTMLTextAreaElement>;
  contentTaskTextareaRef: RefObject<HTMLTextAreaElement>;
};

const NavBar = ({ onAddCardTask, textareaMainCardRef, contentTaskTextareaRef }: NavBarProps) => {
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

  const handleAddCardTask = () => {
    const mainCardValue = textareaMainCardRef.current?.value;
    const contentTaskValue = contentTaskTextareaRef.current?.value;

    if (mainCardValue !== "" && contentTaskValue !== "") {
      onAddCardTask();
    }
  }

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
          <button onClick={handleAddCardTask} className={styles.buttonAddCardTask}>
            Adicionar Quadro
          </button>
        </div>
        <input type="search" placeholder="Search" required />
        <button type="button" className={styles.iconSearch}>
          <img src="images/search.png" alt="" />
        </button>
        <div className={styles.userMenu}>
          <button
            type="button"
            className={styles.iconUser}
            onClick={handleClickIconUser}
          >
            <img src="images/user.png" alt="Icone do usuário" />
          </button>
          {clickIconUser && (
            <div
              className={`${styles.divBackUserDropdown}`}
              onClick={handleDisableDronpdownUser}
            >
              <div className={styles.divStyleDropdown}>
                <div
                  className={`${styles.userDropdown} ${dropdownUserFocused === false
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
