import fs from 'fs';
import path from 'path';

import { Folder, LocalizationFile } from '../constants/constants.ts';

// 1- Categorize items (Quest - Lost key, Food - Bread) *Multi-language support
// 2- Dual Subs (KI - Text options can exceed option box at 4 lines)
// 3- Colorize alternative language (&lt;font color='#fcf795'&gt;) (KI - Selected texts lose the color)
// 3.1 - Allow custom color?
// 4- Allow language prefix "[EN] - Some text..."
// 5- Remove dialog timers

// NOTE: Check mods: KCD Bilingual Generator and A Sorted Inventory

// Run: node --experimental-transform-types --loader ts-node .\src\utils\test.ts

const LESS_THAN = '&lt;';
const GREATER_THAN = '&gt;';
const BR = `${LESS_THAN}br/${GREATER_THAN}`;
// const FONT_START = `${LESS_THAN}font color='#fcf795'${GREATER_THAN}`;
// const FONT_END = `${LESS_THAN}font/${GREATER_THAN}`;

const addTextWithColor = (text: string, color?: string) => {
  if (!color) {
    return text;
  }

  return `${LESS_THAN}font color='${color}'${GREATER_THAN}${text}${LESS_THAN}/font${GREATER_THAN}`;
};

const ORIGINAL_XMLS_FOLDER_PATH =
  'C:\\Users\\Kabocha\\Desktop\\Pruebas KCD XML\\Spanish_xml';

const pakPath = path.join(process.cwd(), Folder.Mod, Folder.Localization);

// Cargar el XML original como texto
fs.mkdirSync(pakPath, { recursive: true });

Object.values(LocalizationFile).forEach((file) => {
  const xmlPath = path.join(ORIGINAL_XMLS_FOLDER_PATH, file);

  if (!fs.existsSync(pakPath) || !fs.existsSync(xmlPath)) {
    return;
  }

  const xml = fs.readFileSync(xmlPath, 'utf-8');

  const modifiedXml = xml.replace(
    /<Row>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<\/Row>/g,
    (match, id, english, translation) => {
      if (translation.includes(english)) {
        return match;
      }

      if (
        file === LocalizationFile.Menus ||
        file === LocalizationFile.Items ||
        file === LocalizationFile.Ingame
      ) {
        // Temp
        return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english} / ${translation}</Cell></Row>`;
      }

      // if (file === LocalizationFile.Dialog || file === LocalizationFile.Quest) {
      return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english}${BR}${addTextWithColor(translation, '#F7E095')}</Cell></Row>`;
      // }

      // return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english} / ${translation}</Cell></Row>`;
    },
  );

  const xmlOutputPath = path.join(pakPath, file);

  fs.writeFileSync(xmlOutputPath, modifiedXml, 'utf-8');
});

// let xml = fs.readFileSync(
//   'C:\\Users\\Kabocha\\Desktop\\Pruebas KCD XML\\Spanish_xml\\text_ui_ingame.xml',
//   'utf-8',
// );

// xml = xml.replace(
//   /<Row>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<\/Row>/g,
//   (match, id, english, translation) => {
//     if (translation.includes(english)) {
//       return match; // ya está concatenado
//     }
//     return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english} / ${translation}</Cell></Row>`;
//   },
// );

// fs.writeFileSync(`${pakPath}\\text_ui_ingame.xml`, xml, 'utf-8');
