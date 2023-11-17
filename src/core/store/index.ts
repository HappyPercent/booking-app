import { create } from 'zustand';
import { Store } from './types';
import { subscribeWithSelector } from 'zustand/middleware';
import { LOCAL_STORAGE_USER_SETTINGS_LABEL } from '../constants/localStorage';

export const useCoreStore = create(
	subscribeWithSelector<Store>((set) => ({
		userSettings: {
			lang: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_SETTINGS_LABEL) || '{}').lang || 'en-GB',
		},
		setLanguage: (lang: string) =>
			set((state) => ({
				...state,
				userSettings: { ...state.userSettings, lang },
			})),
	}))
);
