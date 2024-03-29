import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './components/Home/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import AppShellLayout from './components/layouts/AppShellLayout';
import UsersVerificationsPage from './components/dashboard/usersVerifications/UsersVerificationsPage';
import ChangeUsersPage from './components/dashboard/changeUsers/ChangeUsersPage';
import AddJobPage from './components/dashboard/addJob/AddJobPage';
import Jobs from './components/dashboard/jobs/Jobs';
import DetailsPage from './components/dashboard/details/DetailsPage';

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
                    {
                        path: 'changeUsersData',
                        element: <ChangeUsersPage />,
                    },
                    {
                        path: 'addNewJob',
                        element: <AddJobPage />,
                    },
                    {
                        path: 'jobs',
                        element: <Jobs />,
                    },
                    {
                        path: 'jobs/:id',
                        element: <DetailsPage />,
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
