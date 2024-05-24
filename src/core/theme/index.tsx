import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		background: {
			default: '#f5f5f5',
		},
		error: {
			main: '#A70022',
		},
		text: {
			primary: '#2E2E2E',
		},
		custom: {
			'light-orange': '#FEF9F6',
			'primary-orange': '#F55324',
			'dark-orange': '#C8421B',
			'light-grey': '#E7E7E7',
			'mid-grey': '#4A4A4A',
		},
	},
});

export default theme;
