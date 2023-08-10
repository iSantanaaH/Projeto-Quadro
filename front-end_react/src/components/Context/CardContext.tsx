import React, { createContext, useRef, useState, useEffect } from "react";

interface CardContextProps {
  handleClickInsideDropdown: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleAddCardTasks: () => void;
  handleChangeTextareaMainCard: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  textareaMainCardRef: React.RefObject<HTMLTextAreaElement>;
  contentTaskTextareaRef: React.RefObject<HTMLTextAreaElement>;
  isDropdownOptionsCardTask: boolean;
  numCardTask: number;
  refDivDropdownOptions: React.RefObject<HTMLDivElement>;
  isContentMainCardEmpty: boolean;
}

export const CardContext = createContext({} as CardContextProps);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOptionsCardTask, setIsDropdownOptionsCardTask] =
    useState(false);
  const [numCardTask, setNumCardTasks] = useState(0);
  const [isContentMainCardEmpty, setIsContentMainCardEmpty] = useState(false);
  const textareaMainCardRef = useRef<HTMLTextAreaElement | null>(null);
  const contentTaskTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const refDivDropdownOptions = useRef<HTMLDivElement | null>(null);

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

  const handleAddCardTasks = () => {
    setNumCardTasks((prevNumCardTasks) => prevNumCardTasks + 1);
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

  return (
    <CardContext.Provider
      value={{
        handleClickInsideDropdown,
        handleAddCardTasks,
        handleChangeTextareaMainCard,
        textareaMainCardRef,
        contentTaskTextareaRef,
        isDropdownOptionsCardTask,
        numCardTask,
        refDivDropdownOptions,
        isContentMainCardEmpty,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
