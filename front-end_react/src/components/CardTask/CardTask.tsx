import { useContext } from "react";
import { BiDotsHorizontal, BiPlus } from "react-icons/bi";

import styles from "./CardTask.module.css";
import { CardContext } from "../Context/CardContext";
import { TasksContentInCardTaskProps } from '../Context/CardContext';


const CardTask = ({ tasksForCard, idToCardTask}: { tasksForCard: TasksContentInCardTaskProps[], idToCardTask: number}) => {
  const {
    handleClickInsideDropdown,
    handleChangeTextareaMainCard,
    handleEmptyMainTitleCard,
    handleEmptyContentTask,
    handleChangeTextareaContentTask,
    handleKeyDown,
    handleRenderTaskDivs,
    textareaMainCardRef,
    contentTaskTextareaRef,
    isDropdownOptionsCardTask,
    refDivDropdownOptions,
    isContentMainCardEmpty,
    emptyTextareaIndex,
    isContentTaskEmpty,
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
              {tasksForCard.map((tasksCotenntInList) => (
                <div key={tasksCotenntInList.id} className={styles.taskDivWrapper}>
                  <div
                    className={`${styles.secondMainCardTask} ${isContentTaskEmpty && emptyTextareaIndex === tasksCotenntInList.id
                      ? styles.textareaError
                      : ""
                      }`}
                  >
                    <div className={styles.containerDescription}>
                      {isContentTaskEmpty && emptyTextareaIndex === tasksCotenntInList.id && (
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
                        data-index={tasksCotenntInList.id}
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
                    onClick={() => handleRenderTaskDivs(idToCardTask)}
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