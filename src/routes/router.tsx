import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import { routesList } from './list';
import { Layout } from '../core/components/Layout';
import { WorkspacePage } from '../pages/WorkspacePage';
import { isUserLoggedIn } from '../core/helpers/isUserLoggedIn';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import SchedulePage from '../pages/SchedulePage';

const noUserLoader = () => {
	if (!isUserLoggedIn()) {
		return redirect(routesList.LOGIN);
	}
	return null;
};

const existentUserLoader = () => {
	if (isUserLoggedIn()) {
		return redirect(routesList.WORKSPACE);
	}
	return null;
};

const router = createBrowserRouter([
	{
		path: routesList.BASE,
		element: <Layout />,
		children: [
			{
				path: routesList.WORKSPACE,
				element: <WorkspacePage />,
				loader: noUserLoader,
			},
			{
				path: routesList.LOGIN,
				element: <LoginPage />,
				loader: existentUserLoader,
			},
			{
				path: routesList.REGISTER,
				element: <RegisterPage />,
				loader: existentUserLoader,
			},
			{
				path: routesList.SCHEDULE,
				element: <SchedulePage />,
			},
			{
				path: '/',
				element: <Navigate to={routesList.LOGIN} replace />,
			},
			{
				path: '*',
				element: <Navigate to={routesList.LOGIN} replace />,
			},
		],
	},
]);

export default router;
