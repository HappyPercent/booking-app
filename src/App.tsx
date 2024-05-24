import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import uk from 'date-fns/locale/en-GB';

import theme from './core/theme';
import router from './routes/router';
import { storeSubscribe } from './core/helpers/storeSubscribe';

const queryClient = new QueryClient();
storeSubscribe();

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</LocalizationProvider>
	);
}

export default App;
