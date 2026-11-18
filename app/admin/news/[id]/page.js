'use client';
import { use } from 'react';
import DocEditor from '../../DocEditor';
export default function EditPost({ params }) {
  const { id } = use(params);
  return <DocEditor kind="posts" id={id} contentFields={[
    { name: 'excerpt', type: 'textarea', label: 'Short description', help: 'Shown on blog cards, under the title and as the default meta description (aim for 140–160 characters)' },
    { name: 'cover', type: 'image', label: 'Featured image (1200×630 works for social sharing too)' },
    { name: 'coverAlt', type: 'text', label: 'Featured image alt text' },
    { name: 'coverCaption', type: 'text', label: 'Image caption', help: 'Shown under the featured image on the article page' },
    { name: 'figureLabel', type: 'text', label: 'Figure label', help: 'Optional three-step figure at the top of the article (replaces the featured image on the page)' },
    { name: 'figure', type: 'list', label: 'Figure steps', fields: [{ name: 'kicker', type: 'text' }, { name: 'title', type: 'text' }, { name: 'body', type: 'textarea' }] },
    { name: 'figureCaption', type: 'text' },
    { name: 'summaryLabel', type: 'text', label: 'Summary label', help: 'e.g. THE SHORT ANSWER or EXECUTIVE SUMMARY' },
    { name: 'summary', type: 'textarea', label: 'Summary', help: '40–100 words shown in a card above the article' },
    { name: 'facts', type: 'list', label: 'Facts card', fields: [{ name: 'label', type: 'text' }, { name: 'value', type: 'text' }] },
    { name: 'toc', type: 'textarea', label: 'On this page (optional)', help: 'One line per entry: Label | #anchor. Empty = built from the H2 headings.' },
    { name: 'content', type: 'richtext', label: 'Content', help: 'Use H2/H3 for headings; they also build the article outline for SEO.' },
  ]} metaFields={[
    { name: 'kind', type: 'select', options: ['article', 'case-study'], help: 'Article = blog post' },
    { name: 'category', type: 'text', help: 'One main category, used for the blog filter' },
    { name: 'tags', type: 'tags' },
    { name: 'eyebrow', type: 'text', help: 'Small green line above the title, e.g. TRENDS / CONTENT & GROWTH' },
    { name: 'author', type: 'text' },
    { name: 'authorRole', type: 'text', label: 'Author role' },
    { name: 'authorBio', type: 'textarea', label: 'Author bio' },
    { name: 'publishedAt', type: 'text', help: 'YYYY-MM-DD' },
    { name: 'status', type: 'text', help: 'Optional small label under the card' },
    { name: 'unlisted', type: 'bool', help: 'Open by its link only: hidden from news lists, tag pages, llms.txt and the sitemap' },
  ]} />;
}
