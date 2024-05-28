import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCoreStore } from '../store';
import { LOCAL_STORAGE_USER_CREDENTIALS_LABEL } from '../constants/localStorage';
import { LANGUAGES } from '../constants/languages';

export const Layout = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const [userExists, setUserExists] = useState<boolean>(false);
	const userLang = useCoreStore((state) => state.userSettings.lang);
	const setLanguage = useCoreStore((state) => state.setLanguage);

	useEffect(() => {
		setUserExists(() => {
			const credentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || '{}');
			return !!credentials.username && !!credentials.password;
		});
	}, [location]);

	const handleLogout = () => {
		localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL);
		navigate('/');
	};

	return (
		<Box display={'flex'} component='main' width='100vw' minWidth='100vw' minHeight={'100vh'} pb={10} position={'relative'}>
			<Box position={'absolute'} bottom={'40px'} left={'40px'} display={'flex'} flexDirection={'column'} gap={2}>
				<Select
					value={LANGUAGES.find((l) => l.name === userLang)?.name}
					onChange={(e) => setLanguage(e.target.value as string)}
					variant='standard'
					size='small'
				>
					{LANGUAGES.map((language) => (
						<MenuItem key={language.name} value={language.name}>
							{language.label}
						</MenuItem>
					))}
				</Select>
				{userExists && (
					<Typography onClick={handleLogout} style={{ cursor: 'pointer' }}>
						{t('Log out')}
					</Typography>
				)}
			</Box>
			<Outlet />
		</Box>
	);
};
