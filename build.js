import dotenv from 'dotenv';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

dotenv.config({ quiet: true });

const rootDir = path.dirname(new URL(import.meta.url).pathname);
const sourceDir = path.join(rootDir, 'src/static');
const outputDir = path.join(rootDir, 'public');

const replacements = new Map([
  ['__GITHUB_CLIENT_ID__', process.env.GITHUB_CLIENT_ID || ''],
  ['__GITHUB_SHA__', process.env.GITHUB_SHA || 'dev'],
]);

const applyReplacements = (content) => {
  let output = content;

  for (const [placeholder, value] of replacements) {
    output = output.replaceAll(placeholder, value);
  }

  return output;
};

const buildFile = async (relativePath) => {
  const sourcePath = path.join(sourceDir, relativePath);
  const outputPath = path.join(outputDir, relativePath);
  const content = await readFile(sourcePath, 'utf8');

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, applyReplacements(content));
};

const main = async () => {
  await buildFile('index.html');
  await buildFile('app.js');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
