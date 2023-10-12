import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage";
import RootLayout, { Loader } from "./pages/RootLayout";
import FlightPage from "./pages/FlightPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: Loader,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "flights",
        element: <FlightPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
