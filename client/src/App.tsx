import style from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className={style.pageWrapper}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
