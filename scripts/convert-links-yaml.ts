import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const biosDir = path.join(process.cwd(), 'bios');

async function migrate() {
  const files = await fs.readdir(biosDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(biosDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    const match = content.match(/^---([\s\S]+?)---/);
    if (!match) continue;
    const frontmatter = yaml.load(match[1]);
    if (frontmatter && typeof frontmatter === 'object' && 'links' in frontmatter && !Array.isArray(frontmatter.links)) {
      frontmatter.links = Object.entries(frontmatter.links).map(([title, url]) => ({ title, url }));
      const newFront = yaml.dump(frontmatter);
      const newContent = `---\n${newFront}---${content.slice(match[0].length)}`;
      await fs.writeFile(filePath, newContent);
      console.log(`Migrated: ${file}`);
    }
  }
}

migrate();
