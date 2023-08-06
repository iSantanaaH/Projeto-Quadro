import { useState, useRef } from "react";
import styles from "../src/HomePage.module.css";
import CardTask from "./components/CardTask";
import NavBar from "./components/NavBar";

const HomePage = () => {
  const [numCardTask, setNumCardTasks] = useState(0);
  const textareaMainCardRef = useRef<HTMLTextAreaElement>(null);
  const contentTaskTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddCardTasks = () => {
    setNumCardTasks((prevNumCardTasks) => prevNumCardTasks + 1);
  };

  const handleDeleteCardTask = () => {
    setNumCardTasks((prevNumCardTasks) => prevNumCardTasks - 1);
  };

  return (
    <div className={styles.divHomePage}>
      <div className={styles.componentNavBar}>
        <NavBar
          onAddCardTask={handleAddCardTasks}
          textareaMainCardRef={textareaMainCardRef}
          contentTaskTextareaRef={contentTaskTextareaRef}
        />
      </div>
      <div className={styles.componentCardTaskWrapper}>
        <div className={styles.componentCardTask}>
          {Array.from({ length: numCardTask }).map((_, index) => (
            <CardTask key={index}
              onRemoveCardTask={handleDeleteCardTask}
              textareaMainCardRef={textareaMainCardRef}
              contentTaskTextareaRef={contentTaskTextareaRef} />

          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;