import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import MainLayout from './components/layouts/MainLayout';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        element: <MainLayout />,
        children: [{ index: true, element: <HomePage /> }],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
