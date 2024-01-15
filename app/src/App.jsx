import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import MainLayout from './components/layouts/MainLayout';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'auth/login', element: <LoginPage /> },
            { path: 'auth/register', element: <RegisterPage /> },
            { path: '/dashboard', element: <Dashboard /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
