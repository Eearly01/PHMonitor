import ApiAuthorzationRoutes from './components/user-authentication/ApiAuthorizationRoutes';
import { Counter } from './components/Counter';
import FetchData from './components/FetchData';
import { Home } from './components/Home';
import { LoginPage } from './components/user-authentication/LoginPage';

const AppRoutes = [
	{
		index: true,
		element: <Home />,
	},
	{
		path: '/counter',
		element: <Counter />,
	},
	{
		path: '/fetch-data',
		requireAuth: true,
		element: <FetchData />,
	},

	{
		path: '/login',
		element: <LoginPage />,
	},
	...ApiAuthorzationRoutes,
];

export default AppRoutes;
