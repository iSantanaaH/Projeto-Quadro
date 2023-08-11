import { useContext, useState } from "react";
import styles from "./NavBar.module.css";
import { CardContext } from "../Context/CardContext";

const NavBar = () => {
  const [clickIconUser, setClickIconUser] = useState(false);
  const [dropdownUserFocused, setIsIconUserFocused] = useState(false);
  const { handleAddCardTasks } = useContext(CardContext);

  const handleClickIconUser = () => {
    setClickIconUser(true);
    setIsIconUserFocused(true);
  };

  const handleDisableDronpdownUser = () => {
    setClickIconUser(false);
    setIsIconUserFocused(false);
  };

  return (
    <section className={styles.navBarContainer}>
      <header className={styles.containerImageLogo}>
        <a href="/">
          <figure>
            <img src="/assets/images/task3.png" alt="Logo" />
          </figure>
        </a>
      </header>
      <section className={styles.containerTitle}>
        <h2>Gestão de Tarefas</h2>
      </section>
      <main className={styles.searchAndAddTask}>
        <div>
          <button
            onClick={handleAddCardTasks}
            className={styles.buttonAddCardTask}
          >
            Adicionar Quadro
          </button>
        </div>
        <div className={styles.inputSearch}>
          <input type="search" placeholder="Search" required />
        </div>
        <button type="button" className={styles.iconSearch}>
          <img src="assets/images/search.png" alt="" />
        </button>
        <div className={styles.userMenu}>
          <button
            type="button"
            className={styles.iconUser}
            onClick={handleClickIconUser}
          >
            <img src="assets/images/user.png" alt="Icone do usuário" />
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
                  <div>
                    <a href="/login">Login</a>
                  </div>
                  <div>
                    <a href="/registrar">Cadastrar</a>
                  </div>
                  <div>
                    <a href="#">Sair</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default NavBar;
