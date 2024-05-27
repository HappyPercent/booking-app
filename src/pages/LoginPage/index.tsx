import { Box, Button, Card, Container, InputLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FormValues } from './types';
import { LOCAL_STORAGE_USER_CREDENTIALS_LABEL } from '../../core/constants/localStorage';
import { useMutation } from '@tanstack/react-query';
import api from '../../client/api';
import { useTranslation } from 'react-i18next';
import { routesList } from '../../routes/list';

const schema = Yup.object().shape({
	username: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(6, 'Min lenght - 6 characters').required('Required'),
});

export const LoginPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const { mutateAsync: login } = useMutation((values: FormValues) => api.loginUser(values), {
		onSuccess: (res, values) => {
			if (res.ok) {
				localStorage.setItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL, JSON.stringify(values));
				const returnUrl = query.get('returnUrl') || routesList.WORKSPACE;
				navigate(returnUrl);
			} else {
				throw new Error(res.error);
			}
		},
		onError: (error) => {
			window.alert('Something went wrong. Please try again. Error code - ' + error);
		},
	});

	const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		await login(values);
		setSubmitting(false);
	};

	return (
		<Box margin={'auto'}>
			<Container component='main' maxWidth='xs'>
				<Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit} validationSchema={schema}>
					{({ values, handleSubmit, handleChange, isSubmitting, errors, touched }) => (
						<Card
							elevation={0}
							sx={{
								padding: '20px',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '24px',
								width: '450px',
							}}
						>
							<Typography component='h1' variant='h4' fontWeight={600}>
								{t('Sign in')}
							</Typography>
							<Stack direction={'row'} justifyContent={'center'} gap={1}>
								<Typography>{t("Don't have an account")}?</Typography>
								<Link
									sx={{
										cursor: 'pointer',
									}}
									onClick={() => navigate('/register')}
									variant='body1'
								>
									{t('Sign up')}
								</Link>
							</Stack>
							<Stack spacing={1} alignSelf='stretch'>
								<Typography>{t('Email')}</Typography>
								<TextField
									size='small'
									margin='normal'
									required
									fullWidth
									id='username'
									placeholder={t('Enter your email')}
									name='username'
									autoComplete='email'
									autoFocus
									value={values.username}
									onChange={handleChange}
									error={!!touched.username && !!errors.username}
									helperText={!!touched.username && errors.username}
								/>
							</Stack>
							<Stack spacing={1} alignSelf='stretch'>
								<Typography>{t('Password')}</Typography>
								<TextField
									size='small'
									margin='normal'
									required
									fullWidth
									name='password'
									placeholder={t('Enter your password')}
									type='password'
									id='password'
									autoComplete='current-password'
									value={values.password}
									onChange={handleChange}
									error={!!touched.password && !!errors.password}
									helperText={!!touched.password && errors.password}
								/>
							</Stack>
							<Button
								disableElevation
								size='large'
								disabled={isSubmitting}
								onClick={() => handleSubmit()}
								variant='contained'
								sx={{ mt: 3, alignSelf: 'flex-end', textTransform: 'none' }}
							>
								{t('Sign in')}
							</Button>
						</Card>
					)}
				</Formik>
			</Container>
		</Box>
	);
};
