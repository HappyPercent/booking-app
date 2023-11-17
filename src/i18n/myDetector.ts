import { useCoreStore } from '../core/store';

const storeLanguageDetector = {
	name: 'storeLanguageDetector',

	lookup() {
		const storeLang = useCoreStore.getState().userSettings.lang;
		return storeLang || 'en-GB';
	},

	cacheUserLanguage(lng: string) {
		const storeLang = useCoreStore.getState().userSettings.lang;
		if (lng !== storeLang) {
			useCoreStore.getState().setLanguage(lng);
		}
	},
};

export default storeLanguageDetector;
