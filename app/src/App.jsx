import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import MainLayout from './components/layouts/MainLayout';
import LoginPage from './components/auth/LoginPage';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'auth/login', element: <LoginPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
