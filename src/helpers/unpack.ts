import fs from 'fs';
import unzipper from 'unzipper';

/**
 * Extracts a .pak (ZIP) file into a target directory.
 *
 * @param pakPath - Path to the .pak file to extract
 * @param outputDir - Destination folder for extracted files
 */
export const extractPak = async (
  pakPath: string,
  outputDir: string,
): Promise<void> => {
  await fs
    .createReadStream(pakPath)
    .pipe(unzipper.Extract({ path: outputDir }))
    .promise();
};
