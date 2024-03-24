import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {selectAuthenticated} from '../store/selectors/session';
import { ChatPage } from "../pages/ChatPage";
import { LoginPage } from "../pages/LoginPage";
import LogoutPage from "../pages/auth/LogoutPage";
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';

import HomePage from 'pages/HomePage/HomePage';
import {StudentPage} from 'pages/studentPage';
import {ActivitiesPage} from 'pages/activitiesPage';
import {ActivitiesEditPage} from 'pages/activitiesPage/activitiesEditPage';
import { EssayPage } from 'pages/EssayPage';
import { StudentActivityPage } from 'pages/studentActivityPage';
import {AssignmentPage} from 'pages/studentActivityPage/AssignmentPage';
import {StudentDetailsPage} from 'pages/studentPage/studentDetailsPage';
import {McqPage} from 'pages/mcqPage';

// ==============================|| ROUTING RENDER ||============================== //

const selectSessionDetails = createSelector(
    selectAuthenticated,
    (isAuthorized) => ({
      isAuthorized,
    })
  );
export default function ThemeRoutes() {
    const { isAuthorized } = useSelector(selectSessionDetails);
    return (
      <Routes>
        {!isAuthorized ? (
          <>
            <Route path="*" element={<Navigate to="/auth/login" replace /> } />
            <Route path="/auth/login" element={<LoginPage />} />
          </>
        ) : (
          <Route path="/" element={<MainLayout />} >
            <Route path="*" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:activityTypeId" element={<ActivitiesEditPage />} />
            <Route path="/activity/essay" element={<EssayPage />} />
            <Route path="/activity/mcq" element={<McqPage />} />
            <Route path="/student/:studentId/activities" element={<StudentDetailsPage />} />
            <Route path="/student/activities" element={<StudentActivityPage />} />
            <Route path="/activity/:activityAssignmentId" element={<AssignmentPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Route>
        )}
      </Routes>
    )
}
