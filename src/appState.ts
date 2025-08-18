import { SupportedLanguage } from './config/i18n.ts';

type AppState = {
  exit: boolean;
  kcdPath: null | string;
  language: null | SupportedLanguage;
};

export const appState: AppState = {
  exit: false,
  kcdPath: null,
  language: null,
};
