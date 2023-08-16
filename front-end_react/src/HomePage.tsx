import { useContext } from "react";
import styles from "../src/HomePage.module.css";
import CardTask from "./components/CardTask/CardTask";
import NavBar from "./components/NavBarComponent/NavBar";
import { CardContext } from "./components/Context/CardContext";
import { TasksContentInCardTaskProps } from './components/Context/CardContext';

const HomePage = () => {
  const { cardTaskUser, taskUser } = useContext(CardContext);

  return (
    <div className={styles.divHomePage}>
      <div className={styles.componentNavBar}>
        <NavBar />
      </div>
      <div className={styles.componentCardTaskWrapper}>
        <div className={styles.componentCardTask}>
          {cardTaskUser.map((listCardTask) => (
            <div key={listCardTask.id}>
              <h3 style={{ color: 'red', position: "absolute", marginTop: '5rem' }}>ID do quadro: {listCardTask.id}</h3>
              <CardTask 
              key={listCardTask.id}
              idToCardTask={listCardTask.id} 
              tasksForCard={taskUser.filter((task: TasksContentInCardTaskProps) => task.idToCardTask === listCardTask.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;