import { Chip, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const AreYouPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<Container
			component='main'
			maxWidth='xl'
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				alignContent: 'center',
				justifyContent: 'space-around',
				minHeight: '100vh',
				gap: 4,
			}}
		>
			<Chip
				sx={{
					width: '50%',
					height: '60px',
					fontSize: '1.5rem',
				}}
				color='primary'
				clickable
				onClick={() => navigate('/login')}
				label={t('I provide service')}
			/>
			<Chip
				sx={{
					width: '50%',
					height: '60px',
					fontSize: '1.5rem',
				}}
				color='primary'
				clickable
				onClick={() => navigate('/find-service')}
				label={t('I look for service')}
			/>
		</Container>
	);
};
