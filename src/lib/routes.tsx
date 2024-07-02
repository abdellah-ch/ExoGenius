import { RouteObject } from "react-router-dom";
import DashboardLayout from "../components/templates/Teacher_dashboard_layout";
import Profile from "../pages/profile";
import Not_fount from "../pages/not_fount";
import ExamList from "../pages/examList";
import NewExam from "../pages/newExam";
import LandingPage from "../pages/landing_page";
import ExamLayout from "../components/templates/Exam_Layout";
import ExamWorkspace from "../pages/exam_workspace";
import LandingLayout from "../components/templates/LandingLayout";
import Monitoring_result from "../pages/monitoring_result";
//import TeacherLogin from "../pages/teacherlogin";
const routes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Profile />,
      },
      {
        path: "/dashboard/newExam",
        element: <NewExam />,
      },
      {
        path: "/dashboard/ExamList",
        element: <ExamList />,
      },
      {
        path: "/dashboard/exams/:id",
        element: <Monitoring_result />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/exam",
    element: <ExamLayout />,
    children: [
      {
        path: "/exam/:id",
        element: <ExamWorkspace />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },

  /* {
        path: "/TeacherLogin",
        element: <TeacherLogin />,
    }, */
  {
    path: "*",
    element: <Not_fount />,
  },
];

export default routes;
