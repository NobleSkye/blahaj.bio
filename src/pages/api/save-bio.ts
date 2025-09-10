import type { APIRoute } from 'astro';
import { auth } from '@/lib/auth';
import { getOctokit } from '@/lib/octokit';
import yaml from 'js-yaml';

export const post: APIRoute = async (ctx) => {
  const session = await auth.getSession(ctx.request);
  if (!session?.user?.username) {
    return new Response('Unauthorized', { status: 401 });
  }
  const form = await ctx.request.formData();
  const display_name = form.get('display_name')?.toString() || '';
  const pronouns = form.get('pronouns')?.toString() || '';
  const bio = form.get('bio')?.toString() || '';
  const linksRaw = form.get('links')?.toString() || '';
  const links = linksRaw.split('\n').map((line) => {
    const [title, url] = line.split('|').map((s) => s.trim());
    return title && url ? { title, url } : null;
  }).filter(Boolean);

  const frontmatter = {
    username: session.user.username,
    display_name,
    pronouns,
    bio,
    links
  };
  const md = `---\n${yaml.dump(frontmatter)}---\n`;

  const octokit = getOctokit();
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const path = `bios/${session.user.username}.md`;

  // Get the current file SHA if it exists
  let sha: string | undefined;
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path });
    if ('sha' in data) sha = data.sha;
  } catch (e) {}

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Update bio for ${session.user.username}`,
    content: Buffer.from(md).toString('base64'),
    sha
  });

  return Response.redirect(`/bios/${session.user.username}`);
};
