'use client';
import { use } from 'react';
import DocEditor from '../../DocEditor';
export default function EditPost({ params }) {
  const { id } = use(params);
  return <DocEditor kind="posts" id={id} metaFields={[
    { name: 'kind', type: 'select', options: ['article', 'case-study'] },
    { name: 'category', type: 'text', help: 'Shown on cards and used for News filters' },
    { name: 'excerpt', type: 'textarea', help: 'Card summary and default meta description' },
    { name: 'cover', type: 'image', label: 'Cover image' },
    { name: 'status', type: 'text', help: 'Small label under card, e.g. "Illustrative case-study preview"' },
    { name: 'author', type: 'text' },
    { name: 'publishedAt', type: 'text', help: 'YYYY-MM-DD' },
  ]} />;
}
