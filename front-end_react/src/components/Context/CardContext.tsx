import React, { createContext, useRef, useState, useEffect } from "react";
import styles from "../CardTask/CardTask.module.css";

interface CardContextProps {
  handleAddCardTasks: () => void;
  handleButtonAddContentTask: () => void;
  handleRenderTaskDivs: () => void;
  handleClickInsideDropdown: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleChangeTextareaMainCard: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleEmptyMainTitleCard: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleEmptyContentTask: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleChangeTextareaContentTask: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaMainCardRef: React.RefObject<HTMLTextAreaElement>;
  contentTaskTextareaRef: React.RefObject<HTMLTextAreaElement>;
  isDropdownOptionsCardTask: boolean;
  numCardTask: CardTaskProps[];
  refDivDropdownOptions: React.RefObject<HTMLDivElement>;
  isContentMainCardEmpty: boolean;
  emptyTextareaIndex: number | null;
  isContentTaskEmpty: boolean;
  contentCardTask: TasksContentInCardTaskProps[];
}

interface TasksContentInCardTaskProps {
  id: number;
  title: string;
  status: string;
}
interface CardTaskProps {
  id: number;
}

export const CardContext = createContext({} as CardContextProps);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOptionsCardTask, setIsDropdownOptionsCardTask] =
    useState(false);
  const [numCardTask, setNumCardTasks] = useState<CardTaskProps[]>([]);
  // const [createNewDivTask, setIsCreateNewDivTask] = useState(0);
  const [isContentMainCardEmpty, setIsContentMainCardEmpty] = useState(false);
  const [isContentTaskEmpty, setIsContentTaskEmpty] = useState(true);
  const [contentCardTask, setContentCardTask] = useState<TasksContentInCardTaskProps[]>([]);
  const [nextIdContentCardTask, setnextIdContentCardTask] = useState(1);
  const [nextIdCardTask, setNextIdCardTask] = useState(1);

  const [focusedTextarea, setFocusedTextarea] =
    useState<HTMLTextAreaElement | null>(null);
  const textareaMainCardRef = useRef<HTMLTextAreaElement | null>(null);
  const contentTaskTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const refDivDropdownOptions = useRef<HTMLDivElement | null>(null);
  const [emptyTextareaIndex, setEmptyTextareaIndex] = useState<number | null>(
    null
  );

  const handleRenderTaskDivs = () => {
    const contentCardTask: TasksContentInCardTaskProps = {
      id: nextIdContentCardTask,
      title: `Tarefa ${nextIdContentCardTask}`,
      status: "",
 
    };

    setContentCardTask((prevContent) => [...prevContent, contentCardTask]);
    setnextIdContentCardTask(prevIdContentCardTask => prevIdContentCardTask + 1);
    // console.log(nextIdContentCardTask);
    console.log(contentCardTask);
    
    
  }

  const handleAddCardTasks = () => {
    const textareaMain = textareaMainCardRef.current?.value;
    const textareaContent = contentTaskTextareaRef.current?.value;

    const createNewCardTask: CardTaskProps = {
      id: nextIdCardTask,
    }

    if (textareaContent !== "" && textareaMain !== "") {
      setNumCardTasks((prevCardTask) => [...prevCardTask, createNewCardTask]);
      setNextIdCardTask(prevIdCardTask => prevIdCardTask + 1);
    }
  }

  const handleClickInsideDropdown = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (
      textareaMainCardRef.current?.value &&
      contentTaskTextareaRef.current?.value !== ""
    ) {
      setIsDropdownOptionsCardTask((prevState) => !prevState);
    }
  };

  const handleChangeTextareaMainCard = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const isEmpty = value.trim() === "";

    if (isEmpty) {
      setIsContentMainCardEmpty(true);
    } else {
      setIsContentMainCardEmpty(false);
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

  useEffect(() => {
    const handleClickOutsideDropdown = (event: MouseEvent) => {
      if (
        refDivDropdownOptions &&
        !refDivDropdownOptions.current?.contains(event.target as Node)
      ) {
        setIsDropdownOptionsCardTask(false);
      }
    };
    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

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

    const errorMessageSpan = event.target.parentElement?.querySelector(
      `.${styles.errorMessageContentTask}`
    ) as HTMLDivElement;

    if (errorMessageSpan) {
      errorMessageSpan.style.display = isEmpty ? "block" : "none";
    }
  };

  {/*  */ }

  const handleButtonAddContentTask = () => {
    const valueMainCard = textareaMainCardRef.current?.value;
    const valueContentTask = contentTaskTextareaRef.current?.value;

    if (valueMainCard?.trim() !== "" && valueContentTask?.trim() !== "") {
      setIsContentTaskEmpty(false);
      handleRenderTaskDivs();
    } else {
      setIsContentTaskEmpty(true);
    }
  };

  {/* Identifica se o card de tarefa está vazio e rendezira o span de erro ao usuário */ }
  const handleChangeTextareaContentTask = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const isEmpty = value.trim() === "";
    const textarea = contentTaskTextareaRef.current;

    if (isEmpty) {
      setIsContentTaskEmpty(true);
    } else {
      setIsContentTaskEmpty(false);
    }

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  {/* Impede o enter de quebrar uma linha do card de Tarefas */ }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (
        textareaMainCardRef.current ||
        contentTaskTextareaRef.current !== null
      ) {
        textareaMainCardRef.current?.blur();
        if (focusedTextarea === contentTaskTextareaRef.current) {
          setFocusedTextarea(null);
        }

        contentTaskTextareaRef.current?.blur();
      }
    }
  };

  return (
    <CardContext.Provider
      value={{
        handleClickInsideDropdown,
        handleChangeTextareaMainCard,
        handleEmptyMainTitleCard,
        handleAddCardTasks,
        handleEmptyContentTask,
        handleButtonAddContentTask,
        handleChangeTextareaContentTask,
        handleKeyDown,
        handleRenderTaskDivs,
        textareaMainCardRef,
        contentTaskTextareaRef,
        isDropdownOptionsCardTask,
        numCardTask,
        refDivDropdownOptions,
        isContentMainCardEmpty,
        emptyTextareaIndex,
        isContentTaskEmpty,
        contentCardTask,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
