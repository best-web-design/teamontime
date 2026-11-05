// One definition per section type. The admin builds its editor forms from these fields,
// and components/Sections.js renders each type. Add a type here + a renderer there to extend.
const cardFields = [
  { name: 'kicker', type: 'text' },
  { name: 'title', type: 'textarea' },
  { name: 'body', type: 'textarea' },
  { name: 'note', type: 'text', help: 'Small line at the bottom, e.g. OUTPUT / ...' },
  { name: 'image', type: 'image' },
  { name: 'link', type: 'link' },
];
const head = [
  { name: 'eyebrow', type: 'text' },
  { name: 'title', type: 'textarea', help: 'New line = line break' },
];

export const SECTION_TYPES = {
  hero: {
    label: 'Hero',
    fields: [
      { name: 'breadcrumb', type: 'text', help: 'e.g. HOME / SERVICES / 01 — STRATEGY' },
      { name: 'title', type: 'textarea', help: 'Page H1. New line = line break' },
      { name: 'lead', type: 'textarea' },
      { name: 'audience', type: 'textarea' },
      { name: 'primary', type: 'link', label: 'Primary button' },
      { name: 'secondary', type: 'link', label: 'Secondary button' },
      { name: 'note', type: 'text' },
      { name: 'align', type: 'select', options: ['center', 'left'] },
    ],
  },
  split: {
    label: 'Heading + text (two columns)',
    fields: [...head, { name: 'body', type: 'textarea' }, { name: 'image', type: 'image' }, { name: 'imageAlt', type: 'text' }],
  },
  cards: {
    label: 'Card grid (2 columns)',
    fields: [...head, { name: 'intro', type: 'textarea' }, { name: 'columns', type: 'select', options: ['2', '3', '4'] },
      { name: 'items', type: 'list', fields: cardFields }, { name: 'note', type: 'text' }, { name: 'cta', type: 'link', label: 'Button' }],
  },
  text: {
    label: 'Heading + text (one column)',
    fields: [...head, { name: 'body', type: 'textarea' }, { name: 'cta', type: 'link', label: 'Button' }],
  },
  logos: {
    label: 'Logo / technology strip',
    fields: [...head, { name: 'items', type: 'list', fields: [{ name: 'image', type: 'image' }, { name: 'label', type: 'text', help: 'Alt text / caption' }] },
      { name: 'style', type: 'select', options: ['marquee', 'grid'] }],
  },
  gallery: {
    label: 'Image gallery / portfolio',
    fields: [...head, { name: 'items', type: 'list', fields: [{ name: 'image', type: 'image' }, { name: 'alt', type: 'text' }, { name: 'caption', type: 'text' }] }],
  },
  integrations: {
    label: 'Integrations catalogue (filterable)',
    fields: [...head, { name: 'intro', type: 'textarea' }, { name: 'filterHelp', type: 'text' }, {
      name: 'items', type: 'list', fields: [
        { name: 'code', type: 'text', help: 'e.g. I01 / DESIGN' }, { name: 'title', type: 'text' }, { name: 'outcome', type: 'textarea' },
        { name: 'platforms', type: 'text' }, { name: 'fit', type: 'text' }, { name: 'measure', type: 'text' },
        { name: 'disciplines', type: 'text', help: 'Comma list: Design, Development, Integration, Growth' },
        { name: 'logos', type: 'list', label: 'Platform logos', fields: [{ name: 'image', type: 'image' }, { name: 'alt', type: 'text', label: 'Platform name' }] },
      ],
    }, { name: 'note', type: 'textarea' }],
  },
  journey: {
    label: 'Journey panel (steps in a panel)',
    fields: [...head, { name: 'intro', type: 'textarea' }, { name: 'steps', type: 'list', fields: cardFields },
      { name: 'boundary', type: 'text' }, { name: 'note', type: 'textarea' }, { name: 'cta', type: 'link', label: 'Button' },
      { name: 'image', type: 'image', label: 'Background image' }, { name: 'panel', type: 'bool', label: 'Show as panel', help: 'Off = full-width section' }],
  },
  steps: {
    label: 'Steps (3 columns, plain)',
    fields: [...head, { name: 'intro', type: 'textarea' }, { name: 'items', type: 'list', fields: cardFields }, { name: 'note', type: 'textarea' },
      { name: 'style', type: 'select', options: ['plain', 'card'] }],
  },
  panels: {
    label: 'Two panels',
    fields: [{
      name: 'items', type: 'list', fields: [
        { name: 'eyebrow', type: 'text' }, { name: 'title', type: 'textarea' }, { name: 'body', type: 'textarea' },
        { name: 'bullets', type: 'textarea', help: 'One per line' }, { name: 'detail', type: 'textarea', help: '**Bold lead:** rest of text' },
        { name: 'note', type: 'text' },
      ],
    }],
  },
  engagement: {
    label: 'Engagement cards',
    fields: [...head, { name: 'intro', type: 'textarea' }, {
      name: 'items', type: 'list', fields: [
        { name: 'kicker', type: 'text' }, { name: 'title', type: 'textarea' }, { name: 'value', type: 'text' }, { name: 'body', type: 'textarea' },
        { name: 'bullets', type: 'textarea', help: 'One per line' }, { name: 'cta', type: 'link' }, { name: 'note', type: 'text' }, { name: 'highlight', type: 'bool' },
      ],
    }],
  },
  faq: {
    label: 'FAQ accordion (adds FAQPage schema)',
    fields: [...head, { name: 'items', type: 'list', fields: [{ name: 'q', type: 'text', label: 'Question' }, { name: 'a', type: 'textarea', label: 'Answer' }] }],
  },
  cta: {
    label: 'Closing call to action',
    fields: [...head, { name: 'lead', type: 'textarea' }, { name: 'primary', type: 'link', label: 'Button' }, { name: 'secondary', type: 'link', label: 'Second button' }, { name: 'note', type: 'text' }],
  },
  caseStudies: {
    label: 'Case studies carousel (from News)',
    fields: [...head, { name: 'subtitle', type: 'text' }, { name: 'kind', type: 'select', options: ['case-study', 'article', 'all'] }],
  },
  table: {
    label: 'Comparison table',
    fields: [...head, { name: 'columns', type: 'textarea', help: 'One column heading per line' },
      { name: 'rows', type: 'textarea', help: 'One row per line, cells separated by |' }, { name: 'note', type: 'text' }],
  },
  richText: {
    label: 'Rich text (HTML)',
    fields: [{ name: 'html', type: 'textarea', rows: 14 }],
  },
  image: {
    label: 'Image',
    fields: [{ name: 'src', type: 'image' }, { name: 'alt', type: 'text' }, { name: 'caption', type: 'text' }],
  },
  form: {
    label: 'Form',
    fields: [...head, { name: 'intro', type: 'textarea' }, { name: 'form', type: 'select', options: ['contact', 'audit', 'newsletter'] },
      { name: 'formTitle', type: 'text' }, { name: 'items', type: 'list', label: 'Side cards', fields: [{ name: 'title', type: 'text' }, { name: 'body', type: 'textarea' }] },
      { name: 'showContact', type: 'bool', label: 'Show phone / email / address from settings' }, { name: 'support', type: 'text' },
      { name: 'submitLabel', type: 'text' }, { name: 'privacy', type: 'textarea' }, { name: 'success', type: 'textarea', help: 'First line = heading' }],
  },
  newsList: {
    label: 'News listing',
    fields: [...head],
  },
};
