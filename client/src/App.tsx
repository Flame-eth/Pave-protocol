import { useEffect } from 'react';
import './App.css'
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Home from './pages/Home';

function App() {
  const Layout = () => {
    const path = useLocation().pathname;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [path]);
    return (
      <div className=" overflow-hidden">
        {/* <Navbar /> */}
        <Outlet />
        {/* <Footer /> */}
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
       
      ],
    },
  
   
  ]);

  return <RouterProvider router={router} />;
}

export default App
