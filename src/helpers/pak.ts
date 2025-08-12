import path from 'path';
import process from 'process';

import { createPak } from './pack.js';
import { extractPak } from './unpack.js';

/**
 * Prints usage instructions to the console.
 */
const printUsage = (): void => {
  console.log('Usage: node pak.js <pack|unpack> <source> <target>');
};

/**
 * Resolves a path to an absolute path based on the current working directory.
 *
 * @param relativePath - Relative path to resolve
 * @returns Absolute path
 */
const resolvePath = (relativePath: string): string =>
  path.resolve(process.cwd(), relativePath);

/**
 * CLI entry point. Handles 'pack' and 'unpack' commands.
 */
export const main = async (): Promise<void> => {
  const [, , command, source, target] = process.argv;

  if (!command || !source || !target) {
    printUsage();
    process.exit(1);
  }

  const sourcePath = resolvePath(source);
  const targetPath = resolvePath(target);

  try {
    if (command === 'pack') {
      console.log(`📦 Packing folder: ${sourcePath} → ${targetPath}`);
      await createPak(targetPath, sourcePath);
      console.log('✅ PAK created successfully');
    } else if (command === 'unpack') {
      console.log(`📂 Unpacking file: ${sourcePath} → ${targetPath}`);
      await extractPak(sourcePath, targetPath);
      console.log('✅ PAK extracted successfully');
    } else {
      console.error(`❌ Unknown command: ${command}`);
      printUsage();
      process.exit(1);
    }
  } catch (error) {
    const err = error as Error;
    console.error(`💥 Error: ${err.message}`);
    process.exit(1);
  }
};
