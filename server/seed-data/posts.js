// News posts. Card previews from Figma P01/P11 are labelled "illustrative" in the design, so they are
// published with noindex until real client stories replace them. P16 is a full article; P15 is a draft template.
const { L, LINKS, s, faq } = require('./lib');

const closing = (title, body, primary, secondary) => s('cta', { eyebrow: 'PUT THE LEARNING TO WORK', title, lead: body, primary, secondary });
// Case studies show newest first; these dates keep the Figma order (first = newest).
const CASE_DATES = ['2026-11-01T10:05:00Z', '2026-11-01T10:04:00Z', '2026-11-01T10:03:00Z', '2026-11-01T10:02:00Z', '2026-11-01T10:01:00Z'];
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
  status: 'Trends / Content & growth', eyebrow: 'TRENDS  /  CONTENT & GROWTH', author: '', published: true,
  cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket',
  figureLabel: 'A REPEATABLE CONTENT PATH',
  figure: [
    { title: 'Answer the question', body: 'Match the intent. Make the answer clear.' },
    { title: 'Show the evidence', body: 'Add sources, examples and your expertise.' },
    { title: 'Guide the next step', body: 'Connect the insight to a useful action.' },
  ],
  figureCaption: 'Figure 1. BWD’s editorial sequence: a useful answer, credible support and a relevant next step.',
  summaryLabel: 'THE SHORT ANSWER',
  summary: 'Start with the buyer’s question, answer it clearly, then add the evidence and context needed to act. Combine search engine optimisation (SEO) with answer engine optimisation (AEO) through useful content, descriptive headings, primary sources and practical examples. Give readers a clear next step, and measure qualified enquiries alongside visibility. Clear structure supports understanding; it does not guarantee rankings or AI citations.',
  facts: [
    { label: 'FOR', value: 'Established B2B marketing teams' },
    { label: 'FOCUS', value: 'Useful answers. Credible evidence.' },
    { label: 'NEXT STEP', value: 'Connect content to qualified enquiries' },
  ],
  toc: 'Start with intent | #intent\nWrite the answer | #answer\nBuild useful sections | #sections\nAdd credible proof | #proof\nConnect to outcomes | #outcomes\nKey takeaways | #takeaways\nFAQs | #faqs\nSources & author | #sources',
  tags: ['SEO', 'AEO', 'Content strategy', 'B2B marketing'],
  content: `
<h2 id="intent" data-toc="Start with intent">Which question should the article answer?</h2>
<p><strong>Choose one specific question that matters to a buyer at a recognisable stage of their decision.</strong> A useful brief names the reader, the decision they face and the next step the article should help them take.</p>
<p>Use sales conversations, support questions and search data to identify the language customers actually use. For an established business, “Can we connect our website to our CRM?” is more useful than a broad article about digital transformation.</p>
<blockquote><strong>Example: a more useful content brief</strong>Reader: a marketing manager at an established business.<br>Question: can our website send qualified enquiries into our customer relationship management (CRM) system?<br>Decision: whether to improve the existing setup or scope a new integration.</blockquote>
<h2 id="answer" data-toc="Write the answer">What belongs in the opening answer?</h2>
<p><strong>Write a short, direct answer before the deeper explanation.</strong> State the main recommendation and the conditions that could change it, using language a reader can understand without reading the rest of the page.</p>
<p>Keep the visible summary separate from the meta description used in the content management system. Google may generate a search snippet from page text or use a relevant meta description, so the displayed snippet can vary by query. [2]</p>
<h2 id="sections" data-toc="Build useful sections">How should the rest of the article be organised?</h2>
<p><strong>Build each section around the next question the reader needs answered.</strong> Lead with the answer, then add a concrete example, a comparison or the steps required to act on it.</p>
<p>Use descriptive headings and short paragraphs where they improve reading. Explain abbreviations on first use, keep terms consistent and use a linked contents list for longer articles. Treat this as an editorial approach for readers, not a formula for AI selection.</p>
<table class="table"><thead><tr><th>Reader’s question</th><th>Useful format</th><th>What to include</th></tr></thead><tbody>
<tr><td>What does it mean?</td><td>Definition + example</td><td>A plain-language answer and a relevant business example</td></tr>
<tr><td>Which option fits us?</td><td>Comparison table</td><td>Decision criteria, trade-offs and the conditions that change the choice</td></tr>
<tr><td>How do we do it?</td><td>Numbered steps</td><td>An ordered process, prerequisites and a clear owner</td></tr>
<tr><td>What changed?</td><td>Evidence-led case study</td><td>Baseline, result, timeframe, source and limitations</td></tr></tbody></table>
<h3>When does a table help more than a paragraph?</h3>
<p>Use a table when readers need to compare the same attributes across options. Keep narrative context around the table so the decision and its limitations remain clear.</p>
<h2 id="proof" data-toc="Add credible proof">What makes an answer credible?</h2>
<p><strong>Show where important claims come from and add the practical context your team can contribute.</strong> Use primary sources, original observations and examples that are clearly labelled when they are hypothetical.</p>
<p>Google’s guidance for its generative search features continues to emphasise established SEO practices and useful, original content. It does not prescribe special AI markup or a rigid content-chunking format. [1]</p>
<ol><li>Link the source beside the claim it supports.</li><li>State the timeframe and method behind each metric.</li><li>Name the author and relevant expertise.</li><li>Separate observed results from interpretation.</li></ol>
<h2 id="outcomes" data-toc="Connect to outcomes">How should content connect to business outcomes?</h2>
<p><strong>Give the reader one next step that matches their intent, then connect reporting to what happens after the click.</strong> A useful article should help the right buyer make progress, whether they explore an integration, read a case study or discuss a project.</p>
<p>Agree a key performance indicator (KPI) before publication. Track relevant enquiries and their quality alongside search visibility and engagement; interpret changes in context rather than treating every movement as an effect of the article.</p>
<blockquote><strong>An example measurement plan</strong>For an integration article, track visits to the relevant service page, audit requests and qualified conversations. Record how enquiries are assessed, who owns follow-up and the review period. Compare like-for-like periods and note other changes in campaigns, demand or the website.</blockquote>
<div class="ed-box"><h2 id="takeaways" data-toc="Key takeaways">Five actions for your next article</h2>
<ol><li>Pick one buyer question and define the decision it supports.</li><li>Write the direct answer before adding depth.</li><li>Match the format to the task: explain, compare or guide.</li><li>Add named expertise, sources and honest evidence.</li><li>Choose a relevant next step and a business measure.</li></ol></div>
<h2 id="sources">Sources &amp; further reading</h2>
<p>[1] Google Search Central — Generative AI search guidance. Official guidance on SEO foundations, useful content and generative search. Accessed 30 October 2026.<br>
[2] Google Search Central — Search result snippets. How page content and meta descriptions inform search snippets. Accessed 30 October 2026.<br>
[3] Google Search Central — Article structured data. Article metadata, including author, headline, dates and images. Accessed 30 October 2026.</p>`,
  seo: { metaTitle: 'How to Structure Content for SEO and AEO | Best Web Design',
    metaDescription: 'Answer the buyer’s question clearly, add credible evidence and guide the next step. A practical SEO and AEO content structure for B2B marketing teams.' },
  sections: [
    faq('A FEW MORE ANSWERS', 'Frequently asked questions', [
      ['What is the difference between SEO and AEO?', 'Search engine optimisation helps people discover useful content through search. Answer engine optimisation focuses on making answers clear and well supported for answer-based experiences. They overlap; Google’s generative search guidance still relies on established SEO practices. [1]'],
      ['Does AEO replace SEO?', 'No. Treat answer-focused writing as part of a broader search and content approach. Google’s guidance says standard SEO practices remain relevant to its generative search features. [1]'],
      ['How long should the opening answer be?', 'Use enough space to answer the question clearly. For this editorial format, aim for roughly 40–100 words, then add nuance in the body. This is a writing guideline, not a ranking requirement.'],
      ['Should the summary and meta description be identical?', 'They serve different purposes. The visible summary helps the reader understand the answer; the meta description describes the page for search. Google can choose a query-relevant snippet from the page instead. [2]'],
      ['Do question-based headings guarantee AI citations?', 'No. They can make a useful sequence of questions easier to navigate, but headings and formatting do not guarantee selection by an AI system or a search engine. [1]'],
      ['How should a B2B article use client examples?', 'Use approved client facts and make the scope of the work clear. Include the baseline, measurement period and evidence for results. Label hypothetical examples and distinguish external case analysis from work delivered by your team.'],
      ['What should a marketing team measure?', 'Choose measures that fit the article’s purpose: relevant visibility, useful next-step clicks, enquiries and qualified opportunities. Agree how lead quality is assessed and who owns follow-up before reviewing results.'],
      ['Does an article need special AI schema?', 'Google does not prescribe special AI markup. Relevant Article or BlogPosting structured data can describe the headline, author, dates and images, but it should reflect the actual page content. [1][3]'],
    ]),
    s('cta', { eyebrow: 'TURN INSIGHT INTO A FOCUSED NEXT STEP', title: 'Make your content work harder.', style: 'editorial', tone: 'light',
      lead: 'Connect your customer questions, website experience and follow-up. Start with a free audit to identify where a more focused approach could help.',
      primary: L('Start your free audit', LINKS.audit), secondary: L('Explore growth marketing', LINKS.growth) }),
  ],
};

// P15 (Case study) — the full Figma template, kept unpublished for writing real client stories.
const caseTemplate = {
  slug: 'case-study-template', kind: 'case-study', category: 'Case study', published: true, unlisted: true, seo: { noindex: true },
  eyebrow: 'CASE STUDY  /  CLIENT TRANSFORMATION',
  title: 'From fragmented enquiries to a connected sales journey.',
  excerpt: '[Client name]  ·  [Industry]  ·  [Location]',
  coverPlaceholder: '[Client project image]', coverPlaceholderNote: 'Website, product interface or business workflow',
  coverCaption: '[Client project image] — [What this view shows and why it matters]. Image: [Owner / permission].',
  summaryLabel: 'EXECUTIVE SUMMARY',
  summary: '[Client name], a [company size] business in [industry], needed to solve [core problem]. BWD combined [capabilities] to connect [systems or touchpoints] around [business goal]. Over [measurement period], the work delivered [verified result] against [agreed baseline].',
  facts: [
    { label: 'CLIENT', value: '[Client name]' },
    { label: 'BUSINESS', value: '[Industry] · [Team size]' },
    { label: 'ENGAGEMENT', value: '[Scoped project / Growth partnership]' },
    { label: 'TIMEFRAME', value: '[Start date] – [End date]' },
  ],
  toc: 'Executive summary | #summary\nClient & context | #client\nThe challenge | #challenge\nOur approach | #approach\nMeasurable results | #results\nClient perspective | #perspective\nQuestions answered | #faqs\nYour next step | #next-step',
  relatedTitle: 'Keep exploring',
  content: `
<h2 id="client">The business behind the brief</h2>
<p>[Introduce the client, what they do and who they serve. State the relevant industry, company size and operational context.]</p>
<p>[Explain what was at stake: a commercial target, a customer experience gap or a growing operational cost. Identify the people who owned the outcome and the constraints the work needed to respect.]</p>
<h2 id="challenge">Where the customer journey broke down</h2>
<p>[Name the core challenge in plain language. Explain its effect on customers, the marketing team and the business.]</p>
<p>[Describe the evidence: user research, analytics, process review or customer feedback. Explain what had already been tried, why those attempts did not resolve the root cause, and what had to change.]</p>
<div class="ed-cards"><div><p class="k">01</p><p class="t">[Customer friction]</p><p>[Observed behaviour and its consequence]</p></div><div><p class="k">02</p><p class="t">[Disconnected systems]</p><p>[Manual task, missing data or handover gap]</p></div><div><p class="k">03</p><p class="t">[Commercial impact]</p><p>[How the problem affected the agreed KPI]</p></div></div>
<h2 id="approach">A connected solution, built around the goal</h2>
<p>[Explain the solution and the mix of strategy, design, development, integration and growth capabilities it required.]</p>
<p>[Describe how the work was scoped, prioritised and implemented with the client’s team. Make clear what changed for the end user and what changed behind the scenes.]</p>
<table><thead><tr><th>Decision</th><th>Approach selected</th><th>Why it fitted</th></tr></thead><tbody>
<tr><td>[Platform]</td><td>[Improve existing / replace]</td><td>[Evidence, constraints and trade-off]</td></tr>
<tr><td>[Integration]</td><td>[System A + System B]</td><td>[Why connecting these systems mattered]</td></tr>
<tr><td>[Rollout]</td><td>[Prioritised release sequence]</td><td>[How risk and learning shaped delivery]</td></tr></tbody></table>
<h2 id="delivery">How the work moved from insight to delivery</h2>
<ol><li><div><h3>Understand and prioritise</h3><p>[Audit the journey, agree the baseline and choose the highest-value problem.]</p></div></li><li><div><h3>Design, build and connect</h3><p>[Explain the key delivery decisions, integrations and client collaboration.]</p></div></li><li><div><h3>Measure and improve</h3><p>[Record the launch checks, measurement period and subsequent refinements.]</p></div></li></ol>
<h2 id="results">What changed for the business</h2>
<p>[State the overall result and the period measured. Use comparable baselines and distinguish observed outcomes from assumptions about causation.]</p>
<div class="ed-cards metrics"><div><p class="m">[X%]</p><p class="t">[Qualified enquiries]</p><p>[Before] → [After]</p><p class="n">Period: [dates]</p><p class="n">Source: [CRM report]</p></div><div><p class="m">[X hrs]</p><p class="t">[Time saved per month]</p><p>[Before] → [After]</p><p class="n">Period: [dates]</p><p class="n">Source: [Time study]</p></div><div><p class="m">[X%]</p><p class="t">[Conversion improvement]</p><p>[Before] → [After]</p><p class="n">Period: [dates]</p><p class="n">Source: [Analytics report]</p></div></div>
<table><thead><tr><th>Measurement detail</th><th>Evidence to include</th></tr></thead><tbody>
<tr><td>Baseline &amp; timeframe</td><td>[Equivalent date ranges, sample size and any seasonal differences]</td></tr>
<tr><td>Definition &amp; calculation</td><td>[What counts as a conversion, how time saved was calculated and the denominator used]</td></tr>
<tr><td>Scope &amp; limitations</td><td>[Other changes during the period, attribution limits and what was excluded]</td></tr></tbody></table>
<div class="ed-quote" id="perspective"><p class="label">Client perspective</p><p class="lead">“[Insert the client’s approved quotation about the outcome and the experience of working with BWD.]”</p><p class="action">[Full name], [Role] · [Client name]</p><p class="small">[Date / project context] · Published with permission</p></div>
<h2 id="evidence">Evidence &amp; acknowledgements</h2>
<p class="ed-cite"><strong>[1] [Client / report owner] — [Report or research title]</strong><br>[Measurement dates] · [Approved public source or methodology note]</p>
<p class="ed-cite"><strong>[2] [Implementation partner / contributor]</strong><br>[Contribution, attribution and approved supporting link]</p>`,
  sections: [
    faq('A FEW MORE ANSWERS', 'Frequently asked questions', [
      ['What business problem did this project solve?', '[Summarise the core problem in one or two sentences.]'],
      ['Which services and systems were involved?', '[List the capabilities and systems that were part of the scope.]'],
      ['Why was this approach chosen over the alternatives?', '[Explain the decision criteria and trade-offs.]'],
      ['How long did implementation take?', '[State the timeframe and the main phases.]'],
      ['How were the results measured?', '[Describe the baseline, period, definitions and source.]'],
      ['Can an existing website or CRM be improved?', '[Explain when improving the current setup is the better option.]'],
      ['Would similar work be a project or a partnership?', '[Explain how scope and ongoing priorities shape the engagement.]'],
      ['What information helps BWD assess a similar challenge?', '[List the context, systems and goals that help a first conversation.]'],
    ]),
    closing('Have a similar challenge?', 'Tell us what is getting in the way. We’ll help define a focused next step around your team, systems and business goals.',
      L('Discuss your project', LINKS.contact), L('Explore integrations', LINKS.integrations)),
  ],
};

module.exports = [
  seoAeo,
  preview('from-interest-to-an-informed-follow-up', 'case-study', 'Case study', 'From interest to an informed follow-up.', 'An illustrative look at connecting landing pages, CRM ownership and sales feedback.', 'Illustrative case-study preview', ['CRM', 'Lead generation'], { publishedAt: CASE_DATES[0], cover: '/assets/figma/case-follow-up.jpg', coverAlt: 'A hand holding a printed book' }),
  preview('product-discovery-connected-to-a-quote', 'case-study', 'Case study', 'Product discovery, connected to a quote.', 'An example of bringing catalogue structure, useful content and sales routing into one scope.', 'Illustrative case-study preview', ['eCommerce', 'CRM'], { publishedAt: CASE_DATES[1], cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('a-booking-journey-with-fewer-gaps', 'case-study', 'Case study', 'A booking journey with fewer gaps.', 'An illustrative path from service selection to a booking and the team responsible for it.', 'Illustrative case-study preview', ['Bookings', 'UX'], { publishedAt: CASE_DATES[2], cover: '/assets/figma/case-booking.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('orders-that-reach-the-right-systems', 'case-study', 'Case study', 'Orders that reach the right systems.', 'An illustrative connection between checkout, stock visibility and fulfilment.', 'Illustrative case-study preview', ['eCommerce', 'Integration'], { publishedAt: CASE_DATES[3], cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('answers-with-a-human-handover', 'case-study', 'Case study', 'Answers with a human handover.', 'An illustrative AI support workflow with approved sources and clear review points.', 'Illustrative case-study preview', ['AI', 'Automation'], { publishedAt: CASE_DATES[4], cover: '/assets/figma/case-follow-up.jpg', coverAlt: 'A hand holding a printed book' }),
  preview('ai-works-better-with-a-clear-task', 'article', 'Trends', 'AI works better with a clear task.', 'Questions about data, review, permissions and cost to ask before introducing an AI workflow.', 'Editorial preview', ['AI'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('measure-the-action-after-the-scan', 'article', 'Trends', 'Measure the action after the scan.', 'Planning dynamic QR around the mobile journey, destination ownership and useful outcomes.', 'Editorial preview', ['Dynamic QR'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  preview('what-happens-after-the-enquiry-matters', 'article', 'Trends', 'What happens after the enquiry matters.', 'Connecting acquisition, conversion and follow-up around a concrete business priority.', 'Editorial preview', ['Lead generation', 'CRM'], { cover: '/assets/figma/case-quote.jpg', coverAlt: 'Best Web Design enamel pins on a denim jacket' }),
  caseTemplate,
];
