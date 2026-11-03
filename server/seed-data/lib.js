// Small builders so seed pages read like the Figma frames. Output is plain { type, data } sections.
const L = (label, href) => ({ label, href });
const LINKS = {
  contact: '/contact', audit: '/free-audit', projects: '/scoped-projects', partnership: '/digital-growth-partnerships',
  howWeWork: '/how-we-work', integrations: '/integrations', news: '/news',
  strategy: '/services/strategy-ux-conversion', websites: '/services/websites-digital-products',
  systems: '/services/systems-integration-automation', ai: '/services/ai-integration',
  growth: '/services/growth-marketing-cro', qr: '/services/dynamic-qr-experiences',
};
const s = (type, data) => ({ type, data });
const hero = (breadcrumb, title, lead, primary, secondary, note, extra = {}) => s('hero', { breadcrumb, title, lead, primary, secondary, note, align: 'center', ...extra });
const cards = (eyebrow, title, items, extra = {}) => s('cards', { eyebrow, title, items: items.map(([kicker, t, body]) => ({ kicker, title: t, body })), ...extra });
const faq = (eyebrow, title, items) => s('faq', { eyebrow, title, items: items.map(([q, a]) => ({ q, a })) });
const cta = (eyebrow, title, lead, primary, note, secondary) => s('cta', { eyebrow, title, lead, primary, secondary, note });
const steps3 = (eyebrow, title, items, extra = {}) => s('steps', { eyebrow, title, items: items.map(([kicker, t, body, note]) => ({ kicker, title: t, body, note })), ...extra });
const caseStudies = (eyebrow, title) => s('caseStudies', { eyebrow, title, subtitle: 'Case studies', kind: 'case-study' });

const seo = (metaTitle, metaDescription) => ({ metaTitle, metaDescription });

// Shared engagement cards (Figma "BWD / Engagement card", project + partnership variants).
const engagement = (intro, projectValue = 'From R50,000', opts = {}) => s('engagement', {
  eyebrow: opts.eyebrow || 'A CLEAR COMMERCIAL START',
  title: opts.title || 'Choose the right engagement.',
  intro,
  items: [
    { kicker: opts.k1 || '01 / SCOPED PROJECT', value: projectValue,
      body: opts.b1 || 'Requirements, priorities, deliverables and acceptance criteria agreed upfront. The right skills and integrations form one scope.',
      cta: L(opts.c1 || 'Discuss your project', opts.h1 || LINKS.projects), note: opts.n1 || 'Final investment and VAT treatment are confirmed in your proposal.' },
    { kicker: opts.k2 || '02 / CONTINUING PARTNERSHIP', value: '12 months', highlight: true,
      body: opts.b2 || 'A focused first 90 days, defined KPIs and agreed priorities. Monthly reviews and quarterly planning keep the work aligned.',
      cta: L(opts.c2 || 'Explore the partnership', LINKS.partnership), note: opts.n2 || 'A tailored monthly fee. The first 90 days form part of the annual commitment.' },
  ],
});

// P02–P07 share one layout.
function service(o) {
  return {
    slug: o.slug, title: o.title, template: 'service', order: o.order, seo: o.seo,
    sections: [
      hero(o.crumb, o.h1, o.lead, o.primary, o.secondary, o.note),
      s('split', { eyebrow: 'START WITH THE BUSINESS TASK', title: o.priority[0], body: o.priority[1], image: o.priorityImage || '', imageAlt: o.priorityImageAlt || '' }),
      ...(o.before || []),
      cards('THE RIGHT MIX OF CAPABILITIES', o.capTitle, o.caps, o.capExtra),
      ...(o.afterCaps || []),
      s('journey', { eyebrow: 'HOW THE WORK CONNECTS', title: o.journey.title, intro: o.journey.intro,
        steps: o.journey.steps.map(([kicker, title, body]) => ({ kicker, title, body })), boundary: o.journey.boundary, note: o.journey.note }),
      steps3('FROM PRIORITY TO IMPLEMENTATION', o.delivery.title, o.delivery.items),
      s('panels', { items: [
        { eyebrow: 'WHAT YOU CAN EXPECT', title: o.scope.title, body: o.scope.body },
        { eyebrow: 'AGREE THE BASELINE', title: o.measure.title, bullets: o.measure.kpis.join('\n'), detail: o.measure.detail,
          note: 'For each KPI: definition, baseline, source, owner and review date. Targets follow discovery.' },
      ] }),
      engagement(o.engagement.intro, o.engagement.value),
      faq('BEFORE WE BEGIN', 'A few useful answers.', o.faqs),
      cta('LET’S DEFINE YOUR NEXT MOVE', o.closing.title, o.closing.lead, o.primary, o.closing.note || o.note),
      caseStudies(o.caseEyebrow || 'CONNECTED EXPERIENCES', o.caseTitle || 'What this can\nlook like in practice.'),
    ],
  };
}

// P17–P21 share one layout.
function industry(o) {
  return {
    slug: o.slug, title: o.title, template: 'industry', order: o.order, seo: o.seo,
    sections: [
      hero(o.label, o.h1, o.lead, L('Request a free audit', LINKS.audit), L('See the 90-day plan', '#rollout'),
        '12-month partnerships  ·  Focused 90-day rollout plans  ·  Scoped projects from R50 000', { audience: o.audience }),
      s('text', { eyebrow: 'THE BUSINESS PRIORITY', title: o.answer[0], body: o.answer[1] }),
      cards('WHERE THE WORK STARTS', 'Where does the journey lose momentum?', o.problems.map(([t, b], i) => [`0${i + 1} / FRICTION TO INVESTIGATE`, t, b]),
        { intro: 'We validate these friction points against your customer evidence, current systems and team processes.' }),
      s('cards', {
        eyebrow: 'DESIGN · DEVELOPMENT · INTEGRATION · GROWTH', title: 'The right mix around one priority.',
        intro: 'One agreed scope brings together the capabilities needed for the outcome. We prioritise the work with your team.',
        items: o.services.map(([title, body], i) => ({
          kicker: ['01 / STRATEGY, UX & CONVERSION', '02 / WEBSITES & DIGITAL PRODUCTS', '03 / SYSTEMS INTEGRATION & AUTOMATION',
            '04 / AI INTEGRATION & INTELLIGENT WORKFLOWS', '05 / GROWTH MARKETING & CRO', '06 / DYNAMIC QR EXPERIENCES'][i],
          title, body,
          link: [L('Explore strategy & UX', LINKS.strategy), L('Explore websites & products', LINKS.websites), L('Explore systems integration', LINKS.systems),
            L('Explore AI integration', LINKS.ai), L('Explore growth marketing', LINKS.growth), L('Explore dynamic QR', LINKS.qr)][i],
        })),
      }),
      s('journey', { eyebrow: 'AN EXAMPLE TO DISCUSS', title: o.journey.title,
        intro: 'A practical sequence to scope around your current tools and the people responsible for the next step.',
        steps: o.journey.steps.map(([title, body], i) => ({ kicker: `0${i + 1}`, title, body })), note: o.journey.scope,
        cta: L('Explore integration options', LINKS.integrations), panel: false }),
      s('steps', { anchor: 'rollout', eyebrow: 'A FOCUSED DELIVERY CYCLE', title: 'What could the first 90 days look like?', style: 'card',
        intro: 'A starting framework, refined through discovery. We agree one priority, the delivery scope, the owners and the measures before work begins.',
        items: o.rollout.map(([title, body, note], i) => ({ kicker: ['DAYS 01–30', 'DAYS 31–60', 'DAYS 61–90'][i], title, body, note })),
        note: 'The rollout is part of a 12-month Digital Growth Partnership. Scope and timing depend on access, vendor capabilities, approvals and agreed capacity; performance targets are set from the baseline.' }),
      s('steps', { eyebrow: 'MAKE PERFORMANCE VISIBLE', title: 'Which measures guide the decisions?', style: 'card',
        intro: 'These are candidate key performance indicators (KPIs). We agree numeric targets, data definitions, review periods and accountable owners during the first phase.',
        items: o.kpis.map(([title, body, note], i) => ({ kicker: `MEASURE / 0${i + 1}`, title, body, note })),
        note: 'Review the delivery progress weekly and performance at the agreed cadence. Compare suitable periods and record other changes that could affect the result.' }),
      engagement('Our strongest partnership fit is a team of 10+ people with a dedicated marketing owner, an operational counterpart and the capacity to act on shared priorities.', 'From R50 000', {
        eyebrow: 'BUILT FOR ESTABLISHED TEAMS', title: 'A clear owner. A focused scope.', k1: '01 / SCOPED PROJECTS', k2: '02 / DIGITAL GROWTH PARTNERSHIP',
        b1: 'A defined business outcome, prioritised requirements and agreed acceptance criteria. Design, development, integration and marketing support are scoped together where needed.',
        n1: 'Final scope, investment and VAT treatment are confirmed in your proposal.',
        b2: 'Focused 90-day rollout plans, agreed KPIs and ongoing improvement with your marketing and operational teams.',
        n2: 'A tailored monthly fee. Media spend, platform licences and usage costs are confirmed separately.', c2: 'Explore partnerships',
      }),
      faq('QUESTIONS DECISION-MAKERS ASK', 'Frequently asked questions', o.faqs),
      cta('START WITH THE PRIORITY', o.closing[0], o.closing[1], L('Request a free audit', LINKS.audit), '', L('Discuss your requirements', LINKS.contact)),
    ],
  };
}

module.exports = { L, LINKS, s, hero, cards, faq, cta, steps3, caseStudies, engagement, service, industry, seo };
