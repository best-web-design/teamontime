'use client';
import { use } from 'react';
import DocEditor from '../../DocEditor';
export default function EditPost({ params }) {
  const { id } = use(params);
  return <DocEditor kind="posts" id={id} contentFields={[
    { name: 'excerpt', type: 'textarea', label: 'Short description', help: 'Shown on blog cards, under the title and as the default meta description (aim for 140–160 characters)' },
    { name: 'cover', type: 'image', label: 'Featured image (1200×630 works for social sharing too)' },
    { name: 'coverAlt', type: 'text', label: 'Featured image alt text' },
    { name: 'content', type: 'richtext', label: 'Content', help: 'Use H2/H3 for headings; they also build the article outline for SEO.' },
  ]} metaFields={[
    { name: 'kind', type: 'select', options: ['article', 'case-study'], help: 'Article = blog post' },
    { name: 'category', type: 'text', help: 'One main category, used for the blog filter' },
    { name: 'tags', type: 'tags' },
    { name: 'author', type: 'text' },
    { name: 'publishedAt', type: 'text', help: 'YYYY-MM-DD' },
    { name: 'status', type: 'text', help: 'Optional small label under the card' },
  ]} />;
}
