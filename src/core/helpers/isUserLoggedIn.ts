import { LOCAL_STORAGE_USER_CREDENTIALS_LABEL } from '../constants/localStorage';

export const isUserLoggedIn = () => {
	const credentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || '{}');
	return credentials.username && credentials.password;
};
