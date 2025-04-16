import './index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import TeacherDashBoard from './components/TeacherDashboard/TeacherDashBoard';
import StudentHome from './components/StudentHome/StudentHome';
import PlagiarismChecker from './components/PlagiarismChecker/PlagiarismChecker';
import Footer from './components/Footer/Footer';

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
    path:'/studentHome',
    element: <StudentHome></StudentHome>

  },
  {
    path: '/studentDashboard',
    element: <StudentDashboard></StudentDashboard>
  },
  {
    path: "/teacherDashboard",
    element: <TeacherDashBoard></TeacherDashBoard>
  },
  {
    path:"/plagiarism",
    element: <PlagiarismChecker></PlagiarismChecker>
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
    <Footer></Footer>
  </React.StrictMode>,
);
