import './index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import TeacherDashBoard from './components/TeacherDashboard/TeacherDashBoard';

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
  },
  {
    path: "/teacherDashboard",
    element: <TeacherDashBoard></TeacherDashBoard>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      // transition={Bounce}
    />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
