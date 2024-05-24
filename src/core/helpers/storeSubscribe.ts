import { LOCAL_STORAGE_USER_SETTINGS_LABEL } from '../constants/localStorage';
import { useCoreStore } from '../store';
import i18n from '../../i18n';

export const storeSubscribe = () => {
	useCoreStore.subscribe(
		(state) => state.userSettings.lang,
		(value) => {
			localStorage.setItem(LOCAL_STORAGE_USER_SETTINGS_LABEL, JSON.stringify({ lang: value }));
			i18n.changeLanguage(value);
			window.location.reload();
		}
	);
};
