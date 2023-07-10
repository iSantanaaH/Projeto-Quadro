{/* Estilos */}
import styles from '../src/HomePage.module.css';

{/* Componentes */}
import CardTask from './components/CardTask';
import NavBar from './components/NavBar';

{/* Pages */}
// import LoginPage from './pages/Login';

{/* Bibliotecas */}

const HomePage = () => {
  return (
    <>
      <div className={styles.containerHomePage}>
        <NavBar />
        <CardTask />
      </div>
    </>
  );
};

export default HomePage;
