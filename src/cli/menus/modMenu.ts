import i18next from 'i18next';
import path from 'path';

import { AppState } from '../../AppState.ts';
import { Folder, GameSupportedLanguage } from '../../constants/constants.ts';
import { generateLocalizationFiles } from '../../utils/generateLocalizationFiles.ts';
import { getLocalizationPakFileName } from '../../utils/pakUtils.ts';
import { prompt } from '../prompt.ts';
import { modPromptsMenu } from './modMenu/modPromptsMenu.ts';

enum OptionKey {
  CATEGORIZE_ITEMS = 'categorizeItems',
  DUAL_SUBS_ADVANCED = 'dualSubsAdvanced',
  DUAL_SUBS_BASIC = 'dualSubsBasic',
  REMOVE_TIMERS = 'removeTimers',
}

export const modMenu = async () => {
  const appState = AppState.getInstance();

  const t = i18next.getFixedT(null, null, 'moddingMenu');

  const modOptions: { title: string; value: OptionKey }[] = [
    { title: t('options.dualSubsBasic'), value: OptionKey.DUAL_SUBS_BASIC },
    {
      title: t('options.dualSubsAdvanced'),
      value: OptionKey.DUAL_SUBS_ADVANCED,
    },
    { title: t('options.categorizeItems'), value: OptionKey.CATEGORIZE_ITEMS },
    {
      title: t('options.removeTimers'),
      value: OptionKey.REMOVE_TIMERS,
    },
  ];

  const { selectedOptions } = <{ selectedOptions?: OptionKey[] }>await prompt({
    choices: modOptions,
    message: t('title'),
    min: 1,
    name: 'selectedOptions',
    type: 'multiselect',
  });

  if (!selectedOptions || !selectedOptions.length) {
    return;
  }

  const hasDualSubsBasic = selectedOptions.includes(OptionKey.DUAL_SUBS_BASIC);
  const hasDualSubsAdvanced = selectedOptions.includes(
    OptionKey.DUAL_SUBS_ADVANCED,
  );
  const hasCategories = selectedOptions.includes(OptionKey.CATEGORIZE_ITEMS);

  const { mainLanguage, secondaryLanguage, subtitleColor } =
    await modPromptsMenu({
      hasAnyDualSubs: hasDualSubsBasic || hasDualSubsAdvanced,
      hasCategories,
      hasDualSubsAdvanced,
    });

  if (!mainLanguage) {
    return;
  }

  // NOTE: Selects the language to select the _xml.pak: use secondary if provided and not English, otherwise primary.
  const selectedPakLanguage =
    secondaryLanguage && secondaryLanguage !== GameSupportedLanguage.ENGLISH
      ? secondaryLanguage
      : mainLanguage;

  const pakName = getLocalizationPakFileName(selectedPakLanguage);

  path.join(appState.gamePath!, Folder.Localization, pakName);

  generateLocalizationFiles({
    mainLanguage,
    subtitleColor,
    xmlSourcePath: path.join(appState.gamePath!, Folder.Localization, pakName),
    hasCategories,
    hasDualSubs: Boolean(mainLanguage && secondaryLanguage),
  });
};
