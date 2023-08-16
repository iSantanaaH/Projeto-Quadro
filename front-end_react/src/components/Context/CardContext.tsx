import React, { createContext, useRef, useState, useEffect } from "react";
import styles from "../CardTask/CardTask.module.css";

interface CardContextProps {
  handleAddCardTasks: () => void;
  handleButtonAddContentTask: (idToCardTask: number) => void;
  handleRenderTaskDivs: (idToCardTask: number) => void;
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
  cardTaskUser: CardTaskProps[];
  refDivDropdownOptions: React.RefObject<HTMLDivElement>;
  isContentMainCardEmpty: boolean;
  emptyTextareaIndex: number | null;
  isContentTaskEmpty: boolean;
  taskUser: TasksContentInCardTaskProps[];
}

export interface TasksContentInCardTaskProps {
  id: number;
  title?: string;
  status?: string;
  idToCardTask?: number;
}
interface CardTaskProps {
  id: number;
  title: string;
}

export const CardContext = createContext({} as CardContextProps);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOptionsCardTask, setIsDropdownOptionsCardTask] =
    useState(false);
  const [cardTaskUser, setCardTaskUsers] = useState<CardTaskProps[]>([]);
  const [isContentMainCardEmpty, setIsContentMainCardEmpty] = useState(false);
  const [isContentTaskEmpty, setIsContentTaskEmpty] = useState(true);
  const [taskUser, setTaskUser] = useState<TasksContentInCardTaskProps[]>([]);
  const [nextIdtaskUser, setNextIdTaskUser] = useState(1);
  const [nextIdCardTask, setNextIdCardTask] = useState(1);

  const [focusedTextarea, setFocusedTextarea] =
    useState<HTMLTextAreaElement | null>(null);
  const textareaMainCardRef = useRef<HTMLTextAreaElement | null>(null);
  const contentTaskTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const refDivDropdownOptions = useRef<HTMLDivElement | null>(null);
  const [emptyTextareaIndex, setEmptyTextareaIndex] = useState<number | null>(
    null
  );

  {/* Lógica para criar uma nova tarefa */}
  const handleRenderTaskDivs = (idToCardTask: number) => {
    const taskUser: TasksContentInCardTaskProps = {
      id: nextIdtaskUser,
      title: `Tarefa ${nextIdtaskUser}`,
      status: "",
      idToCardTask: idToCardTask,
    };

    setTaskUser((prevContent) => [...prevContent, taskUser]);
    setNextIdTaskUser(prevIdtaskUser => prevIdtaskUser + 1);
    console.log(taskUser);
  }

  {/* Cria um novo quadro de tarefas */}
  const handleAddCardTasks = () => {
    const textareaMain = textareaMainCardRef.current?.value;
    const textareaContent = contentTaskTextareaRef.current?.value;

    const cardTaskUser: CardTaskProps = {
      id: nextIdCardTask,
      title: "",
    }

    if (textareaContent !== "" && textareaMain !== "") {
      setCardTaskUsers((prevCardTask) => [...prevCardTask, cardTaskUser]);
      setNextIdCardTask(prevIdCardTask => prevIdCardTask + 1);
    }
  }

  {/* Recebe o clique do usuário no botão da dropdown e mostra as opções */}
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

  {/* Verifica se está vazio e mostra o erro conforme digitado */}
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

  {/* Verifica se o conteudo o titutlo principal do quadro está vazio */}
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

  {/* Desabilita a dropdown de opções do quadro se o clique ocorrer fora da dropdown */}
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

  {/* Verifica se o conteudo da tarefa está vazio */ }
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

  {/* Função que cria uma nova tarefa */ }

  const handleButtonAddContentTask = (idToCardTask: number) => {
    const valueMainCard = textareaMainCardRef.current?.value;
    const valueContentTask = contentTaskTextareaRef.current?.value;

    if (valueMainCard?.trim() !== "" && valueContentTask?.trim() !== "") {
      setIsContentTaskEmpty(false);
      handleRenderTaskDivs(idToCardTask);
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
        cardTaskUser,
        refDivDropdownOptions,
        isContentMainCardEmpty,
        emptyTextareaIndex,
        isContentTaskEmpty,
        taskUser,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};