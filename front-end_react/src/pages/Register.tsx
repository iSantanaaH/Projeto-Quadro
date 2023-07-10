import styles from "../styles/FormRegisterUser.module.css";
import { Helmet } from "react-helmet";

const RegisterPage = () => {
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
              <h2 className={styles.Title}> Cadastro </h2>
              <form
                className={styles.contentFormLogin}
                method="post"
                action="#"
              >
                <div className={styles.containerEmail}>
                  {/* <label className={styles.placeholder}>Username</label> */}
                  <input
                    type="text"
                    id="inputUsername"
                    className="campo"
                    name="username"
                    placeholder="Username"
                    required
                  />
                </div>

                <div className={styles.containerEmail}>
                  {/* <label htmlFor="email">Email</label> */}
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
                  {/* <label htmlFor="mainPassword">Password</label> */}
                  <input
                    type="password"
                    id="mainPassword"
                    className="campo"
                    name="senha"
                    placeholder="Password"
                    minLength={8}
                    required
                  />
                </div>

                <div className={styles.containerPassword}>
                  {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                  <input
                    type="password"
                    id="confirmPassword"
                    className="campo"
                    name="senha"
                    placeholder="Confirm Password"
                    minLength={8}
                    required
                  />
                </div>

                <div className={styles.containerButtonSubmit}>
                  <button type="submit" value="Entrar">
                    Create Account
                  </button>
                </div>
              </form>
              <div className={styles.containerRememberPassword}>
                <span>
                  Já tem uma conta? <a href="/login">Faça login</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
