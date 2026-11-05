// News posts. Card previews from Figma P01/P11 are labelled "illustrative" in the design, so they are
// published with noindex until real client stories replace them. P16 is a full article; P15 is a draft template.
const { L, LINKS, s, faq } = require('./lib');

const closing = (title, body, primary, secondary) => s('cta', { eyebrow: 'PUT THE LEARNING TO WORK', title, lead: body, primary, secondary });
const preview = (slug, kind, category, title, excerpt, status, tags = [], extra = {}) => ({
  ...extra, slug, kind, category, title, excerpt, status, tags, published: true, seo: { noindex: true },
  sections: [
    s('text', { eyebrow: 'ILLUSTRATIVE PREVIEW', body: `${excerpt}\n\nThis is an illustrative preview. The full story will be published once the client evidence is approved.` }),
    closing('Have a similar challenge?', 'Tell us what is getting in the way. We’ll help define a focused next step around your team, systems and business goals.',
      L('Discuss your project', LINKS.contact), L('Explore integrations', LINKS.integrations)),
  ],
});

const seoAeo = {
  slug: 'how-to-structure-content-for-seo-and-aeo', kind: 'article', category: 'Trends',
  title: 'How should you structure content for SEO and AEO?',
  excerpt: 'A practical editorial approach for B2B marketing teams that need useful content, credible evidence and a clear next step.',
  status: 'Trends / Content & growth', author: '', published: true,
  cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket',
  tags: ['SEO', 'AEO', 'Content strategy', 'B2B marketing'],
  content: `
<h2 id="short-answer">The short answer</h2>
<p>Start with the buyer’s question, answer it clearly, then add the evidence and context needed to act. Combine search engine optimisation (SEO) with answer engine optimisation (AEO) through useful content, descriptive headings, primary sources and practical examples. Give readers a clear next step, and measure qualified enquiries alongside visibility. Clear structure supports understanding; it does not guarantee rankings or AI citations.</p>
<p><strong>A repeatable content path:</strong></p>
<ol><li><strong>Answer the question</strong> — match the intent and make the answer clear.</li><li><strong>Show the evidence</strong> — add sources, examples and your expertise.</li><li><strong>Guide the next step</strong> — connect the insight to a useful action.</li></ol>
<h2 id="intent">Which question should the article answer?</h2>
<p><strong>Choose one specific question that matters to a buyer at a recognisable stage of their decision.</strong> A useful brief names the reader, the decision they face and the next step the article should help them take.</p>
<p>Use sales conversations, support questions and search data to identify the language customers actually use. For an established business, “Can we connect our website to our CRM?” is more useful than a broad article about digital transformation.</p>
<blockquote><strong>Example: a more useful content brief</strong><br>Reader: a marketing manager at an established business.<br>Question: can our website send qualified enquiries into our customer relationship management (CRM) system?<br>Decision: whether to improve the existing setup or scope a new integration.</blockquote>
<h2 id="answer">What belongs in the opening answer?</h2>
<p><strong>Write a short, direct answer before the deeper explanation.</strong> State the main recommendation and the conditions that could change it, using language a reader can understand without reading the rest of the page.</p>
<p>Keep the visible summary separate from the meta description used in the content management system. Google may generate a search snippet from page text or use a relevant meta description, so the displayed snippet can vary by query. [2]</p>
<h2 id="sections">How should the rest of the article be organised?</h2>
<p><strong>Build each section around the next question the reader needs answered.</strong> Lead with the answer, then add a concrete example, a comparison or the steps required to act on it.</p>
<p>Use descriptive headings and short paragraphs where they improve reading. Explain abbreviations on first use, keep terms consistent and use a linked contents list for longer articles. Treat this as an editorial approach for readers, not a formula for AI selection.</p>
<table class="table"><thead><tr><th>Reader’s question</th><th>Useful format</th><th>What to include</th></tr></thead><tbody>
<tr><td>What does it mean?</td><td>Definition + example</td><td>A plain-language answer and a relevant business example</td></tr>
<tr><td>Which option fits us?</td><td>Comparison table</td><td>Decision criteria, trade-offs and the conditions that change the choice</td></tr>
<tr><td>How do we do it?</td><td>Numbered steps</td><td>An ordered process, prerequisites and a clear owner</td></tr>
<tr><td>What changed?</td><td>Evidence-led case study</td><td>Baseline, result, timeframe, source and limitations</td></tr></tbody></table>
<h3>When does a table help more than a paragraph?</h3>
<p>Use a table when readers need to compare the same attributes across options. Keep narrative context around the table so the decision and its limitations remain clear.</p>
<h2 id="proof">What makes an answer credible?</h2>
<p><strong>Show where important claims come from and add the practical context your team can contribute.</strong> Use primary sources, original observations and examples that are clearly labelled when they are hypothetical.</p>
<p>Google’s guidance for its generative search features continues to emphasise established SEO practices and useful, original content. It does not prescribe special AI markup or a rigid content-chunking format. [1]</p>
<ol><li>Link the source beside the claim it supports.</li><li>State the timeframe and method behind each metric.</li><li>Name the author and relevant expertise.</li><li>Separate observed results from interpretation.</li></ol>
<h2 id="outcomes">How should content connect to business outcomes?</h2>
<p><strong>Give the reader one next step that matches their intent, then connect reporting to what happens after the click.</strong> A useful article should help the right buyer make progress, whether they explore an integration, read a case study or discuss a project.</p>
<p>Agree a key performance indicator (KPI) before publication. Track relevant enquiries and their quality alongside search visibility and engagement; interpret changes in context rather than treating every movement as an effect of the article.</p>
<blockquote><strong>An example measurement plan</strong><br>For an integration article, track visits to the relevant service page, audit requests and qualified conversations. Record how enquiries are assessed, who owns follow-up and the review period. Compare like-for-like periods and note other changes in campaigns, demand or the website.</blockquote>
<h2 id="takeaways">Five actions for your next article</h2>
<ol><li>Pick one buyer question and define the decision it supports.</li><li>Write the direct answer before adding depth.</li><li>Match the format to the task: explain, compare or guide.</li><li>Add named expertise, sources and honest evidence.</li><li>Choose a relevant next step and a business measure.</li></ol>
<h2 id="sources">Sources &amp; further reading</h2>
<p>[1] Google Search Central — Generative AI search guidance. Official guidance on SEO foundations, useful content and generative search. Accessed 30 October 2026.<br>
[2] Google Search Central — Search result snippets. How page content and meta descriptions inform search snippets. Accessed 30 October 2026.<br>
[3] Google Search Central — Article structured data. Article metadata, including author, headline, dates and images. Accessed 30 October 2026.</p>`,
  seo: { metaTitle: 'How to Structure Content for SEO and AEO | Best Web Design',
    metaDescription: 'Answer the buyer’s question clearly, add credible evidence and guide the next step. A practical SEO and AEO content structure for B2B marketing teams.' },
  sections: [
    faq('QUESTIONS ANSWERED', 'Frequently asked questions', [
      ['What is the difference between SEO and AEO?', 'Search engine optimisation helps people discover useful content through search. Answer engine optimisation focuses on making answers clear and well supported for answer-based experiences. They overlap; Google’s generative search guidance still relies on established SEO practices. [1]'],
      ['Does AEO replace SEO?', 'No. Treat answer-focused writing as part of a broader search and content approach. Google’s guidance says standard SEO practices remain relevant to its generative search features. [1]'],
      ['How long should the opening answer be?', 'Use enough space to answer the question clearly. For this editorial format, aim for roughly 40–100 words, then add nuance in the body. This is a writing guideline, not a ranking requirement.'],
      ['Should the summary and meta description be identical?', 'They serve different purposes. The visible summary helps the reader understand the answer; the meta description describes the page for search. Google can choose a query-relevant snippet from the page instead. [2]'],
      ['Do question-based headings guarantee AI citations?', 'No. They can make a useful sequence of questions easier to navigate, but headings and formatting do not guarantee selection by an AI system or a search engine. [1]'],
      ['How should a B2B article use client examples?', 'Use approved client facts and make the scope of the work clear. Include the baseline, measurement period and evidence for results. Label hypothetical examples and distinguish external case analysis from work delivered by your team.'],
      ['What should a marketing team measure?', 'Choose measures that fit the article’s purpose: relevant visibility, useful next-step clicks, enquiries and qualified opportunities. Agree how lead quality is assessed and who owns follow-up before reviewing results.'],
      ['Does an article need special AI schema?', 'Google does not prescribe special AI markup. Relevant Article or BlogPosting structured data can describe the headline, author, dates and images, but it should reflect the actual page content. [1][3]'],
    ]),
    s('cta', { eyebrow: 'TURN INSIGHT INTO A FOCUSED NEXT STEP', title: 'Make your content work harder.',
      lead: 'Connect your customer questions, website experience and follow-up. Start with a free audit to identify where a more focused approach could help.',
      primary: L('Start your free audit', LINKS.audit), secondary: L('Explore growth marketing', LINKS.growth) }),
  ],
};

// P15 structure kept as an unpublished template for writing real case studies.
const caseTemplate = {
  slug: 'case-study-template', kind: 'case-study', category: 'Case study', published: false, seo: { noindex: true },
  title: 'From fragmented enquiries to a connected sales journey.',
  excerpt: '[Client name] · [Industry] · [Location]',
  sections: [
    s('panels', { items: [
      { eyebrow: 'EXECUTIVE SUMMARY', body: '[Client name], a [company size] business in [industry], needed to solve [core problem]. BWD combined [capabilities] to connect [systems or touchpoints] around [business goal]. Over [measurement period], the work delivered [verified result] against [agreed baseline].' },
      { eyebrow: 'PROJECT FACTS', detail: '**Client:** [Client name]\n**Business:** [Industry] · [Team size]\n**Engagement:** [Scoped project / Growth partnership]\n**Timeframe:** [Start date] – [End date]' },
    ] }),
    s('richText', { html: '<h2>The business behind the brief</h2><p>[Introduce the client, what they do and who they serve.]</p><h2>Where the customer journey broke down</h2><p>[Name the core challenge in plain language.]</p><h2>A connected solution, built around the goal</h2><p>[Explain the solution and the mix of capabilities it required.]</p><h2>What changed for the business</h2><p>[State the overall result and the period measured.]</p>' }),
    closing('Have a similar challenge?', 'Tell us what is getting in the way. We’ll help define a focused next step around your team, systems and business goals.',
      L('Discuss your project', LINKS.contact), L('Explore integrations', LINKS.integrations)),
  ],
};

module.exports = [
  seoAeo,
  preview('from-interest-to-an-informed-follow-up', 'case-study', 'Case study', 'From interest to an informed follow-up.', 'An illustrative look at connecting landing pages, CRM ownership and sales feedback.', 'Illustrative case-study preview', ['CRM', 'Lead generation'], { cover: '/assets/figma/case-follow-up.jpg', coverAlt: 'A hand holding a printed book' }),
  preview('product-discovery-connected-to-a-quote', 'case-study', 'Case study', 'Product discovery, connected to a quote.', 'An example of bringing catalogue structure, useful content and sales routing into one scope.', 'Illustrative case-study preview', ['eCommerce', 'CRM'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('a-booking-journey-with-fewer-gaps', 'case-study', 'Case study', 'A booking journey with fewer gaps.', 'An illustrative path from service selection to a booking and the team responsible for it.', 'Illustrative case-study preview', ['Bookings', 'UX'], { cover: '/assets/figma/case-booking.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('orders-that-reach-the-right-systems', 'case-study', 'Case study', 'Orders that reach the right systems.', 'An illustrative connection between checkout, stock visibility and fulfilment.', 'Illustrative case-study preview', ['eCommerce', 'Integration'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('answers-with-a-human-handover', 'case-study', 'Case study', 'Answers with a human handover.', 'An illustrative AI support workflow with approved sources and clear review points.', 'Illustrative case-study preview', ['AI', 'Automation'], { cover: '/assets/figma/case-follow-up.jpg', coverAlt: 'A hand holding a printed book' }),
  preview('ai-works-better-with-a-clear-task', 'article', 'Trends', 'AI works better with a clear task.', 'Questions about data, review, permissions and cost to ask before introducing an AI workflow.', 'Editorial preview', ['AI'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('measure-the-action-after-the-scan', 'article', 'Trends', 'Measure the action after the scan.', 'Planning dynamic QR around the mobile journey, destination ownership and useful outcomes.', 'Editorial preview', ['Dynamic QR'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('what-happens-after-the-enquiry-matters', 'article', 'Trends', 'What happens after the enquiry matters.', 'Connecting acquisition, conversion and follow-up around a concrete business priority.', 'Editorial preview', ['Lead generation', 'CRM'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  caseTemplate,
];
