export interface Store {
  userSettings: User;
  setLanguage: (lang: string) => void;
}

export interface User {
  lang: string;
}
