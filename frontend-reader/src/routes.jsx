import { Homepage } from './components/Homepage/Homepage.jsx';
import { PostPage } from './components/PostPage/PostPage.jsx';
import { SigninPage } from './components/SigninPage/SigninPage.jsx';
import { SignupPage } from './components/SignupPage/SignupPage.jsx';

const routes = [
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/signin',
        element: <SigninPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/posts/:postId',
        element: <PostPage />,
    },
];

export { routes };
