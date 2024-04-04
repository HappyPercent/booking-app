import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { RegisterPage } from './pages/RegisterPage';
import { LOCAL_STORAGE_USER_SETTINGS_LABEL } from './core/constants/localStorage';
import { WorkspacePage } from './pages/WorkspacePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SchedulePage from './pages/SchedulePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import uk from 'date-fns/locale/en-GB';
import { Layout } from './Layout';
import { routesList } from './routes/routesList';
import { useCoreStore } from './core/store';

//i18n always last
import i18n from './i18n';
import { isUserLoggedIn } from './core/helpers/isUserLoggedIn';

const queryClient = new QueryClient();
const defaultTheme = createTheme();

useCoreStore.subscribe(
	(state) => state.userSettings.lang,
	(value) => {
		localStorage.setItem(LOCAL_STORAGE_USER_SETTINGS_LABEL, JSON.stringify({ lang: value }));
		i18n.changeLanguage(value);
		window.location.reload();
	}
);

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
				path: '*',
				element: <Navigate to={routesList.LOGIN} replace />,
			},
		],
	},
]);

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={defaultTheme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</LocalizationProvider>
	);
}

export default App;
