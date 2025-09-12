import fs from 'fs';
import path from 'path';

import { Folder, LocalizationFile } from '../../constants/constants.ts';

const LESS_THAN = '&lt;';
const GREATER_THAN = '&gt;';
const BR = `${LESS_THAN}br/${GREATER_THAN}`;

// ---------- Helpers ----------
const addTextWithColor = (text: string, color?: string) => {
  if (!color) {
    return text;
  }
  return `${LESS_THAN}font color='${color}'${GREATER_THAN}${text}${LESS_THAN}/font${GREATER_THAN}`;
};

const readXml = (filePath: string): string | undefined => {
  if (!fs.existsSync(filePath)) {
    return;
  }
  return fs.readFileSync(filePath, 'utf-8');
};

const writeXml = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
};

const writeEmptyTbl = (xmlOutputPath: string) => {
  const baseName = path.basename(xmlOutputPath, path.extname(xmlOutputPath));
  const tblFile = path.join(path.dirname(xmlOutputPath), `${baseName}.tbl`);
  fs.writeFileSync(tblFile, '');
};

// ---------- Transformers ----------
const removeDialogTimers = (content: string): string => {
  const regex = /time_limit="(\d+)"/g;
  return content.replace(regex, (match, p1) => {
    const num = parseInt(p1, 10);
    if (num !== 0 && num < 1000) {
      return `time_limit="0"`;
    }
    return match;
  });
};

const addDualSubs = (content: string, file: LocalizationFile): string =>
  content.replace(
    /<Row>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<Cell>([\s\S]*?)<\/Cell>\s*<\/Row>/g,
    (match, id, english, translation) => {
      if (translation.includes(english)) {
        return match;
      }

      if (
        [
          LocalizationFile.Menus,
          LocalizationFile.Items,
          LocalizationFile.Ingame,
        ].includes(file)
      ) {
        return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english} / ${translation}</Cell></Row>`;
      }

      return `<Row><Cell>${id}</Cell><Cell>${addTextWithColor(english)}</Cell><Cell>${english}${BR}${addTextWithColor(translation, '#F7E095')}</Cell></Row>`;
    },
  );

// ---------- Core Processor ----------
type Transformer = (content: string) => string;

interface ProcessOptions {
  inputPath: string;
  outputPath: string;
  transformers: Transformer[];
  shouldGenerateTbl?: boolean;
}

const processXmlFile = (options: ProcessOptions) => {
  const { inputPath, outputPath, transformers, shouldGenerateTbl } = options;

  const xml = readXml(inputPath);
  if (!xml) {
    return;
  }

  const transformed = transformers.reduce((acc, fn) => fn(acc), xml);

  writeXml(outputPath, transformed);

  if (shouldGenerateTbl) {
    writeEmptyTbl(outputPath);
  }
};

// ---------- Example Usage ----------
const ORIGINAL_XMLS_FOLDER_PATH =
  'C:\\Users\\Kabocha\\Desktop\\Pruebas KCD XML\\Spanish_xml';
const pakPath = path.join(process.cwd(), Folder.Mod, Folder.Localization);

Object.values(LocalizationFile).forEach((file) => {
  const xmlPath = path.join(ORIGINAL_XMLS_FOLDER_PATH, file);
  const outputPath = path.join(pakPath, file);

  processXmlFile({
    inputPath: xmlPath,
    outputPath,
    transformers: [(c) => addDualSubs(c, file)], // puedes añadir más en cadena
  });
});

// Ejemplo con timers:
processXmlFile({
  inputPath: 'C:\\...\\topic_original.xml',
  outputPath: 'C:\\...\\topic.xml',
  transformers: [removeDialogTimers],
  shouldGenerateTbl: true,
});
