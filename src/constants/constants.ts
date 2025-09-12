export enum GameSupportedLanguage {
  CHINESE = 'zh',
  CZECH = 'cs',
  ENGLISH = 'en',
  FRENCH = 'fr',
  GERMAN = 'de',
  ITALIAN = 'it',
  JAPANESE = 'ja',
  KOREAN = 'ko',
  POLISH = 'pl',
  PORTUGUESE = 'pt',
  RUSSIAN = 'ru',
  SPANISH = 'es',
  TURKISH = 'tr',
  UKRAINIAN = 'uk',
}

export enum Folder {
  Data = 'Data',
  Localization = 'Localization',
  Mod = 'Localization_Toolkit',
}

const LOCALIZATION = 'Localization\\{Language}_xml.pak\\text_*_*.xml';
const REMOVE_TIMERS = 'Data\\Tables.pak\\Libs\\Tables\\text\\topic.xml';

export enum LocalizationFile {
  Dialog = 'text_ui_dialog.xml',
  HUD = 'text_ui_HUD.xml',
  Ingame = 'text_ui_ingame.xml',
  Items = 'text_ui_items.xml',
  Menus = 'text_ui_menus.xml',
  Minigames = 'text_ui_minigames.xml',
  Misc = 'text_ui_misc.xml',
  Quest = 'text_ui_quest.xml',
  RichPresence = 'text_rich_presence.xml',
  Soul = 'text_ui_soul.xml',
  Tutorials = 'text_ui_tutorials.xml',
}
