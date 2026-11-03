'use client';
import { use } from 'react';
import DocEditor from '../../DocEditor';
export default function EditPage({ params }) {
  const { id } = use(params);
  return <DocEditor kind="pages" id={id} metaFields={[
    { name: 'template', type: 'select', options: ['default', 'service', 'engagement', 'industry'], help: 'Service adds Service schema' },
    { name: 'order', type: 'text', help: 'Sort order in lists and sitemap' },
  ]} />;
}
