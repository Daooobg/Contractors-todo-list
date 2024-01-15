import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './components/Home/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import AppShellLayout from './components/layouts/AppShellLayout';
import UsersVerificationsPage from './components/dashboard/usersVerifications/UsersVerificationsPage';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        element: <AppShellLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'auth/login', element: <LoginPage /> },
            { path: 'auth/register', element: <RegisterPage /> },
            {
                path: 'dashboard',
                children: [
                    { index: true, element: <Dashboard /> },
                    {
                        path: 'usersVerifications',
                        element: <UsersVerificationsPage />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
