import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

export const RegisterPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { mutateAsync: register } = useMutation((values: FormValues) => api.createUser(values), {
		onSuccess: (res, values) => {
			if (res.ok) {
				localStorage.setItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL, JSON.stringify(values));
				navigate(routesList.WORKSPACE);
			} else {
				throw new Error(res.error);
			}
		},
		onError: (error) => {
			window.alert(error);
		},
	});

	const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		await register(values);
		setSubmitting(false);
	};

	return (
		<Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit} validationSchema={schema}>
			{({ values, handleSubmit, handleChange, isSubmitting, errors, touched }) => (
				<Container component='main' maxWidth='xs'>
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography component='h1' variant='h5'>
							{t('Sign up')}
						</Typography>
						<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='username'
								label={t('Email Address')}
								name='username'
								autoComplete='email'
								value={values.username}
								onChange={handleChange}
								error={!!touched.username && !!errors.username}
								helperText={!!touched.username && errors.username}
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label={t('Password')}
								type='password'
								id='password'
								autoComplete='current-password'
								value={values.password}
								onChange={handleChange}
								error={!!touched.password && !!errors.password}
								helperText={!!touched.password && errors.password}
							/>
							<Button disabled={isSubmitting} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
								{t('Sign up')}
							</Button>
							<Link
								sx={{
									cursor: 'pointer',
								}}
								onClick={() => navigate('/login')}
								variant='body2'
							>
								{t('Already registered')}? {t('Sign in')}
							</Link>
						</Box>
					</Box>
				</Container>
			)}
		</Formik>
	);
};
