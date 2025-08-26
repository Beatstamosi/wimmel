import style from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={style.pageWrapper}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
