import React, { useState } from "react";
import styles from "../styles/FormRegisterUser.module.css";
import { Helmet } from "react-helmet";

const RegisterPage = () => {
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [confirmPasswordInputValue, setConfirmPasswordValue] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setUsernameInputValue(value);
  };

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setEmailInputValue(value);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPasswordInputValue(value);
  };

  const handleConfirmPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setConfirmPasswordValue(value);
  };

  const handleUsernameInputFocus = () => {
    setIsUsernameFocused(true);
  };

  const handleEmailInputFocus = () => {
    setIsEmailFocused(true);
  };

  const handlePasswordInputFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleConfirmPasswordInputFocus = () => {
    setIsConfirmPasswordFocused(true);
  };

  const handleInputBlur = () => {
    setIsUsernameFocused(false);
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
    setIsConfirmPasswordFocused(false);
  };

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
                action="#"
              >
                <div className={styles.containerEmail}>
                  <label htmlFor="inputUsername"
                    className={`${styles.labelInputGeneral} ${
                      isUsernameFocused || usernameInputValue !== ""
                        ? styles.labelInputFocus
                        : usernameInputValue === "" && !isUsernameFocused
                        ? styles.labelInputDisable
                        : ""
                    }`}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="inputUsername"
                    className="campo"
                    name="username"
                    onChange={handleUsernameInputChange}
                    onFocus={handleUsernameInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                </div>

                <div className={styles.containerEmail}>
                  <label htmlFor="inputEmail"
                    className={`${styles.labelInputGeneral} ${
                      isEmailFocused || emailInputValue !== ""
                        ? styles.labelInputFocus
                        : emailInputValue === "" && !isEmailFocused
                        ? styles.labelInputDisable
                        : ""
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="inputEmail"
                    className="campo"
                    name="email"
                    onChange={handleEmailInputChange}
                    onFocus={handleEmailInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                </div>

                <div className={styles.containerPassword}>
                  <label htmlFor="mainPassword"
                    className={`${styles.labelInputGeneral} ${
                      isPasswordFocused || passwordInputValue !== ""
                        ? styles.labelInputFocus
                        : passwordInputValue === "" && !isPasswordFocused
                        ? styles.labelInputDisable
                        : ""
                    }`}
                  >
                    Password
                  </label>
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

                <div className={styles.containerPassword}>
                  <label htmlFor="confirmPassword"
                    className={`${styles.labelInputGeneral} ${
                      isConfirmPasswordFocused ||
                      confirmPasswordInputValue !== ""
                        ? styles.labelInputFocus
                        : confirmPasswordInputValue === "" &&
                          !isConfirmPasswordFocused
                        ? styles.labelInputDisable
                        : ""
                    }`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="campo"
                    name="senha"
                    minLength={8}
                    onChange={handleConfirmPasswordInputChange}
                    onFocus={handleConfirmPasswordInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                </div>

                <div className={styles.containerButtonSubmit}>
                  <button type="submit" value="Entrar">
                    Criar conta
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