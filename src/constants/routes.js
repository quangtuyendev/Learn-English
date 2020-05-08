import Home from '../containers/Home';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';

export const ROUTES = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/signin',
    exact: true,
    component: SignIn,
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp,
  },
];
