import { createTheme } from '@mui/material';

const theme = createTheme({
	typography: {
		fontFamily: 'Inter, sans-serif',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			@font-face {
			  font-family: 'Inter';
			  font-style: normal;
			  font-display: swap;
			  font-weight: 400;
			}
		  `,
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiInputBase-input::placeholder': {
						color: '#4A4A4A',
						opacity: 1,
					},
				},
			},
		},
	},
	palette: {
		primary: {
			main: '#343434',
		},
		secondary: {
			main: '#C8421B',
		},
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
