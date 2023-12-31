{/* Outros */}
import React, { useState } from "react";
import { Helmet } from "react-helmet";

{/* Estilos */}
import styles from "../styles/FormLoginUser.module.css";

{/* Componentes */}
import SecondaryNavBar from "../components/SecondaryNavBar";

const LoginPage = () => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailInputValue(value);
  };
  
  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswordInputValue(value);
  };

  const handleEmailInputFocus = () => {
    setIsEmailFocused(true);
  };
  
  const handlePasswordInputFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleInputBlur = () => {
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };

  return (
    <>
    <SecondaryNavBar />
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
                  <label
                    htmlFor="inputEmail"
                    className={`${styles.labelInput} ${isEmailFocused || emailInputValue !== "" ? styles.labelInputFocus: (emailInputValue === "" && !isEmailFocused) ? styles.labelInputDisable : ""}`}
                  >
                    Username
                  </label>
                  <input
                    type="email"
                    id="inputEmail"
                    className="campo"
                    name="email"
                    value={emailInputValue}
                    autoComplete="off"
                    onChange={handleEmailInputChange}
                    onFocus={handleEmailInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                </div>

                <div className={styles.containerPassword}>
                  <label htmlFor="mainPassword"
                  className={`${styles.labelInput} ${isPasswordFocused || passwordInputValue !== "" ? styles.labelInputFocus: (passwordInputValue === "" && !isPasswordFocused) ? styles.labelInputDisable : ""}`}>Password</label>
                  <input
                    type="password"
                    id="mainPassword"
                    className="campo"
                    name="senha"
                    minLength={8}
                    onChange={handlePasswordInputChange}
                    onFocus={handlePasswordInputFocus}
                    onBlur={handleInputBlur}
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
                <span>
                  Não tem conta? <a href="/registrar">Cadastre-se</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;