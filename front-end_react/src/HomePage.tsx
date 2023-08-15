import { useContext } from "react";
import styles from "../src/HomePage.module.css";
import CardTask from "./components/CardTask/CardTask";
import NavBar from "./components/NavBarComponent/NavBar";
import { CardContext } from "./components/Context/CardContext";

const HomePage = () => {
  const { cardTaskUser } = useContext(CardContext);

  return (
    <div className={styles.divHomePage}>
      <div className={styles.componentNavBar}>
        <NavBar />
      </div>
      <div className={styles.componentCardTaskWrapper}>
        <div className={styles.componentCardTask}>
          {cardTaskUser.map((task) => (
            <CardTask
             key={task.id}
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
