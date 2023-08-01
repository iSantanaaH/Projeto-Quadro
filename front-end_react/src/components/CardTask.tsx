import { BiDotsHorizontal } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { useRef, useState, KeyboardEvent, useEffect } from "react";

import styles from "../styles/CardTask.module.css";

interface CardTaskProps {
  textareaMainCardRef: React.RefObject<HTMLTextAreaElement>;
  contentTaskTextareaRef: React.RefObject<HTMLTextAreaElement>;
}

const CardTask = ({ textareaMainCardRef, contentTaskTextareaRef }: CardTaskProps) => {
  const [createNewDivTask, setIsCreateNewDivTask] = useState(0);
  const [focusedTextarea, setFocusedTextarea] =
    useState<HTMLTextAreaElement | null>(null);
  const [isContentTaskEmpty, setIsContentTaskEmpty] = useState(true);
  const [isContentMainCardEmpty, setIsContentMainCardEmpty] = useState(false);
  const [emptyTextareaIndex, setEmptyTextareaIndex] = useState<number | null>(
    null
  );
  const [isDropdownOptionsCardTask, setIsDropdownOptionsCardTask] =
    useState(false);

  const refDivDropdownOptions = useRef<HTMLDivElement | null>(null);

  const handleClickInsideDropdown = () => {
    setTimeout(() => {
      if (
        textareaMainCardRef.current?.value &&
        contentTaskTextareaRef.current?.value !== ""
      ) {
        setIsDropdownOptionsCardTask(true);
      } else {
        setIsDropdownOptionsCardTask(false);
      }
    }, 100);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const divDropdon = refDivDropdownOptions.current;
      if (divDropdon && !divDropdon.contains(event.target as Node)) {
        setIsDropdownOptionsCardTask(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleCreateNewDivTask = () => {
    setIsCreateNewDivTask(createNewDivTask + 1);
  };

  const handleRenderTaskDivs = () => {
    const taskDivs = [];

    for (let i = 0; i < createNewDivTask; i++) {
      taskDivs.push(
        <div key={i} className={styles.taskDivWrapper}>
          <div className={`${styles.secondMainCardTask} ${isContentTaskEmpty && emptyTextareaIndex === i ? styles.textareaError : ""}`}>
            <div className={styles.containerDescription}>
              {isContentTaskEmpty && emptyTextareaIndex === i && (
                <div className={styles.errorMessageContentTask}>
                  <span>Campo obrigatório</span>
                </div>
              )}
              <textarea
                onKeyDown={handleKeyDown}
                onBlur={handleEmptyContentTask}
                ref={contentTaskTextareaRef}
                className={`${styles.titleTaskUser}`}
                autoFocus
                data-index={i}
                onChange={handleChangeTextareaContentTask}
              ></textarea>

            </div>
          </div>
        </div>
      );
    }
    return taskDivs;
  };

  const handleChangeTextareaMainCard = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const isEmpty = value.trim() === "";

    if (isEmpty) {
      setIsContentMainCardEmpty(true);
    } else {
      setIsContentMainCardEmpty(false);
    }
  };

  const handleChangeTextareaContentTask = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const isEmpty = value.trim() === "";

    if (isEmpty) {
      setIsContentTaskEmpty(true);
    } else {
      setIsContentTaskEmpty(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (textareaMainCardRef.current || contentTaskTextareaRef.current !== null) {
        textareaMainCardRef.current?.blur();
        if (focusedTextarea === contentTaskTextareaRef.current) {
          setFocusedTextarea(null);
        }
        contentTaskTextareaRef.current?.blur();
      }
    }
  };

  const handleEmptyMainTitleCard = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const isEmpty = value.trim() === "";

    if (isEmpty) {
      setIsContentMainCardEmpty(true);
    } else {
      setIsContentMainCardEmpty(false);
    }

    if (textareaMainCardRef.current) {
      if (value !== "") {
        textareaMainCardRef.current.blur();
      } else {
        textareaMainCardRef.current.focus();
      }
    }
  };

  const handleEmptyContentTask = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const isEmpty = value.trim() === "";

    setIsContentTaskEmpty(isEmpty);
    if (isEmpty) {
      const textareaIndex = parseInt(
        event.target.getAttribute("data-index") || "",
        10
      );
      setEmptyTextareaIndex(textareaIndex);
    } else {
      setEmptyTextareaIndex(null);
    }

    if (contentTaskTextareaRef.current) {
      if (value !== "") {
        contentTaskTextareaRef.current.blur();
      } else {
        contentTaskTextareaRef.current.focus();
      }
    }

    const errorMessageSpan = event.target.parentElement?.querySelector(`.${styles.errorMessageContentTask}`) as HTMLDivElement;

    if (errorMessageSpan) {
      errorMessageSpan.style.display = isEmpty ? 'block' : 'none';
    }
  };


  const handleButtonClick = () => {
    const valueMainCard = textareaMainCardRef.current?.value;
    const valueContentTask = contentTaskTextareaRef.current?.value;

    if (valueMainCard?.trim() !== "" && valueContentTask?.trim() !== "") {
      setIsContentTaskEmpty(false);
      handleCreateNewDivTask();
    } else {
      setIsContentTaskEmpty(true);
    }
  };

  const handleDeleteCardTask = () => {
    setIsCreateNewDivTask(createNewDivTask - 1);
  };

  return (
    <div className={styles.flexCardTask}>
      <div className={styles.CardTask}>
        <div className={styles.contentCardTask}>
          <div className={styles.mainCardTask}>
            <div className={styles.cardHeader}>
              <div className={styles.mainCardHeader}>
                <div className={`${styles.containerTitle} ${isContentMainCardEmpty ? styles.textareaMainCardError : ""}`}>
                  {isContentMainCardEmpty && (
                    <div className={styles.errorMessageMainCard}>
                      <span>Campo obrigatório</span>
                    </div>
                  )}
                  <textarea
                    id="textCardTask"
                    ref={textareaMainCardRef}
                    onKeyDown={handleKeyDown}
                    onBlur={handleEmptyMainTitleCard}
                    className={styles.firstTitleCard}
                    onChange={handleChangeTextareaMainCard}
                    autoFocus
                  ></textarea>

                </div>

                <div className={styles.containerButton}>
                  <button type="button" onClick={handleClickInsideDropdown}>
                    <BiDotsHorizontal />
                  </button>
                  {isDropdownOptionsCardTask && (
                    <div
                      className={styles.dropdownOptionsCardTask}
                      ref={refDivDropdownOptions}
                    >
                      <div className={styles.divOptions}>
                        <button type="button">
                          <span className={styles.spanDropdownCardTask}>
                            Editar Quadro
                          </span>
                        </button>
                        <button type="button">
                          <span className={styles.spanDropdownCardTask}>
                            Arquivar Quadro
                          </span>
                        </button>
                        <button onClick={handleDeleteCardTask} type="button">
                          <span className={styles.spanDropdownCardTask}>
                            Deletar Quadro
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
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
