import { notFound } from 'next/navigation';
import Sections from '@/components/Sections';
import { getPage, getSettings } from '@/lib/api';
import { buildMetadata, buildJsonLd, JsonLd } from '@/lib/seo';

// 'home' is the stored slug for '/'.
const toSlug = (parts) => (parts?.length ? parts.join('/') : 'home');
const toPath = (slug) => (slug === 'home' ? '/' : `/${slug}`);

export async function generateMetadata({ params }) {
  const slug = toSlug((await params).slug);
  const [page, s] = await Promise.all([getPage(slug), getSettings()]);
  return page ? buildMetadata(page, s, toPath(slug)) : {};
}

export default async function CmsPage({ params }) {
  const slug = toSlug((await params).slug);
  const [page, s] = await Promise.all([getPage(slug), getSettings()]);
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildJsonLd(page, s, toPath(slug))} />
      <Sections sections={page.sections} />
    </>
  );
}
