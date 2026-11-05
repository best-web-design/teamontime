// Initial site settings — copy from the Figma shared header, footer and mega menu. Edited later in Admin → Settings.
const services = [
  ['01', 'Strategy, UX & Conversion', 'services/strategy-ux-conversion'],
  ['02', 'Websites & Digital Products', 'services/websites-digital-products'],
  ['03', 'Systems Integration & Automation', 'services/systems-integration-automation'],
  ['04', 'AI Integration', 'services/ai-integration'],
  ['05', 'Growth Marketing & CRO', 'services/growth-marketing-cro'],
  ['06', 'Dynamic QR Experiences', 'services/dynamic-qr-experiences'],
];

module.exports = {
  siteName: 'Best Web Design',
  siteUrl: 'https://bestwebdesign.co.za',
  logo: '/assets/figma/logo-mark.png',
  logoFooter: '/assets/figma/logo-footer.png',
  favicon: '',
  notifyEmail: '',
  areaServed: 'ZA',
  contact: { phone: '+27 10 753 2316', email: 'info@bestwebdesign.co.za', address: '23 Mulbarton, Robindale\nRandburg, Gauteng, 2194\nSouth Africa' },
  whatsapp: { number: '', label: 'Chat with support' },
  socials: [],
  seo: {
    titleTemplate: '%s | Best Web Design',
    defaultTitle: 'Best Web Design — Connected digital delivery',
    defaultDescription: 'Connected digital delivery for established businesses: strategy and UX, websites, systems integration, AI, growth marketing and dynamic QR experiences.',
    lang: 'en-ZA',
    locale: 'en_ZA',
  },
  robotsTxt: '',
  llmsTxt: '',
  organizationSchema: '',
  nav: {
    links: [
      { label: 'Services', mega: true },
      { label: 'Integrations', href: '/integrations' },
      { label: 'How we work', href: '/how-we-work' },
      { label: 'News', href: '/news' },
      { label: 'Contact', href: '/contact' },
    ],
    ctas: [
      { label: "Let's talk", href: '/contact', style: 'primary' },
      { label: 'Free Audit', href: '/free-audit', style: 'accent' },
    ],
  },
  mega: services.map(([n, title, href]) => ({ kicker: `${n} / SERVICE`, title, href: `/${href}` })),
  footer: {
    tagline: 'Connected digital delivery\nfor established businesses.',
    columns: [
      { title: 'Services', links: services.map(([, label, href]) => ({ label, href: `/${href}` })) },
      { title: 'Work with us', links: [
        { label: 'Scoped projects', href: '/scoped-projects' },
        { label: '12-month partnerships', href: '/digital-growth-partnerships' },
        { label: 'Contact', href: '/contact' },
      ] },
      { title: 'BWD', links: [
        { label: 'Our approach', href: '/how-we-work' },
        { label: 'News', href: '/news' },
        { label: 'South Africa' },
      ] },
    ],
    legal: `© ${new Date().getFullYear()} Best Web Design Pty Ltd. All rights reserved.`,
    legalLinks: [{ label: 'Privacy Notice', href: '/privacy' }, { label: 'Terms', href: '/terms' }],
  },
};
