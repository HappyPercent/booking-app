import { LOCAL_STORAGE_USER_CREDENTIALS_LABEL } from '../constants/localStorage';

export const getUser = () => {
	const credentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || '{}');
	return credentials;
};
