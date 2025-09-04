import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import Home from "./Home/Home.jsx";
import Play from "./Play/Play.js";
import Leaderboards from "./Leaderboards/Leaderboards.js";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/play/:levelName",
        element: <Play />,
      },
      {
        path: "/leaderboards/:levelName",
        element: <Leaderboards />,
      },
    ],
  },
];

export default routes;
