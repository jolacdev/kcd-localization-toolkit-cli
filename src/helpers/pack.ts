import fs from 'fs';
import path from 'path';
import yazl from 'yazl';

/**
 * Recursively walks through a directory and adds each file to the zip archive,
 * preserving relative paths.
 *
 * @param dir - Directory to walk
 * @param baseDir - Base directory for relative paths
 * @param zipfile - Instance of yazl.ZipFile to add files to
 */
const walk = (dir: string, baseDir: string, zipfile: yazl.ZipFile): void => {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath, baseDir, zipfile);
    } else {
      const relativePath = path.relative(baseDir, fullPath);
      zipfile.addFile(fullPath, relativePath);
    }
  }
};

/**
 * Creates a .pak file (ZIP format) from a directory.
 *
 * @param outputPath - Destination .pak file path
 * @param inputDir - Source directory to pack
 */
export const createPak = async (
  outputPath: string,
  inputDir: string,
): Promise<void> => {
  const zipfile = new yazl.ZipFile();
  walk(inputDir, inputDir, zipfile);

  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);

    zipfile.outputStream.pipe(output).on('close', resolve).on('error', reject);

    zipfile.end();
  });
};
