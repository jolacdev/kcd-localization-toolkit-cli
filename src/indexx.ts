import path from 'path';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline/promises';

import { createPak } from './helpers/pack.ts';
import { extractPak } from './helpers/unpack.ts';

const rl = readline.createInterface({ input, output });

/**
 * Ask a question and return user's input
 * @param question Question to show
 */
const ask = async (question: string): Promise<string> => {
  const answer = await rl.question(question);
  return answer.trim();
};

const resolvePath = (p: string): string => path.resolve(process.cwd(), p);

const main = async () => {
  try {
    console.log('Select operation:');
    console.log('1) Pack folder → .pak file');
    console.log('2) Unpack .pak file → folder');

    let operation: 'pack' | 'unpack' | null = null;
    while (!operation) {
      const opInput = await ask('Enter 1 or 2: ');
      if (opInput === '1') {
        operation = 'pack';
      } else if (opInput === '2') {
        operation = 'unpack';
      } else {
        console.log('Invalid input. Please enter 1 or 2.');
      }
    }

    let source = '';
    while (!source) {
      source = await ask(
        operation === 'pack'
          ? 'Enter folder path to pack: '
          : 'Enter .pak file path to unpack: ',
      );
      if (!source) {
        console.log('Path cannot be empty.');
      }
    }

    let target = '';
    while (!target) {
      target = await ask(
        operation === 'pack'
          ? 'Enter output .pak file path: '
          : 'Enter output folder path: ',
      );
      if (!target) {
        console.log('Path cannot be empty.');
      }
    }

    const sourcePath = resolvePath(source);
    const targetPath = resolvePath(target);

    if (operation === 'pack') {
      console.log(`Packing folder: ${sourcePath} → ${targetPath}`);
      await createPak(targetPath, sourcePath);
      console.log('PAK created successfully!');
    } else {
      console.log(`Unpacking file: ${sourcePath} → ${targetPath}`);
      await extractPak(sourcePath, targetPath);
      console.log('PAK extracted successfully!');
    }
  } catch (error) {
    const err = error as Error;
    console.error(`Error: ${err.message}`);
  } finally {
    rl.close();
  }
};

main();
