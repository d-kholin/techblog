import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const body = JSON.stringify(
    posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      url: `/blog/${post.id}/`,
      body: post.body,
    }))
  );
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
