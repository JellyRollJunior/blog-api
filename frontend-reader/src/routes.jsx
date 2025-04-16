import { Homepage } from './components/Homepage/Homepage.jsx';
import { SigninPage } from './components/SigninPage/SigninPage.jsx';

const routes = [
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/signin',
        element: <SigninPage />,
    },
];

export { routes };
