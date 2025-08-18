import { appState } from './appState.ts';
import { mainMenu } from './cli/menus/mainMenu.ts';
import { setupMenu } from './cli/menus/setupMenu.ts';
import { initI18n } from './config/i18n.ts';
import { getStoreSetting } from './config/store.ts';

const savedLanguage = getStoreSetting('language');
await initI18n(savedLanguage);

await setupMenu();

while (!appState.exit) {
  await mainMenu();
}
