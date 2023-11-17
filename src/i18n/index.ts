import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import storeLanguageDetector from './myDetector';
import { resources } from './resources';

const detector = new LanguageDetector(null, {
	order: ['storeLanguageDetector', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
});
detector.addDetector(storeLanguageDetector);

i18n.use(LanguageDetector).use(initReactI18next).init({
	resources,
	fallbackLng: 'en',
	debug: true,
});

export default i18n;
