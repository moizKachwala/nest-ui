import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
import { ChatPage } from "../pages/ChatPage";
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <ChatPage />
        },
        {
            path: 'register',
            element: <ChatPage />
        }
    ]
};

export default LoginRoutes;
