import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Page Components
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import TeacherDashBoard from './components/TeacherDashboard/TeacherDashBoard';
import StudentHome from './components/StudentHome/StudentHome';
import PlagiarismChecker from './components/PlagiarismChecker/PlagiarismChecker';
import Footer from './components/Footer/Footer';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import TeacherHome from './components/TeacherHome/TeacherHome';
import ProtectedRoute from './components/ProtectedRoute'; // make sure this path is correct

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
    path: '/studentHome',
    element: (
      <ProtectedRoute role="student">
        <StudentHome />
      </ProtectedRoute>
    )
  },
  {
    path: '/studentDashboard',
    element: (
      <ProtectedRoute role="student">
        <StudentDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacherDashboard",
    element: (
      <ProtectedRoute role="teacher">
        <TeacherDashBoard />
      </ProtectedRoute>
    )
  },
  {
    path: "/plagiarism",
    element: (
      <ProtectedRoute role="student">
        <PlagiarismChecker />
      </ProtectedRoute>
    )
  },
  {
    path: "/adminDashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/teacherHome",
    element: (
      <ProtectedRoute role="teacher">
        <TeacherHome />
      </ProtectedRoute>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>,
);
