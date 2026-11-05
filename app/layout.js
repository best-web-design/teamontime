import Script from 'next/script';
// Self-hosted fonts (no request to Google at runtime or build time).
import '@fontsource/unbounded/latin-600.css';
import '@fontsource/unbounded/latin-700.css';
import '@fontsource/public-sans/latin-400.css';
import '@fontsource/public-sans/latin-600.css';
import '@fontsource/public-sans/latin-700.css';
import './globals.css';
import { getSettings, siteUrl } from '@/lib/api';


export const dynamic = 'force-dynamic'; // every page reads live CMS data from MySQL

export async function generateMetadata() {
  const s = await getSettings();
  const seo = s.seo || {};
  return {
    metadataBase: new URL(siteUrl(s)),
    title: { default: seo.defaultTitle || s.siteName || 'Best Web Design', template: seo.titleTemplate || `%s | ${s.siteName || 'Best Web Design'}` },
    description: seo.defaultDescription,
    openGraph: { siteName: s.siteName, type: 'website', images: seo.ogImage ? [seo.ogImage] : undefined, locale: seo.locale || 'en_ZA' },
    twitter: { card: 'summary_large_image', site: seo.twitter || undefined },
    icons: s.favicon ? { icon: s.favicon } : undefined,
    robots: process.env.SITE_NOINDEX === '1' ? { index: false, follow: false } : undefined,
    verification: { google: seo.googleVerification || undefined, other: seo.bingVerification ? { 'msvalidate.01': seo.bingVerification } : undefined },
  };
}

export default async function RootLayout({ children }) {
  const s = await getSettings();
  const gtm = s.seo?.gtmId;
  const ga = s.seo?.gaId;
  return (
    <html lang={s.seo?.lang || 'en-ZA'}>
      <body>
        {children}
        {gtm && /^GTM-[A-Z0-9]+$/.test(gtm) && (
          <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>
        )}
        {ga && /^G-[A-Z0-9]+$/.test(ga) && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
