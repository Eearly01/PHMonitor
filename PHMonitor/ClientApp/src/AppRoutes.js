import ApiAuthorzationRoutes from './components/user-authentication/ApiAuthorizationRoutes';
import { Home } from './components/Home';
import { LoginPage } from './components/user-authentication/LoginPage';
import { DatabaseDisplay } from './components/DatabaseDisplay/DatabaseDisplay';
import HardwareDisplayComponent from './components/HardwareInfoPage/HardwareDisplayComponent';

const AppRoutes = [
	{
		index: true,
		element: <Home />,
	},
	{
		path: '/database',
		element: <DatabaseDisplay />,
	},
	{
		path: '/hardware-info',
		requireAuth: true,
		element: <HardwareDisplayComponent />,
	},

	{
		path: '/login',
		element: <LoginPage />,
	},
	...ApiAuthorzationRoutes,
];

export default AppRoutes;
