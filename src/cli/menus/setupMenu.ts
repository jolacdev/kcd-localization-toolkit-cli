import { appState } from '../../appState.ts';
import { gameFolderMenu } from './gameFolderMenu.ts';
import { languageMenu } from './languageMenu.ts';

// const handleChangeLanguage = async (
//   language: SupportedLanguage,
// ): Promise<void> => {
//   await i18next.changeLanguage(language);

//   if (i18next.resolvedLanguage === language) {
//     setStoreSetting('language', language);
//   }
// };

export const setupMenu = async () => {
  if (!appState.kcdPath) {
    await gameFolderMenu();
  }

  if (!appState.kcdPath) {
    appState.exit = true;
    return;
  }

  if (!appState.language) {
    await languageMenu();
  }

  if (!appState.language) {
    appState.exit = true;
    return;
  }
};
