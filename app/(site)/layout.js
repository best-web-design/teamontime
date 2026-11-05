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
        <a className="whatsapp" href={`https://wa.me/${wa}`} target="_blank" rel="noopener">
          <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <path d="M16 3.5A12.5 12.5 0 0 0 5.2 22.3L3.5 28.5l6.4-1.7A12.5 12.5 0 1 0 16 3.5Z" />
            <path d="M11.6 9.8c.4-.4 1.2-.4 1.5.1l1.3 2.4c.2.4.1.9-.2 1.2l-.9.8c.8 1.7 2.1 3 3.8 3.9l.8-.9c.3-.3.8-.4 1.2-.2l2.4 1.3c.5.3.5 1.1.1 1.5l-1 1c-.8.8-2 1-3 .6-3.6-1.4-6.4-4.2-7.8-7.8-.4-1-.2-2.2.6-3Z" />
          </svg>
          <span>{s.whatsapp.label || 'Chat with support'}<small>WhatsApp</small></span>
        </a>
      )}
    </>
  );
}
