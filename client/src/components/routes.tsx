import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import Home from "./Home/Home.jsx";

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
    ],
  },
];

export default routes;
