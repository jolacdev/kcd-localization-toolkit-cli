import fs from 'fs';
import path from 'path';

const DIALOG_TIMER_REGEX = /time_limit="(\d+)"/g;

const xmlInputPath = path.join(
  'C:\\Users\\Kraum\\Documents\\TESTS MSI KCD XML\\Remove Timers!',
  'topic_original.xml',
);
const xmlOutputPath = path.join(
  'C:\\Users\\Kraum\\Documents\\TESTS MSI KCD XML\\Remove Timers!',
  'topic.xml',
);
const tblOutputPath = path.join(
  'C:\\Users\\Kraum\\Documents\\TESTS MSI KCD XML\\Remove Timers!',
  'topic.tbl',
);

const readXml = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  return fs.readFileSync(filePath, 'utf-8');
};

const transformXml = (content: string) => {
  const modifiedXml = content.replace(DIALOG_TIMER_REGEX, (match, p1) => {
    const num = parseInt(p1, 10);

    if (num !== 0 && num < 1000) {
      return `time_limit="0"`;
    }

    return match;
  });

  fs.writeFileSync(xmlOutputPath, modifiedXml, 'utf-8');
  fs.writeFileSync(tblOutputPath, '');
};

const xml = readXml(xmlInputPath);

if (xml) {
  transformXml(xml);
}
