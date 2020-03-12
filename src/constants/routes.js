import { Home } from "../containers/Home/Home";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/signin',
        exact: true,
        component: SignIn
    },
    {
        path: '/signup',
        exact: true,
        component: SignUp
    }
];
