import { useState, useRef } from "react";
import styles from "../src/HomePage.module.css";
import CardTask from "./components/CardTask";
import NavBar from "./components/NavBar";

const HomePage = () => {
  const [numCardTask, setNumCardTasks] = useState(
    [
      {
        'id': 1,
        'nome': 'Micael'
      },
      {
        'id': 2,
        'nome': 'Teste 2'
      }
    ]
    );
  const textareaMainCardRef = useRef<HTMLTextAreaElement>(null);
  const contentTaskTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddCardTasks = (id = 3) => {
    numCardTask.forEach(el => {
      if(el.id == id){
        console.log('O quadro deletado foi o de id: ' + el.id + ' e de nome ' + el.nome )
      }else{
        console.log('O objeto não existe')
        return undefined
      }
    } 
    )
  };

  const handleDeleteCardTask = () => {
    console.log('handledelete')
  };

  return (
    <main className={styles.divHomePage}>
      <section className={styles.componentNavBar}>
        <NavBar
          onAddCardTask={handleAddCardTasks}
          textareaMainCardRef={textareaMainCardRef}
          contentTaskTextareaRef={contentTaskTextareaRef}
        />
      </section>
      <section className={styles.componentCardTaskWrapper}>
        <div className={styles.componentCardTask}>
          {Array.from({ length: numCardTask }).map((_, index) => (
            <CardTask key={index}
              onRemoveCardTask={(id) => {
                console.log('oi')
              }}
              textareaMainCardRef={textareaMainCardRef}
              contentTaskTextareaRef={contentTaskTextareaRef} />

          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;