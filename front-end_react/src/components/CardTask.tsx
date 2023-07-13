import { BiDotsHorizontal } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

{
  /* Estilos */
}
import styles from "../styles/CardTask.module.css";

const CardTask = () => {
  return (
    <>
      <div>
        <div className={styles.CardTask}>
          <div className={styles.mainCardTask}>
            <div className={styles.cardHeader}>
              <div className={styles.mainCardHeader}>
                <div className={styles.containerTitle}>
                  <textarea className={styles.firstTitleCard}>A fazer</textarea>
                </div>

                <div className={styles.containerButton}>
                  <button type="button">
                    <BiDotsHorizontal />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.secondMainCardTask}>
              <div className={styles.containerDescription}>
                <div>
                  <span>Fazer prova da faculdade amanhã as 19:00</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.contentAddTask}>
                <a>
                  <BiPlus />
                  <button type="button" className={styles.buttonAddTask}>
                    <span>Adicionar tarefa</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTask;
