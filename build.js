import dotenv from 'dotenv';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

dotenv.config({ quiet: true });

const rootDir = path.dirname(new URL(import.meta.url).pathname);
const sourceDir = path.join(rootDir, 'src/static');
const outputDir = path.join(rootDir, 'public');

const sha = process.env.GITHUB_SHA || 'dev';
const shaShort = sha.substring(0, 7);
const versionLink = sha === 'dev'
  ? ''
  : `<a target="_blank" rel="noopener noreferrer" id="versionLink" href="https://github.com/tehuel/notas.tehuel.com.ar/commit/${sha}" class="text-white">${shaShort}</a>`;

const replacements = new Map([
  ['__GITHUB_CLIENT_ID__', process.env.GITHUB_CLIENT_ID || ''],
  ['__VERSION_LINK__', versionLink],
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
