import styles from "../styles/FormLoginUser.module.css";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <style>
          {`
          html {
            background: url('/images/tarefas.png') no-repeat fixed;
            background-size: cover;
            background-position: center;
          }
        `}
        </style>
      </Helmet>

      <div className={`${styles.containerLimitWidth}`}>
        <div className={styles.sectionFormUser}>
          <div className={styles.secondContainer}>
            <div className={styles.contentLogin}>
              <h2 className={styles.Title}>Login</h2>
              <form
                className={styles.contentFormLogin}
                method="post"
                action="#"
              >
                <div className={styles.containerEmail}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="campo"
                    name="email"
                    placeholder="E-mail"
                    required
                  />
                </div>

                <div className={styles.containerPassword}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="campo"
                    name="senha"
                    placeholder="Password"
                    minLength={8}
                    required
                  />
                </div>
                <div className={styles.containerButtonSubmit}>
                  <button type="submit" value="Entrar">
                    Entrar
                  </button>
                </div>
              </form>
              <div className={styles.containerRememberPassword}>
                <span>Não tem conta? <a href="/registrar">Cadastre-se</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
