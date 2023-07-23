{
  /* Outros */
}
import { BiDotsHorizontal } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { useRef, useState, KeyboardEvent, useEffect } from "react";

{
  /* Estilos */
}
import styles from "../styles/CardTask.module.css";

const CardTask = () => {
  const [createNewDivTask, setIsCreateNewDivTask] = useState(0);
  const [errorEmpty, setErrorEmpty] = useState(false);
  const textareaMainCard = useRef<HTMLTextAreaElement>(null);
  const contentTaskTextarea = useRef<HTMLTextAreaElement>(null);

  const handleCreateNewDivTask = () => {
      setIsCreateNewDivTask(createNewDivTask + 1);
  };

  const handleRenderTaskDivs = () => {
    const taskDivs = [];

    for (let i = 0; i < createNewDivTask; i++) {
      taskDivs.push(
        <div className={styles.secondMainCardTask}>
          <div className={styles.containerDescription}>
            <div className={styles.divBackgroundTextarea}></div>
            <textarea
              onKeyDown={handleKeyDown}
              onBlur={handleEmptyTextarea}
              ref={contentTaskTextarea}
              className={styles.titleTaskUser}
              autoFocus
            ></textarea>
          </div>
        </div>
      );
    }
    return taskDivs;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (textareaMainCard.current && contentTaskTextarea) {
        textareaMainCard.current.blur();
        contentTaskTextarea.current?.blur();
      }
    }
  };

  const handleEmptyTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;

    if (value.trim() === "") {
      textareaMainCard.current?.focus();
    }
  };



  useEffect(() => {
    if (textareaMainCard.current) {
      textareaMainCard.current.focus();
    }
  });

  const handleButtonClick = () => {
    const valueMainCard = textareaMainCard.current?.value;
    const valueContentTask = contentTaskTextarea.current?.value;

    if(valueMainCard?.trim() !== "" && valueContentTask?.trim() !== "") {
      handleCreateNewDivTask();
    } else {
      setErrorEmpty(true);
    }
  }

  return (
    <div className={styles.flexCardTask}>
      <div className={styles.CardTask}>
        <div className={styles.contentCardTask}>
          <div className={styles.mainCardTask}>
            <div className={styles.cardHeader}>
              <div className={styles.mainCardHeader}>
                <div className={styles.containerTitle}>
                  <textarea
                    id="textCardTask"
                    ref={textareaMainCard}
                    onKeyDown={handleKeyDown}
                    className={styles.firstTitleCard}
                  ></textarea>
                </div>

                <div className={styles.containerButton}>
                  <button type="button">
                    <BiDotsHorizontal />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.divOverflow}>{handleRenderTaskDivs()}</div>
            <div className={styles.cardFooter}>
              <div className={styles.contentAddTask}>
                <div className={styles.iconBiPlus}></div>

                <div className={styles.buttonSpan}>
                  <button
                    type="button"
                    className={styles.buttonAddTask}
                    id="buttonAddTask"
                    onClick={handleButtonClick}
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
