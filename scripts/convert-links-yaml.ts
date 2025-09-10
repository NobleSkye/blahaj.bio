import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const biosDir = path.join(process.cwd(), 'src/content/bios');
const files = fs.readdirSync(biosDir).filter(f => f.endsWith('.md'));

function parseLinks(links: any): any {
  if (Array.isArray(links)) return links;
  if (typeof links === 'string') {
    // Split by line, filter empty, and convert to {title, url}
    return links.split('\n').map((line: string) => {
      const url = line.trim();
      if (!url) return null;
      let title = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      if (title.startsWith('www.')) title = title.slice(4);
      return { title, url };
    }).filter(Boolean);
  }
  return [];
}

for (const file of files) {
  const filePath = path.join(biosDir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  if (typeof data.links === 'string' && data.links.includes('http')) {
    const linksArr = parseLinks(data.links);
    data.links = linksArr;
    const newRaw = matter.stringify(content, data);
    fs.writeFileSync(filePath, newRaw, 'utf8');
    console.log('Converted:', file);
  }
}
