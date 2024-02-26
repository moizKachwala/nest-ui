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
import {ActivityPage} from 'pages/activityPage';
import { EssayPage } from 'pages/EssayPage';

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
            <Route path="/activities" element={<ActivityPage />} />
            <Route path="/activity/essay" element={<EssayPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Route>
        )}
      </Routes>
    )
}
