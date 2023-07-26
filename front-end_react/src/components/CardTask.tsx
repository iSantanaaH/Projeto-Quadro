import { BiDotsHorizontal } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { useRef, useState, KeyboardEvent } from "react";

import styles from "../styles/CardTask.module.css";

const CardTask = () => {
  const [createNewDivTask, setIsCreateNewDivTask] = useState(0);
  const [focusedTextarea, setFocusedTextarea] =
    useState<HTMLTextAreaElement | null>(null);
  const textareaMainCard = useRef<HTMLTextAreaElement>(null);
  const contentTaskTextarea = useRef<HTMLTextAreaElement>(null);
  const [isContentEmpty, setIsContentEmpty] = useState(true);
  const [emptyTextareaIndex, setEmptyTextareaIndex] = useState<number | null>(
    null
  );

  const handleCreateNewDivTask = () => {
    setIsCreateNewDivTask(createNewDivTask + 1);
  };

  const handleRenderTaskDivs = () => {
    const taskDivs = [];

    for (let i = 0; i < createNewDivTask; i++) {
      taskDivs.push(
        <div key={i} className={styles.taskDivWrapper}>
          <div className={styles.secondMainCardTask}>
            <div className={styles.containerDescription}>
              <div className={styles.divBackgroundTextarea}></div>

              <textarea
                onKeyDown={handleKeyDown}
                onBlur={handleEmptyContentTask}
                ref={contentTaskTextarea}
                className={styles.titleTaskUser}
                autoFocus
                data-index={i} 
              ></textarea>
              {isContentEmpty && emptyTextareaIndex === i && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>
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
        if (focusedTextarea === contentTaskTextarea.current) {
          setFocusedTextarea(null);
        }
        contentTaskTextarea.current?.blur();
      }
    }
  };

  const handleEmptyMainTitleCard = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;

    if (textareaMainCard) {
      if (value !== "") {
        textareaMainCard.current?.blur();
      } else {
        textareaMainCard.current?.focus();
      }
    }
  };

  const handleEmptyContentTask = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const isEmpty = value.trim() === "";

    setIsContentEmpty(isEmpty);
    if (isEmpty) {
      const textareaIndex = parseInt(
        event.target.getAttribute("data-index") || "",
        10
      );
      setEmptyTextareaIndex(textareaIndex);
    } else {
      setEmptyTextareaIndex(null);
    }

    if (contentTaskTextarea) {
      if (value !== "") {
        contentTaskTextarea.current?.blur();
      } else {
        contentTaskTextarea.current?.focus();
      }
    }
  };

  const handleButtonClick = () => {
    const valueMainCard = textareaMainCard.current?.value;
    const valueContentTask = contentTaskTextarea.current?.value;

    if (valueMainCard?.trim() !== "" && valueContentTask?.trim() !== "") {
      setIsContentEmpty(false);
      handleCreateNewDivTask();
    } else {
      setIsContentEmpty(true);
    }
  };

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
                    onBlur={handleEmptyMainTitleCard}
                    className={styles.firstTitleCard}
                    autoFocus
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
