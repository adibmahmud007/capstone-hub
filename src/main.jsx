import './index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Registration />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '/studentDashboard',
    element: <StudentDashboard></StudentDashboard>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
