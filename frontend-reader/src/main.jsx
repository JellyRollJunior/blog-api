import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage } from './components/Homepage/Homepage.jsx';
import './styles/reset.css';
import './styles/global.css';

const routes = [
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/signin',
    element: <Homepage />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
