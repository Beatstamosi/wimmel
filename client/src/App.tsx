import style from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className={style.pageWrapper}>
        <NavBar />
        <div className={style.outletContent}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
