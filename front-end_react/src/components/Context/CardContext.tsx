import React, { createContext, useRef, useState, useEffect } from "react";
import styles from "../CardTask/CardTask.module.css";

interface CardContextProps {
  handleAddCardTasks: () => void;
  handleCreateNewDivTask: () => void;
  handleButtonAddContentTask: () => void;
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
  numCardTask: number;
  refDivDropdownOptions: React.RefObject<HTMLDivElement>;
  isContentMainCardEmpty: boolean;
  emptyTextareaIndex: number | null;
  isContentTaskEmpty: boolean;
  createNewDivTask: number;
}

export const CardContext = createContext({} as CardContextProps);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOptionsCardTask, setIsDropdownOptionsCardTask] =
    useState(false);
  const [numCardTask, setNumCardTasks] = useState(0);
  const [createNewDivTask, setIsCreateNewDivTask] = useState(0);
  const [isContentMainCardEmpty, setIsContentMainCardEmpty] = useState(false);
  const [isContentTaskEmpty, setIsContentTaskEmpty] = useState(true);

  const [focusedTextarea, setFocusedTextarea] =
    useState<HTMLTextAreaElement | null>(null);
  const textareaMainCardRef = useRef<HTMLTextAreaElement | null>(null);
  const contentTaskTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const refDivDropdownOptions = useRef<HTMLDivElement | null>(null);
  const [emptyTextareaIndex, setEmptyTextareaIndex] = useState<number | null>(
    null
  );

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

  const handleAddCardTasks = () => {
    const textareaMain = textareaMainCardRef.current?.value;
    const textareaContent = contentTaskTextareaRef.current?.value;

    if (textareaContent !== "" && textareaMain !== "") {
      setNumCardTasks((prevNumCardTasks) => prevNumCardTasks + 1);
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

  const handleCreateNewDivTask = () => {
    setIsCreateNewDivTask(0);
  };

  const handleButtonAddContentTask = () => {
    const valueMainCard = textareaMainCardRef.current?.value;
    const valueContentTask = contentTaskTextareaRef.current?.value;

    if (valueMainCard?.trim() !== "" && valueContentTask?.trim() !== "") {
      setIsContentTaskEmpty(false);
      handleCreateNewDivTask();
    } else {
      setIsContentTaskEmpty(true);
    }
  };

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
        handleAddCardTasks,
        handleChangeTextareaMainCard,
        handleEmptyMainTitleCard,
        handleEmptyContentTask,
        handleChangeTextareaContentTask,
        handleCreateNewDivTask,
        handleButtonAddContentTask,
        handleKeyDown,
        textareaMainCardRef,
        contentTaskTextareaRef,
        isDropdownOptionsCardTask,
        numCardTask,
        refDivDropdownOptions,
        isContentMainCardEmpty,
        emptyTextareaIndex,
        isContentTaskEmpty,
        createNewDivTask,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
