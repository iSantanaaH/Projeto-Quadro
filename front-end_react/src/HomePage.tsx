import { useState } from 'react';
import styles from '../src/HomePage.module.css';
import CardTask from './components/CardTask';
import NavBar from './components/NavBar';

const HomePage = () => {
  const [numCardTask, setNumCardTasks] = useState(1);

  const handleAddCardTasks = () => {
    setNumCardTasks(prevNumCardTasks => prevNumCardTasks + 1);
  };

  return (
    <>
      <div className={styles.containerHomePage}>
        <NavBar onAddCardTask={handleAddCardTasks} />
        {Array.from({ length: numCardTask }).map((_, index) => (
          <CardTask key={index} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
