import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import Home from "./Home/Home.jsx";
import Play from "./Play/Play.js";

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
    ],
  },
];

export default routes;
