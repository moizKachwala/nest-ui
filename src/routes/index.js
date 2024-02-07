import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {selectAuthenticated} from '../store/selectors/session';
import { ChatPage } from "../pages/ChatPage";
import { LoginPage } from "../pages/LoginPage";
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import HomePage from 'pages/HomePage/HomePage';

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
            <Route path="*" element={<Navigate to="/chat" replace /> } />
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        )}
      </Routes>
    )
}