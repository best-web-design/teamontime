import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSettings } from '@/lib/api';

export default async function SiteLayout({ children }) {
  const s = await getSettings();
  const wa = s.whatsapp?.number?.replace(/[^\d]/g, '');
  return (
    <>
      <Header settings={s} />
      <main id="main">{children}</main>
      <Footer settings={s} />
      {wa && (
        <a className="whatsapp" href={`https://wa.me/${wa}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          {s.whatsapp.label || 'WhatsApp us'}
        </a>
      )}
    </>
  );
}
