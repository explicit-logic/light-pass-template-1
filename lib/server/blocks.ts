import fs from 'node:fs/promises';
import path from 'node:path';

export async function readSlugs(locale: string) {
  const dirContent = await fs.readdir(path.join(process.cwd(), './data', locale), { withFileTypes: true });
  const directories = dirContent
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  return directories;
}

export async function readOneFile(locale: string, slug: string) {
  const fullPath = path.join(process.cwd(), 'data', locale, slug, `${slug}.json`);
  const str = await fs.readFile(fullPath, 'utf-8');
  const file = parse(str);

  return file;
}

export async function readAllFiles(locale: string): Promise<Record<string, BlocksList>> {
  const slugs = await readSlugs(locale);

  const allBlocks: Record<string, BlocksList> = {};

  for (const slug of slugs) {
    const file = await readOneFile(locale, slug);
    allBlocks[slug] = file;
  }

  return allBlocks;
}


function parse(raw: string) {
  try {
    return JSON.parse(raw) as BlocksList;
  } catch {
    return [];
  }
}
