import { BiDotsHorizontal } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

{
  /* Estilos */
}
import styles from "../styles/CardTask.module.css";

const CardTask = () => {
  return (
    <>
      <div className={styles.CardTask}>
        <div className={styles.contentCardTask}>
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
            <div className={styles.divOverflow}>
              <div className={styles.secondMainCardTask}>
                <div className={styles.containerDescription}>
                  <div>
                    <span>Fazer prova da faculdade amanhã as 19:00</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.contentAddTask}>
                  <div className={styles.iconBiPlus}></div>

                  <div className={styles.buttonSpan}>
                    <button type="button" className={styles.buttonAddTask}>
                      <BiPlus />
                      <span>Adicionar tarefa</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTask;
