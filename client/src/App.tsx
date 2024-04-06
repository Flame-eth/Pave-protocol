import { useEffect } from "react";
import "./App.css";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import { useAccount } from "wagmi";
import Connect from "./pages/Connect";
import Navbar from "./components/Navbar";
import Borrow from "./pages/Borrow";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";

function App() {
  const Layout = () => {
    const path = useLocation().pathname;

    const { address } = useAccount();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [path]);
    return (
      <div className="">
        <Navbar />
        {!address ? (
          <>
            <Connect />
          </>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/borrow",
          element: <Borrow />,
        },
        {
          path: "/deposit",
          element: <Deposit />,
        },
        {
          path: "/withdraw",
          element: <Withdraw />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
