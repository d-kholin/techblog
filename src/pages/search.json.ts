import { getCollection } from 'astro:content';
import aboutRaw from './about.astro?raw';

function strip(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

export async function GET() {
  const posts = await getCollection('blog');
  const postEntries = posts.map((post) => ({
    type: 'post',
    title: post.data.title,
    description: post.data.description,
    url: `/blog/${post.id}/`,
    body: strip(post.body),
  }));

  const aboutBody = strip(aboutRaw.split('---').slice(2).join('---'));
  const contentEntries = [
    {
      type: 'content',
      title: 'About Me',
      description: 'All about me!',
      url: '/about/',
      body: aboutBody,
    },
  ];

  const body = JSON.stringify([...postEntries, ...contentEntries]);
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
