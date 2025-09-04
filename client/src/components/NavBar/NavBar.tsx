import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/wimmel_logo.png";
import { IoMdTrophy } from "react-icons/io";
import levels from "../../utils/levels";

function NavBar() {
  return (
    <div className={style.containerNavBar}>
      <div className={style.containerLogo}>
        <Link to="/">
          <img src={logo} className={style.logo}></img>
        </Link>
      </div>
      <div className={style.containerBtnLeaderboards}>
        <Link to={`/leaderboards/${levels[0].name}`}>
          <IoMdTrophy size="2em" color="white" className={style.trophyIcon} />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
