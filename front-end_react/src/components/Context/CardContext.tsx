import React, { createContext, useRef, useState } from "react";

interface CardContextProps {
  handleClickInsideDropdown: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  textareaMainCardRef: React.RefObject<HTMLTextAreaElement>;
  contentTaskTextareaRef: React.RefObject<HTMLTextAreaElement>;
  isDropdownOptionsCardTask: boolean;
}

export const CardContext = createContext({} as CardContextProps);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOptionsCardTask, setIsDropdownOptionsCardTask] =
    useState(false);
  const textareaMainCardRef = useRef<HTMLTextAreaElement | null>(null);
  const contentTaskTextareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  return (
    <CardContext.Provider
      value={{
        handleClickInsideDropdown,
        textareaMainCardRef,
        contentTaskTextareaRef,
        isDropdownOptionsCardTask,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
