import { GameSupportedLanguage } from '../../constants/constants.ts';

const LESS_THAN = '&lt;';
const GREATER_THAN = '&gt;';
const BR = `${LESS_THAN}br/${GREATER_THAN}`;

const addCategory = (id: string, text: string) => {
  if (!id || !text) {
    return text;
  }

  // Search mapped categories by id.
  //   const category = categoriesMap[id]
};

const addPrefix = (text: string, language: GameSupportedLanguage) => {
  if (!text) {
    return text;
  }

  return `[${language.toUpperCase()}] - ${text}`;
};

const addColor = (text: string, color: string) => {
  if (!text || !color) {
    return text;
  }

  return `${LESS_THAN}font color='${color}'${GREATER_THAN}${text}${LESS_THAN}/font${GREATER_THAN}`;
};

const transformXml = (content: string): string => {
  content.replace(
    /<Row>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<\/Row>/g,
    (match, id, english, translation) => {
      if (translation.includes(english)) {
        return match;
      }

      return '';

      //   if (
      //     file === LocalizationFile.Menus ||
      //     file === LocalizationFile.Items ||
      //     file === LocalizationFile.Ingame
      //   ) {
      //     // Temp
      //     return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english} / ${translation}</Cell></Row>`;
      //   }

      //   // if (file === LocalizationFile.Dialog || file === LocalizationFile.Quest) {
      //   return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english}${BR}${addTextWithColor(translation, '#F7E095')}</Cell></Row>`;
      //   // }
    },
  );

  return content;
};
