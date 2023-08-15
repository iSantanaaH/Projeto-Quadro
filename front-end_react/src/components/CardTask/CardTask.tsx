import { useContext } from "react";
import { BiDotsHorizontal, BiPlus } from "react-icons/bi";

import styles from "./CardTask.module.css";
import { CardContext } from "../Context/CardContext";

const CardTask = () => {
  const {
    handleClickInsideDropdown,
    handleChangeTextareaMainCard,
    handleEmptyMainTitleCard,
    handleEmptyContentTask,
    handleChangeTextareaContentTask,
    handleButtonAddContentTask,
    handleKeyDown,
    textareaMainCardRef,
    contentTaskTextareaRef,
    isDropdownOptionsCardTask,
    refDivDropdownOptions,
    isContentMainCardEmpty,
    emptyTextareaIndex,
    isContentTaskEmpty,
    taskUser,
  } = useContext(CardContext);

  return (
    <div className={styles.flexCardTask}>
      <div className={styles.CardTask}>
        <div className={styles.contentCardTask}>
          <div className={styles.mainCardTask}>
            <div className={styles.cardHeader}>
              <div className={styles.mainCardHeader}>
                <div
                  className={`${styles.containerTitle} ${isContentMainCardEmpty ? styles.textareaMainCardError : ""
                    }`}
                >
                  {isContentMainCardEmpty && (
                    <div className={styles.errorMessageMainCard}>
                      <span>Campo obrigatório</span>
                    </div>
                  )}
                  <textarea
                    ref={textareaMainCardRef}
                    onKeyDown={handleKeyDown}
                    onBlur={handleEmptyMainTitleCard}
                    className={styles.firstTitleCard}
                    onChange={handleChangeTextareaMainCard}
                    autoFocus
                  ></textarea>
                </div>

                <div className={styles.containerButton}>
                  <button
                    type="button"
                    onClick={handleClickInsideDropdown}
                    className={styles.iconOptionsCardTask}
                  >
                    <BiDotsHorizontal />
                  </button>
                  {isDropdownOptionsCardTask && (
                    <div
                      className={styles.dropdownOptionsCardTask}
                      ref={refDivDropdownOptions}
                    >
                      <div className={styles.divOptions}>
                        <div>
                          <button type="button">
                            <span className={styles.spanDropdownCardTask}>
                              Editar Quadro
                            </span>
                          </button>
                        </div>
                        <div>
                          <button type="button">
                            <span className={styles.spanDropdownCardTask}>
                              Arquivar Quadro
                            </span>
                          </button>
                        </div>
                        <div>
                          <button type="button">
                            <span className={styles.spanDropdownCardTask}>
                              Deletar Quadro
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.divOverflow}>
              {taskUser.map((contentCard) => (
                <div key={contentCard.id} className={styles.taskDivWrapper}>
                  <div
                    className={`${styles.secondMainCardTask} ${isContentTaskEmpty && emptyTextareaIndex === contentCard.id
                      ? styles.textareaError
                      : ""
                      }`}
                  >
                    <div className={styles.containerDescription}>
                      {isContentTaskEmpty && emptyTextareaIndex === contentCard.id && (
                        <div className={styles.errorMessageContentTask}>
                          <span>Campo obrigatório</span>
                        </div>
                      )}
                      <textarea
                        onKeyDown={handleKeyDown}
                        onBlur={handleEmptyContentTask}
                        ref={contentTaskTextareaRef}
                        className={styles.titleTaskUser}
                        autoFocus
                        data-index={contentCard.id}
                        onChange={handleChangeTextareaContentTask}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.contentAddTask}>
                <div className={styles.iconBiPlus}></div>

                <div className={styles.buttonSpan}>
                  <button
                    type="button"
                    className={styles.buttonAddTask}
                    id="buttonAddTask"
                    onClick={handleButtonAddContentTask}
                  >
                    <BiPlus />
                    <span>Adicionar tarefa</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardTask;
