import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import levels from "../../utils/levels";
import style from "./Leaderboards.module.css";

interface LeaderboardType {
  id: string;
  username: string;
  startTime: string;
  endTime: string;
  durationMs: number;
  levelName: string;
  levelId: number;
}

function Leaderboards() {
  const { levelName } = useParams();
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/leaderboard/${levelName}`
        );
        const data = await res.json();
        if (res.ok) setLeaderboard(data.entries);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBoards();
  }, [levelName]);

  const filteredLeaderboards = leaderboard
    .filter((entry) => entry.username)
    .sort((a, b) => a.durationMs - b.durationMs);

  const changeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/leaderboards/${e.target.value}`);
  };

  return (
    <div className={style.leaderboardsWrapper}>
      <h2>LeaderBoards</h2>
      <div className={style.selectWrapper}>
        <label htmlFor="board">Choose Level:</label>
        <select
          name="board"
          id="board"
          onChange={changeSelectHandler}
          value={levelName}
        >
          {levels.map((lvl) => (
            <option key={lvl.id} value={lvl.name}>
              {lvl.name}
            </option>
          ))}
        </select>
      </div>

      <div className={style.playBtnWrapper}>
        <Link className={style.playLink} to={`/play/${levelName}`}>
          Play {levelName}
        </Link>
      </div>

      {filteredLeaderboards.length > 0 ? (
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboards.map((entry, index) => {
                const minutes = Math.floor(entry.durationMs / 60000)
                  .toString()
                  .padStart(2, "0");
                const seconds = Math.floor((entry.durationMs % 60000) / 1000)
                  .toString()
                  .padStart(2, "0");
                const date = new Date(entry.startTime).toLocaleDateString();

                return (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>
                      {minutes}:{seconds}
                    </td>
                    <td>{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={style.noScores}>
          <h2>No scores yet ☹️</h2>
          <p>Be the first one to submit!</p>
        </div>
      )}
    </div>
  );
}

export default Leaderboards;
