import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
const router = createBrowserRouter([
    { path: '/', id: 'root', children: [{ index: true, element: <HomePage /> }] },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
