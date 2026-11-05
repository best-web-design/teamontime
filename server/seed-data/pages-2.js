// P08–P14 from Figma, plus legal placeholders linked from the footer.
const { L, LINKS, s, hero, cards, faq, cta, steps3, engagement, seo } = require('./lib');
const arrows = (lines) => lines.join('\n');

const scoped = {
  slug: 'scoped-projects', title: 'Scoped Projects', template: 'engagement', order: 20,
  seo: seo('Scoped Digital Projects from R50,000 | Best Web Design', 'Clear scope, prioritised delivery. Requirements, deliverables, milestones and acceptance criteria agreed before website, integration or AI projects begin.'),
  sections: [
    hero('HOME  /  HOW WE WORK  /  08 — SCOPED PROJECTS', 'Clear scope.\nPrioritised delivery.',
      'Bring us the outcome you need to achieve. We work through the requirements, select the right mix of capabilities and agree the deliverables, milestones and acceptance criteria before delivery begins.',
      L('Send a project brief', LINKS.contact), L('Compare with a partnership', LINKS.howWeWork),
      'Projects start at R50,000. The final investment is based on the agreed scope and delivery requirements.'),
    s('split', { eyebrow: 'A DEFINED CHANGE', title: 'A clear outcome.\nA shared finish line.', body: 'A project suits a website build, a priority journey improvement, a system connection or a bounded AI pilot. You need a decision-maker, access to the relevant teams and a budget matched to the outcome.' }),
    cards('CLARITY BEFORE DELIVERY', 'Agree the work\nbefore we begin.', [
      ['01 / AGREED PRIORITY', 'Requirements and priorities', 'Identify the users, business rules, required functionality and what must be included in the first release.'],
      ['02 / AGREED PRIORITY', 'The necessary capabilities', 'Combine design, development, integration and marketing where they are needed for the outcome.'],
      ['03 / AGREED PRIORITY', 'Scope and acceptance', 'Document deliverables, exclusions, dependencies, milestones and how the completed work will be accepted.'],
      ['04 / AGREED PRIORITY', 'Dependencies and ownership', 'Confirm systems, content, access, decision-makers and handover responsibilities. Make client and third-party dependencies visible from the start.'],
    ]),
    s('text', { eyebrow: 'ILLUSTRATIVE SCOPE / COMMERCE CATALOGUE', title: 'Useful on day one.\nReady for what follows.', body: 'A first release should solve a complete customer task. Later phases can add capabilities through their own agreed scope.' }),
    s('panels', { items: [
      { eyebrow: 'RELEASE 01 / SCOPE FOCUS', title: 'Product discovery\nto a qualified quote.', bullets: arrows(['Product categories and useful detail', 'A quote list with options and quantities', 'An enquiry sent to the agreed sales owner', 'Responsive layouts and acceptance tests']) },
      { eyebrow: 'LATER PHASES / QUOTED SEPARATELY', title: 'Extend when the\nbusiness is ready.', bullets: arrows(['Online payments and checkout', 'Stock, order and courier connections', 'Additional customer account functionality', 'Ongoing campaigns and optimisation']) },
    ] }),
    s('text', { eyebrow: 'A SHARED DEFINITION OF DONE', body: 'A test customer can find a product, select the required options and submit a quote request. The agreed details reach the correct sales owner and can be followed up.\n\nIllustrative scope only. Your proposal defines the actual features, integrations, exclusions and acceptance criteria.' }),
    steps3('FROM BRIEF TO HANDOVER', 'Know what happens next.', [
      ['01 / DELIVERY', 'Brief and discovery', 'Review the business need and fit. Where detailed investigation is required, agree the discovery scope and fee before it starts.'],
      ['02 / DELIVERY', 'Scope and delivery', 'Approve the requirements, quote and delivery agreement. Progress through design, build and review milestones.'],
      ['03 / DELIVERY', 'Acceptance and launch', 'Test against the agreed criteria, complete launch requirements and hand over the specified assets and operating information.'],
    ], { note: 'APPROVE THE SCOPE BEFORE DELIVERY STARTS — The requirements, quote, review responsibilities and delivery agreement establish the shared plan. Where paid discovery is needed, its scope and fee are agreed before it begins.' }),
    s('panels', { items: [
      { eyebrow: 'PROJECT INVESTMENT', title: 'From R50,000', body: 'A minimum project investment, with the final fee shaped by the work required.',
        bullets: arrows(['Priority journeys and functionality', 'Content, migration and system connections', 'Testing, launch and handover requirements']),
        note: 'Discovery fees, payment milestones, licences, hosting and applicable VAT treatment are set out in the proposal. R50,000 is not a fixed price for every build.' },
      { eyebrow: 'YOUR AGREED SCOPE', title: 'Know what you\nare committing to.',
        bullets: arrows(['Deliverables, priorities and exclusions', 'Milestones, dependencies and review points', 'Acceptance criteria and sign-off responsibilities', 'Ownership, handover and agreed support']) },
    ] }),
    steps3('KEEP THE AGREEMENT CLEAR', 'New requirements?\nMake the impact visible.', [
      ['01 / REQUEST', 'Capture the change', 'Describe the new requirement and why it matters to the business.'],
      ['02 / ASSESS', 'Review the impact', 'Check the effect on cost, timing, dependencies and the current priority.'],
      ['03 / AGREE', 'Approve the next step', 'Agree the change before adding it to delivery, or place it in a later phase.'],
    ], { style: 'card', note: 'Payment milestones, client reviews and post-launch support are recorded in the agreement.' }),
    s('text', { eyebrow: 'DEFINE SUCCESS BEFORE THE BUILD', title: 'Delivery acceptance.\nBusiness performance.' }),
    s('panels', { items: [
      { eyebrow: '01 / WHAT THE PROJECT MUST DO', title: 'Test the agreed task.', body: 'Confirm that the defined journey works: the enquiry is routed correctly, the order completes or the required record reaches the right system.' },
      { eyebrow: '02 / WHAT THE BUSINESS WILL LEARN', title: 'Review the outcome.', body: 'Where included in scope, review qualified enquiries, completed orders or handling time after launch. Agree the baseline, measurement period and reporting owner.' },
    ] }),
    faq('BEFORE WE BEGIN', 'A few useful answers.', [
      ['What is the minimum project investment?', 'Projects start at R50,000. We confirm the final scope, investment and applicable VAT treatment in the proposal.'],
      ['Can you quote from a short brief?', 'We can assess fit and outline the next step. A reliable delivery quote requires enough detail about functionality, integrations, content and constraints.'],
      ['What if the requirements are not yet clear?', 'We agree the discovery needed to define them. Any paid discovery is explained before commitment and remains subject to the project qualification policy.'],
      ['What will we own?', 'The agreement defines ownership and handover for deliverables, accounts and data, alongside any third-party software or licence conditions.'],
      ['What happens after launch?', 'Handover, defect support, maintenance and ongoing optimisation are defined in the agreement. Continuing improvements can be scoped separately or form part of a suitable partnership.'],
      ['How is scope controlled if new requirements appear?', 'The agreed scope records deliverables, assumptions, dependencies and acceptance criteria. New requirements are assessed for impact on price and timing before they are approved. We prioritise the essential outcome first so useful additions do not silently expand the commitment.'],
      ['What do you need from our team before a project starts?', 'We need a decision-maker, a clear business priority, access to relevant information and an agreed review process. Content ownership, platform access and integration contacts are also confirmed. These inputs help establish a realistic scope and delivery schedule.'],
      ['Can one project include design, development, integration and marketing?', 'Yes. The scope combines the skills required for the outcome rather than treating each discipline as a separate purchase. We make the boundaries and dependencies explicit, including any work your team or other suppliers will own.'],
    ]),
    cta('LET’S DEFINE YOUR NEXT MOVE', 'Give us the goal.\nWe’ll define the scope.',
      'Share the required outcome, current platform, key systems, available budget and target timing. We will review the brief before proposing the next step.',
      L('Send a project brief', LINKS.contact), 'Bring the outcome, current platform, key systems, budget and target timing. Projects from R50,000.'),
  ],
};

const partnership = {
  slug: 'digital-growth-partnerships', title: 'Digital Growth Partnerships', template: 'engagement', order: 21,
  seo: seo('12-Month Digital Growth Partnerships | Best Web Design', '12 months of focus, starting with a 90-day rollout. Agreed quarterly priorities, connected delivery and defined KPIs for established South African teams.'),
  sections: [
    hero('HOME  /  HOW WE WORK  /  09 — DIGITAL GROWTH PARTNERSHIPS', '12 months of focus.\nStart with 90 days.',
      'Create a working rhythm for improving your digital performance. We agree a clear quarterly priority, combine the capabilities it needs and make progress visible through defined deliverables and KPIs.',
      L('Request a partnership discussion', LINKS.contact), L('Explore scoped projects', LINKS.projects),
      '12-month commitment. The first 90 days form the opening rollout, not a separate trial.'),
    s('split', { eyebrow: 'BUILT FOR ESTABLISHED BUSINESSES', title: 'Ready to implement.\nStructured to improve.', body: 'Our strongest fit is an established business with an operating team, typically 10 or more people, and a dedicated marketing owner. You also need access to relevant systems, a decision-maker who can approve work and the resources to act on the plan.' }),
    steps3('', '', [
      ['01 / TEAM', 'An operating business', 'An established team, typically with 10+ people and working sales, service or fulfilment processes.'],
      ['02 / OWNERSHIP', 'A marketing owner', 'A dedicated person or team accountable for priorities, decisions and performance.'],
      ['03 / DELIVERY', 'Room to act', 'Access to systems, timely approvals and resources to put the agreed improvements into practice.'],
    ], { style: 'card', note: 'For a defined one-off requirement, a scoped project may be the better starting point.' }),
    cards('ONE SHARED QUARTERLY PRIORITY', 'Give the first quarter\na clear commercial focus.', [
      ['01 / AGREED PRIORITY', 'Pipeline and lead conversion', 'Connect the offer, enquiry journey, CRM ownership and sales feedback.'],
      ['02 / AGREED PRIORITY', 'Commerce performance', 'Improve an agreed buying journey and the operational connections behind it.'],
      ['03 / AGREED PRIORITY', 'Bookings and guest journeys', 'Strengthen the path from interest to enquiry, reservation or service.'],
      ['04 / AGREED PRIORITY', 'Operational or AI workflows', 'Improve a bounded process with a named owner, measurable quality and clear controls.'],
    ], { intro: 'Select the business outcome first. Then agree the combination of capabilities, deliverables and capacity it needs.' }),
    s('journey', { eyebrow: 'ILLUSTRATIVE PARTNERSHIP SCOPE', title: 'One priority.\nThe right capabilities.',
      intro: 'For a lead-conversion priority, four connected workstreams can support the same enquiry journey.',
      steps: [['01 / DESIGN', 'A clearer offer', 'Landing-page structure, useful proof and an easier next step.'],
        ['02 / BUILD', 'A working journey', 'Responsive pages, usable forms and the required tracking.'],
        ['03 / CONNECT', 'A useful handover', 'CRM mapping, ownership, notifications and follow-up.'],
        ['04 / IMPROVE', 'Sales feedback', 'Review enquiry quality and refine the campaign and journey.']].map(([kicker, title, body]) => ({ kicker, title, body })),
      note: 'The agreement defines active workstreams and available capacity. Every channel or capability is not automatically included every month.' }),
    steps3('A FOCUSED OPENING ROLLOUT', 'Your first 90 days,\nwith a purpose.', [
      ['DAYS 01–30', 'Understand\n& prioritise', 'Agree the objective, definitions and baseline. Map the priority journey, confirm dependencies and release feasible early improvements.', 'OUTPUT / AGREED PLAN + BASELINE'],
      ['DAYS 31–60', 'Build\n& connect', 'Build and launch the agreed changes with the required connections, testing and client review.', 'OUTPUT / TESTED PRIORITY IMPROVEMENTS'],
      ['DAYS 61–90', 'Measure\n& refine', 'Review delivery and performance evidence, address friction and agree the next-quarter backlog.', 'OUTPUT / REVIEW + NEXT PRIORITIES'],
    ], { anchor: 'rollout', style: 'card', intro: 'A practical sequence shaped by your starting point, the confirmed scope and the dependencies.',
      note: 'MONTHS 4–12 / BUILD ON THE EVIDENCE — Keep the progress moving. Review priorities each quarter, improve the agreed journeys and plan the next releases within contracted capacity. The first 90 days are the opening cycle of the 12-month commitment.\nThe final sequence and timing reflect the agreed scope, access, approvals and technical dependencies.' }),
    s('table', { eyebrow: 'ILLUSTRATIVE KPI CHARTER / ENQUIRY QUALITY', title: 'Agree what progress means.',
      intro: 'Define the measure before setting the target. Track delivery commitments and business outcomes separately.',
      rows: [
        'METRIC + DEFINITION | Sales-accepted enquiry rate: the share of valid enquiries accepted by sales under an agreed definition.',
        'BASELINE | Validate current performance over an agreed measurement window, including data gaps and exclusions.',
        'TARGET | Agree a realistic target after reviewing the baseline, demand, budget and operational capacity.',
        'DATA SOURCE | Use the CRM and approved reporting sources, with consistent campaign and enquiry records.',
        'ACCOUNTABLE OWNERS | The client records sales outcomes. BWD and the marketing owner review the agreed reporting and next actions.',
        'REVIEW CADENCE | Review performance monthly and use the evidence to set the next quarterly priorities.',
      ].join('\n'),
      note: 'Outcomes also depend on demand, budget, sales activity and other dependencies. Targets guide the work; they are not guaranteed results.' }),
    s('text', { eyebrow: 'A CLEAR COMMITMENT ON BOTH SIDES', title: 'A partnership needs\nshared ownership.' }),
    s('panels', { items: [
      { eyebrow: 'BWD / DELIVERY PARTNER', title: 'Make the work visible.', bullets: arrows(['Plan and deliver the agreed workstreams', 'Coordinate the required design, build and integration', 'Report progress and surface dependencies', 'Recommend priorities from the available evidence']) },
      { eyebrow: 'YOUR TEAM / BUSINESS OWNER', title: 'Make decisions actionable.', bullets: arrows(['Provide context, access and a decision-maker', 'Approve content and work within agreed review windows', 'Own sales, service and operational follow-through', 'Record business outcomes and resolve internal dependencies']) },
    ] }),
    steps3('CONTINUITY WITH A CLEAR PROCESS', 'Keep priorities\nand progress visible.', [
      ['MONTHLY', 'Review the work', 'Review deliverables, KPIs, decisions and dependencies. Keep the active backlog aligned with the agreed priority.'],
      ['QUARTERLY', 'Set the next focus', 'Use the evidence to choose the next objective and releases within the contracted capacity.'],
      ['WHEN SCOPE CHANGES', 'Assess the impact', 'Check the effect on capacity, cost and timing. Agree material changes before adding them to delivery.'],
    ], { style: 'card' }),
    s('panels', { items: [
      { eyebrow: 'PARTNERSHIP INVESTMENT', title: 'Monthly investment.\nAnnual commitment.', body: 'Your proposal sets the workstreams, delivery capacity, complexity and monthly fee for the 12-month engagement.',
        bullets: arrows(['Agreed priorities and delivery capacity', 'Defined review and reporting cadence', 'Clear change and approval procedures']),
        note: 'The full annual commitment, exclusions and applicable tax treatment are made clear before you sign.' },
      { eyebrow: 'BUDGET VISIBILITY', title: 'Know what sits\nalongside the fee.',
        bullets: arrows(['Advertising and media spend', 'Software, platform and hosting subscriptions', 'Content production or specialist requirements', 'Additional work approved through the change process']),
        note: 'Applicable third-party costs and additional work are itemised in the proposal or approved change.' },
    ] }),
    faq('BEFORE WE BEGIN', 'A few useful answers.', [
      ['Why a 12-month commitment?', 'It creates continuity for implementation, learning and improvement across several cycles. The first quarter establishes a focused foundation; later priorities respond to evidence.'],
      ['Is the 90-day rollout a trial?', 'No. It is the opening delivery cycle within the 12-month partnership. Review points help us plan the work; they do not replace the contractual term.'],
      ['What if priorities or results change?', 'We review the evidence and reprioritise within the agreed capacity. Material scope changes follow the change process; review points do not replace the contractual term.'],
      ['What does the partnership cost?', 'The monthly fee depends on the agreed workstreams, delivery capacity and complexity. Your proposal sets out the full commitment, exclusions and applicable tax treatment before you sign.'],
      ['Can you guarantee performance in the first 90 days?', 'We agree delivery commitments and performance targets separately. Outcomes depend on the starting position, demand, budget, data quality and your team’s operational follow-through.'],
      ['Who is a Digital Growth Partnership best suited to?', 'It is best suited to an established business with a team of 10 or more, dedicated marketing ownership and the capacity to act on priorities. Your team needs to make decisions, provide access and follow through on leads or operational changes. We assess fit before proposing a partnership.'],
      ['What is included in a 90-day rollout plan?', 'The plan defines a focused objective, prioritised work, dependencies, milestones and performance measures for the quarter. We agree which mix of strategy, design, development, integration and growth skills is needed. The next cycle is shaped by evidence and the ongoing business priority.'],
      ['How will BWD work with our internal marketing team?', 'We agree responsibilities, a decision-maker, review cadence and the shared backlog. Your team provides business context and operational follow-through; BWD supplies the delivery capabilities in the agreed capacity. Reporting makes progress, decisions and constraints visible to both teams.'],
    ]),
    cta('LET’S DEFINE YOUR NEXT MOVE', 'Give the next year\na practical plan.',
      'Tell us the priority, who owns it internally and how your team is organised. We will assess whether a partnership is the right delivery model.',
      L('Request a partnership discussion', LINKS.contact), '12-month commitment · Focused first 90 days · Defined priorities and KPIs'),
  ],
};

const howWeWork = {
  slug: 'how-we-work', title: 'How we work', template: 'engagement', order: 22,
  seo: seo('How We Work: Projects & Partnerships | Best Web Design', 'Two ways to work, one connected approach. Compare scoped projects from R50,000 with 12-month digital growth partnerships.'),
  sections: [
    hero('HOME  /  HOW WE WORK', 'Two ways to work.\nOne connected approach.',
      'Choose a defined project or a continuing partnership. Both start with your business priority and bring together the capabilities needed to move it forward.',
      L('Explore scoped projects', LINKS.projects), L('Explore partnerships', LINKS.partnership)),
    engagement('', 'From R50,000', {
      eyebrow: 'START WITH THE KIND OF CHANGE', title: 'A clear finish line.\nOr a continuing rhythm.', k1: '01 / SCOPED PROJECTS', k2: '02 / DIGITAL GROWTH PARTNERSHIPS',
      b1: 'For a defined build or improvement. Agree requirements, priorities, deliverables and acceptance criteria before delivery starts.',
      n1: 'Final investment, timing and VAT treatment follow the agreed scope.', c1: 'Explore scoped projects',
      b2: 'For established teams ready to improve over time. Begin with a focused 90-day rollout, defined KPIs and a shared quarterly priority.', c2: 'Explore partnerships',
    }),
    s('table', { eyebrow: 'CHOOSE WHAT FITS YOUR BUSINESS', title: 'Make the decision clearer.',
      columns: '\nScoped project\nDigital growth partnership',
      rows: [
        'Best for | A defined change and usable deliverables. | Ongoing improvement with an accountable internal owner.',
        'Planning | Agreed scope, milestones and acceptance criteria. | A 90-day opening rollout, then quarterly priorities.',
        'Commitment | Delivery term and payment milestones set in the agreement. | A 12-month agreement with defined capacity and review cadence.',
        'Investment | Projects from R50,000; final fee follows the scope. | Monthly fee based on workstreams, capacity and complexity.',
        'Success | Test the deliverables; scope post-launch measurement where required. | Review delivery and agreed KPIs against a defined baseline.',
      ].join('\n') }),
    steps3('THE WORK STILL CONNECTS', 'Your priority determines\nthe service mix.', [
      ['01 / CLARIFY', 'Agree the business task', 'Understand the journey, requirements, systems, evidence and decision-makers.'],
      ['02 / CONNECT', 'Plan the right capabilities', 'Identify what to design, build, integrate or improve, with clear ownership.'],
      ['03 / REVIEW', 'Make progress visible', 'Review agreed deliverables and measures. Use the evidence to decide what follows.'],
    ], { style: 'card', intro: 'Design, development, integration and marketing work together where the outcome needs them. The scope makes those connections and responsibilities clear.' }),
    s('split', { eyebrow: 'A GOOD FIT MATTERS', title: 'Bring the people\nwho can make it happen.', body: 'Projects need a decision-maker, a clear business need and a suitable budget. Partnerships work best with established businesses, typically with 10+ people, a dedicated marketing owner and the structure to implement the plan.' }),
    faq('BEFORE WE BEGIN', 'A few useful answers.', [
      ['How do we choose the right model?', 'Start with whether the need has a defined finish line or requires continuing improvement. We review the priority, readiness and budget before recommending the next discussion.'],
      ['Can a project lead into a partnership?', 'Yes, where ongoing work is a suitable fit. The partnership scope, fee, capacity and term are agreed separately; it is not an automatic continuation.'],
      ['Do both models include integration?', 'We consider the systems and handovers needed for the outcome. The agreed scope defines which integrations and supporting capabilities are included.'],
      ['What happens in the first discovery conversation?', 'We discuss the business priority, current customer journey, systems, team and constraints. The goal is to understand whether there is a suitable project or partnership to explore. If more detailed discovery is needed, we explain its scope and cost before you commit.'],
      ['How do you turn business requirements into a delivery plan?', 'We identify the intended outcome, current constraints and supporting systems. We then prioritise deliverables, dependencies, acceptance criteria and responsibilities. This connects the work to an agreed scope and gives your team clear decisions at each stage.'],
      ['Can you collaborate with our existing agency or developers?', 'Yes, where responsibilities and access can be agreed. We define what BWD owns, what other partners deliver and how changes are reviewed. A clear handover and shared priorities reduce duplicated work and gaps between suppliers.'],
      ['What makes a project ready to start?', 'A project needs an agreed scope, decision-maker, budget and access to the required content, systems and people. We also confirm dependencies and acceptance criteria. Gaps can be addressed through a scoped discovery phase before delivery dates are committed.'],
      ['How do you keep us informed during delivery?', 'The proposal defines the working cadence, milestone reviews and reporting. We make decisions, blockers, scope changes and next actions visible. For growth partnerships, the review also considers agreed KPIs and the priorities for the next delivery cycle.'],
    ]),
    cta('', 'Choose the next move\nthat fits your business.', 'Explore the delivery model, responsibilities and investment before sharing your brief.',
      L('Explore scoped projects', LINKS.projects), '', L('Explore partnerships', LINKS.partnership)),
  ],
};

const news = {
  slug: 'news', title: 'News', order: 30,
  seo: seo('News, Case Studies & Trends | Best Web Design', 'Connected customer journeys and ideas shaping design, development, integration and marketing for established businesses.'),
  sections: [
    hero('HOME  /  NEWS', 'Work, ideas\nand what’s next.', 'Explore connected customer journeys and ideas shaping design, development, integration and marketing.'),
    s('newsList', {}),
    cta('', 'Put a useful idea\nto work.', 'Connect the business priority to the right scope, skills and delivery model.',
      L('How we work', LINKS.howWeWork), '', L('Explore our services', '/#services')),
    faq('YOUR QUESTIONS, ANSWERED', 'Before you explore.', [
      ['What is the difference between Case studies and Trends?', 'Case studies examine a particular delivery challenge and the work around it. Trends explain changes in tools, customer behaviour and digital practice. Use the category filters to find the type of insight that is most useful for your current decision.'],
      ['How can I find an example relevant to my industry?', 'Start with the business problem: direct bookings, qualified enquiries, ecommerce conversion or operational handovers. The same underlying issue can appear across different sectors. Contact BWD with your context if you need help judging whether an example applies to your business.'],
      ['Are the case studies on this page verified client results?', 'Previews labelled illustrative demonstrate the intended content and layout, not verified client performance. Published client stories should identify the scope, starting position and evidence behind any approved outcome claims.'],
      ['How should I assess an agency case study?', 'Look for a clear problem, an explained scope, a credible baseline and outcomes over a stated period. Ask what other changes influenced performance and who can verify the result. A percentage without context is not enough to judge whether the work fits your needs.'],
      ['Which AI and marketing trends deserve attention first?', 'Prioritise a trend when it addresses a real customer or operational problem, has a clear owner and can be measured. Check the cost, data requirements and implementation effort. A new tool is useful when it improves the business workflow you actually need.'],
      ['How do I turn an insight into a scoped project?', 'Define the outcome you want, the current constraint and the systems involved. BWD can assess the priority and the skills required, then agree scope and acceptance criteria. Qualifying projects start at R50,000.'],
      ['Can I receive new case studies and trend articles by email?', 'Use the newsletter sign-up on this page to request updates. Subscription preferences and unsubscribe options should be available in the emails. An audit or project enquiry does not automatically subscribe you to marketing updates.'],
      ['Can BWD help us apply these ideas to our existing systems?', 'Yes. We begin with the platforms, customer journeys and team workflows you already have. The appropriate project or partnership brings together the design, development, integration and growth work needed for your priority.'],
    ]),
    s('form', { form: 'newsletter', title: 'Stay updated on new ideas.', intro: 'Sign up for case studies, trends and practical notes on connected digital delivery.', submitLabel: 'Sign up', success: 'You’re signed up.\nWe’ll send new case studies and trends to your inbox.' }),
  ],
};

// Integration logo masters from Figma (Components / 06 Integration logos), saved in public/assets/figma.
const TECH = [['Figma', 'figma'], ['Storybook', 'storybook'], ['Maze', 'maze'], ['Microsoft Clarity', 'microsoft-clarity'], ['Google Analytics', 'google-analytics'],
  ['Typeform', 'typeform'], ['HubSpot', 'hubspot'], ['Website', 'website'], ['NightsBridge', 'nightsbridge'], ['WordPress', 'wordpress'], ['SimplyBook.me', 'simplybook'],
  ['WooCommerce', 'woocommerce'], ['Payfast', 'payfast'], ['Ozow', 'ozow'], ['Mobicred', 'mobicred'], ['Shopify', 'shopify'], ['Bob Go', 'bob-go'], ['Xero', 'xero'],
  ['CRM', 'crm'], ['monday.com', 'monday'], ['n8n', 'n8n'], ['OpenAI', 'openai'], ['Claude', 'claude'], ['SharePoint', 'sharepoint'], ['Power Automate', 'power-automate'],
  ['Auth0', 'auth0'], ['Dynamic QR', 'dynamic-qr'], ['Cue', 'cue'], ['WhatsApp', 'whatsapp'], ['Brevo', 'brevo'], ['Omnisend', 'omnisend'],
  ['Merchant Center', 'merchant-center'], ['Meta', 'meta'], ['Google Ads', 'google-ads'], ['Google Data Studio', 'google-data-studio']];
const ALIAS = { ga4: 'google-analytics', 'meta conversions api': 'meta' };
const techFile = (name) => ALIAS[name.toLowerCase()] || TECH.find(([n]) => n.toLowerCase() === name.toLowerCase())?.[1];
const techLogos = (platforms) => platforms.split(/\s*[+/]\s*/).map((name) => ({ name, file: techFile(name) }))
  .filter((t) => t.file).map((t) => ({ image: `/assets/figma/int-${t.file}.png`, alt: t.name }));
const IC = (code, title, outcome, platforms, fit, measure, disciplines) => ({ code, title, outcome, platforms, fit: `Best for: ${fit}`, measure: `Measure: ${measure}`, disciplines, logos: techLogos(platforms) });
const integrations = {
  slug: 'integrations', title: 'Integrations', order: 31,
  seo: seo('Integrations: CRM, Payments, Booking & AI | Best Web Design', 'Connect HubSpot, WooCommerce, Payfast, Ozow, NightsBridge, Xero, Bob Go, n8n and more around one customer journey. 24 integration examples.'),
  sections: [
    hero('INTEGRATIONS / CONNECTED DIGITAL DELIVERY', 'Connected tools.\nClearer outcomes.',
      'Connect the tools your team relies on to create better customer journeys, reduce manual work and make performance easier to measure.',
      L('Explore integrations', '#catalogue'), L('Scope a project', LINKS.contact),
      'For established teams  ·  Projects from R50,000  ·  12-month partnerships with focused 90-day rollouts'),
    s('cards', { eyebrow: 'THE BUSINESS PRIORITY', title: 'One journey. The right mix of skills.', columns: '4',
      intro: 'A booking, enquiry or order rarely improves through one discipline alone. We connect the experience, the technology, the data and the follow-up around an agreed business priority.',
      items: [['01', 'Design', 'Make the journey clear.'], ['02', 'Development', 'Build the experience.'], ['03', 'Integration', 'Connect data and actions.'], ['04', 'Growth Marketing', 'Measure and improve.']]
        .map(([kicker, title, body]) => ({ kicker, title, body })),
      cta: L('Explore systems integration', LINKS.systems) }),
    s('logos', { eyebrow: 'TECHNOLOGIES', title: 'Experienced integration.', style: 'grid', items: TECH.map(([label, f]) => ({ label, image: `/assets/figma/int-${f}.png` })) }),
    s('integrations', { anchor: 'catalogue', eyebrow: 'EXPLORE POSSIBILITIES', title: 'Find the connections\nyour business needs.',
      intro: 'Browse integration examples for established marketing and operations teams. We scope the right combination around your existing systems, customer journey and priorities.',
      filterHelp: 'Choose a discipline below. Some integrations support more than one, so they appear in multiple filters.',
      items: [
        IC('I01 / DESIGN', 'Design that reaches production', 'Keep interface designs and built components easier to compare and maintain.', 'Figma + Storybook', 'B2B / SaaS teams', 'UI rework per release', 'Design, Development'),
        IC('I02 / DESIGN', 'Test before you build', 'Test important journeys with users before committing to development.', 'Figma + Maze', 'Booking / checkout teams', 'Task completion rate', 'Design'),
        IC('I03 / DESIGN', 'See where journeys stall', 'Connect behavioural evidence with analytics to prioritise UX improvements.', 'Microsoft Clarity + GA4', 'Travel / retail / services', 'Journey completion rate', 'Design, Growth'),
        IC('I04 / DESIGN', 'Turn forms into useful context', 'Capture structured answers and map them to the right contact or deal.', 'Typeform + HubSpot', 'B2B / considered purchases', 'Qualified enquiry rate', 'Design, Integration'),
        IC('I05 / DEVELOPMENT', 'Make direct bookings easier', 'Connect your website to live accommodation booking and availability.', 'Website + NightsBridge', 'Luxury travel / accommodation', 'Direct booking completion', 'Development, Integration'),
        IC('I06 / DEVELOPMENT', 'Connect appointment journeys', 'Bring appointment booking into the website with a clear route to confirmation.', 'WordPress + SimplyBook.me', 'Beauty / wellness / practices', 'Appointment completion rate', 'Development, Integration'),
        IC('I07 / DEVELOPMENT', 'Offer familiar ways to pay', 'Connect online checkout with locally relevant payment options.', 'WooCommerce + Payfast', 'South African ecommerce', 'Successful payment rate', 'Development, Integration'),
        IC('I08 / DEVELOPMENT', 'Add instant EFT to checkout', 'Give eligible South African customers an instant EFT payment route.', 'WooCommerce + Ozow', 'South African ecommerce', 'EFT checkout completion', 'Development, Integration'),
        IC('I09 / DEVELOPMENT', 'Support approved credit options', 'Add a supported credit payment option for eligible shoppers at checkout.', 'Payfast + Mobicred', 'Higher-value retail', 'Completion by payment method', 'Development, Integration'),
        IC('I10 / DEVELOPMENT', 'Connect orders to delivery', 'Move store orders into fulfilment and keep delivery status connected.', 'WooCommerce / Shopify + Bob Go', 'Retail / ecommerce teams', 'Order-to-dispatch time', 'Development, Integration'),
        IC('I11 / INTEGRATION', 'Reduce invoice re-entry', 'Create accounting invoices from store sales with agreed tax and payment mapping.', 'WooCommerce + Xero', 'Established ecommerce', 'Invoice exception rate', 'Integration'),
        IC('I12 / INTEGRATION', 'Give every enquiry an owner', 'Send website enquiries into a CRM with source context and a follow-up process.', 'WordPress + HubSpot', 'Travel / B2B / services', 'Time to first response', 'Integration, Growth'),
        IC('I13 / INTEGRATION', 'Connect sales to delivery', 'Turn an agreed sales milestone into a clear internal delivery handover.', 'CRM + monday.com', 'B2B / service teams', 'Handover completion time', 'Integration'),
        IC('I14 / DEVELOPMENT', 'Put AI inside a useful workflow', 'Summarise, classify or draft within a connected workflow, with review where needed.', 'n8n + OpenAI / Claude', 'Marketing / operations teams', 'Time per reviewed task', 'Development, Integration'),
        IC('I15 / INTEGRATION', 'Keep approvals moving', 'Route documents and requests to the people who need to review them.', 'SharePoint + Power Automate', 'Established internal teams', 'Approval turnaround time', 'Integration'),
        IC('I16 / DEVELOPMENT', 'Simplify portal access', 'Connect portal sign-in with an agreed identity provider and access model.', 'WordPress + Auth0', 'B2B / member portals', 'Successful sign-in rate', 'Development, Integration'),
        IC('I17 / DESIGN', 'Connect physical touchpoints', 'Route a scan to a useful digital experience and update the destination over time.', 'Dynamic QR + website + GA4', 'Hospitality / retail / events', 'Scan-to-action conversion', 'Design, Growth'),
        IC('I18 / DESIGN', 'Join up customer conversations', 'Connect conversations with customer context and a clear human handover.', 'Cue + WhatsApp + CRM', 'Travel / retail / service teams', 'Qualified conversation rate', 'Design, Integration'),
        IC('I19 / INTEGRATION', 'Nurture from customer context', 'Use CRM context for relevant email journeys and return activity to the CRM.', 'HubSpot + Brevo', 'B2B / travel / services', 'Lead-to-opportunity rate', 'Integration, Growth'),
        IC('I20 / INTEGRATION', 'Build better repeat journeys', 'Connect customer and order data with relevant retention and cart-recovery journeys.', 'WooCommerce + Omnisend', 'Retail / ecommerce teams', 'Repeat purchase rate', 'Integration, Growth'),
        IC('I21 / DEVELOPMENT', 'Keep product feeds connected', 'Synchronise product information to support eligible Google listings and campaigns.', 'WooCommerce + Merchant Center', 'Retail / ecommerce teams', 'Approved product coverage', 'Development, Integration, Growth'),
        IC('I22 / INTEGRATION', 'Feed lead quality back to Meta', 'Return appropriate CRM milestones so campaigns can be assessed against lead quality.', 'CRM + Meta Conversions API', 'B2B / considered purchases', 'Cost per qualified lead', 'Integration, Growth'),
        IC('I23 / INTEGRATION', 'Connect Google Ads to outcomes', 'Return qualified lead and sales milestones to improve campaign measurement.', 'CRM + Google Ads', 'B2B / travel / services', 'Cost per qualified opportunity', 'Integration, Growth'),
        IC('I24 / GROWTH MARKETING', 'Make performance easier to read', 'Bring agreed website and campaign measures into a shared reporting view.', 'GA4 + Google Data Studio', 'Marketing-led teams', 'Reporting time / data completeness', 'Growth, Integration'),
      ],
      note: 'These are platform examples to assess together. Compatibility, access, licensing and implementation scope are confirmed during discovery. Measures are agreed with your team; results are not guaranteed.' }),
    s('cards', { eyebrow: 'START WITH WHAT MATTERS', title: 'Build around a real customer journey.', columns: '3',
      intro: 'These illustrative combinations show how the disciplines work together. Your roadmap starts with your systems, your baseline and the point of friction worth fixing first.',
      items: [
        { kicker: 'TRAVEL & ACCOMMODATION', title: 'From interest\nto direct booking', body: 'Website → NightsBridge → reporting\n\nClarify the booking path, connect availability and define how completed bookings will be measured.', note: 'Measure: direct booking completion' },
        { kicker: 'RETAIL & ECOMMERCE', title: 'From checkout\nto the next order', body: 'WooCommerce → Payfast → Bob Go → Omnisend\n\nConnect payment, delivery and relevant follow-up so the experience continues after checkout.', note: 'Measure: dispatch time + repeat purchases' },
        { kicker: 'B2B & SERVICE TEAMS', title: 'From enquiry\nto a clear next step', body: 'WordPress → HubSpot → monday.com\n\nCapture the right context, assign an owner and turn an agreed milestone into a delivery handover.', note: 'Measure: response + handover time' },
      ] }),
    steps3('HOW WE MAKE IT WORK', 'Map it. Connect it. Keep it useful.', [
      ['01 / DEFINE', 'Choose the priority', 'Map the journey, systems and data. Agree a baseline, access requirements, owner and the outcome worth improving.'],
      ['02 / DELIVER', 'Build and validate', 'Connect the right tools. Test the customer experience, field mapping, failure paths and permissions before release.'],
      ['03 / IMPROVE', 'Measure and maintain', 'Monitor the agreed KPIs and connection health. Resolve exceptions, document ownership and prioritise the next improvement.'],
    ], { intro: 'A connection needs a clear owner, reliable data and a way to see whether it is doing its job.' }),
    engagement('Choose the engagement that matches your priorities, internal ownership and pace of improvement.', 'From R50,000', {
      eyebrow: 'TWO WAYS TO WORK TOGETHER', title: 'A defined project.\nOr an ongoing growth partnership.', k1: '01 / SCOPED PROJECTS', k2: '02 / DIGITAL GROWTH PARTNERSHIPS',
      b1: 'For a defined integration priority. We scope and prioritise the work around your requirements, dependencies and acceptance criteria.',
      n1: 'A purposeful mix of design, development, integration and measurement.',
      b2: 'For established teams of 10+ with a dedicated marketing owner. A focused 90-day rollout sets the priorities, baseline and agreed KPIs.',
      n2: 'Review progress, improve the journey and reprioritise throughout the partnership.', c2: 'Explore partnerships',
    }),
    faq('A FEW USEFUL ANSWERS', 'Integration questions, answered.', [
      ['Can you work with the tools we already use?', 'That is the starting point. We review your current tools, access, data quality and team workflows, then recommend what to connect, improve or replace. Compatibility and any platform limits are confirmed in discovery.'],
      ['Does an integration have to be a standalone project?', 'No. It can sit inside a website, customer experience or growth programme. We combine the disciplines needed for the agreed outcome and make the dependencies clear in the scope.'],
      ['What if our platform is not listed?', 'The catalogue is a set of examples. We can assess other platforms, available APIs and middleware options. Complex ERP, predictive ML or computer-vision work needs a separate feasibility assessment and, where appropriate, specialist delivery support.'],
      ['How do you measure success?', 'We agree a baseline, data source and KPI owner before delivery. Measures might include response time, booking completion, successful payments, dispatch time or qualified opportunities. Targets depend on the scope and available evidence.'],
      ['What happens after the integration goes live?', 'We define monitoring, documentation, exception handling and ownership as part of the scope. Ongoing support and optimisation can be agreed through a growth partnership or a separately scoped support arrangement.'],
      ['Which integrations matter most for an established business?', 'Start with the handovers most closely linked to your priority: enquiry to CRM, order to fulfilment, booking to confirmation, or campaign to reporting. We assess the cost of the current gap and the reliability of the available data before recommending a connection.'],
      ['Can you connect South African payment and delivery providers?', 'We can assess supported providers against your ecommerce platform and operational requirements. Availability depends on each provider\'s APIs, account eligibility, licences and supported regions. The catalogue gives examples; discovery confirms the exact combination and any third-party costs.'],
      ['How much should we budget for an integration project?', 'Qualifying projects start at R50,000. Complexity depends on the number of systems, data rules, security, migration, testing and support requirements. The proposal separates implementation from licences, transaction fees, hosting and ongoing monitoring where these apply.'],
    ]),
    cta('LET’S CONNECT THE RIGHT THINGS', 'Start with the journey\nyou want to improve.',
      'Bring your current tools, the point of friction and the outcome that matters. We will help define the priorities, dependencies and right mix of skills.',
      L('Explore scoped projects', LINKS.projects), 'Useful starting points: your website · your CRM or booking tools · your internal owner · the result you want to improve', L('Explore partnerships', LINKS.partnership)),
  ],
};

const contact = {
  slug: 'contact', title: 'Contact', order: 40,
  seo: seo('Contact Best Web Design | Start a Project Conversation', 'Tell us what needs to work better. We’ll help define the right scope, the right mix of skills and a practical next step. Call +27 10 753 2316.'),
  sections: [
    hero('HOME  /  CONTACT', 'Let’s connect\nthe next move.', 'Tell us what needs to work better. We’ll help define the right scope, the right mix of skills and a practical next step.', null, null, '', { align: 'left' }),
    s('form', { form: 'contact', eyebrow: 'START WITH THE BUSINESS PRIORITY', title: 'A useful first conversation.',
      intro: 'Share the challenge, the systems involved and the result you want. Your team’s context helps us ask better questions.',
      items: [
        { title: 'Scoped projects', body: 'A defined outcome, prioritised requirements and a clear finish line. Projects from R50,000.' },
        { title: 'Digital Growth Partnerships', body: '12-month engagements with focused 90-day rollout plans. Best suited to established teams with a marketing owner.' },
      ],
      showContact: true, support: 'Already a client? Use the support route and response commitments in your agreement.',
      formTitle: 'Tell us about your next priority.', submitLabel: 'Send enquiry',
      privacy: 'By sending this enquiry, you ask BWD to contact you about your requirements. Read our Privacy Notice for how your information is handled.',
      success: 'Thanks for the context.\nWe’ll review your requirements and contact you about a suitable next step.' }),
    s('steps', { eyebrow: 'CLEAR NEXT STEPS', title: 'From conversation to clarity.', style: 'card', items: [
      { kicker: '01', title: 'Understand the priority', body: 'We review your business context, current journey and the outcome you want.' },
      { kicker: '02', title: 'Assess the right fit', body: 'We consider scope, systems, budget and the people who will own the work.' },
      { kicker: '03', title: 'Define a useful next step', body: 'We recommend a scoped project, suitable partnership or further discovery.' },
    ] }),
    faq('YOUR QUESTIONS, ANSWERED', 'Before you get in touch.', [
      ['How do we start a conversation with BWD?', 'Tell us about your business, the main challenge and the outcome you want. The contact form helps route the enquiry to the right discussion. If you would like an initial view of your website before defining scope, use the Free Audit option.'],
      ['What information should we include in a project enquiry?', 'Share your website, business context, key requirements, systems involved and any target dates. A budget range and decision-maker also help us assess fit. Please avoid sending passwords, payment details or sensitive customer information through the enquiry form.'],
      ['What is the minimum budget for a project?', 'Qualifying projects start at R50,000. The final scope and price depend on the work, integrations and delivery requirements. Your proposal confirms the investment, third-party costs and applicable VAT treatment before commitment.'],
      ['Can we contact you about ongoing digital growth support?', 'Yes. Digital Growth Partnerships run for 12 months, with focused 90-day rollout plans. They are best suited to established businesses with teams of 10 or more and dedicated marketing ownership. We first discuss your goals, readiness and available capacity.'],
      ['Do you work with businesses outside Johannesburg?', 'We can assess projects for businesses across South Africa. The enquiry helps establish location, stakeholder availability and any on-site requirements. Meeting arrangements and travel, where needed, are agreed as part of the engagement.'],
      ['Where should an existing client request support?', 'Use the support contact and escalation route in your agreement. The WhatsApp support option provides another way to start a conversation once connected to BWD\'s support number. Support availability and response commitments depend on the agreed service.'],
      ['Will we receive a quote immediately after submitting the form?', 'The first step is to understand the requirement and whether there is a suitable engagement. A dependable quote needs enough detail about scope, content, systems and dependencies. We explain any additional discovery required before a delivery commitment is made.'],
      ['Can we bring our marketing manager or technical team into the discussion?', 'Yes. Involving the people responsible for marketing, systems and approvals helps us understand dependencies early. We recommend including the decision-maker and anyone who will own the workflow or measurement after delivery.'],
    ]),
  ],
};

const audit = {
  slug: 'free-audit', title: 'Free Audit', order: 41,
  seo: seo('Free Website Audit for Established Businesses | Best Web Design', 'Find your next useful improvement. Request a free, no-obligation review of your website experience, conversion, measurement and connected workflows.'),
  sections: [
    hero('HOME  /  FREE AUDIT', 'Find your next\nuseful improvement.', 'Start with a focused look at your website and business priorities. Share a little context in three steps so we can make the review relevant.', null, null, '', { align: 'left' }),
    s('form', { form: 'audit', eyebrow: 'A FOCUSED STARTING POINT', title: 'Clarity before\ncommitment.',
      intro: 'For established businesses ready to improve how their digital experience works.',
      items: [
        { title: 'Experience & conversion', body: 'Where the customer journey may create friction.' },
        { title: 'Measurement & handovers', body: 'How actions connect to useful business outcomes.' },
        { title: 'A sensible next step', body: 'What may need further discovery or a defined scope.' },
      ],
      support: 'This initial review carries no obligation. Detailed research, technical investigation and implementation are scoped separately.',
      submitLabel: 'Request my free audit',
      privacy: 'By submitting, you ask BWD to contact you about this audit request. Read our Privacy Notice for how your information is handled.',
      success: 'Thanks. Your request is in.\nWe will review your website and business context, then contact you about the findings and a suitable next step.\n01  We review your request · 02  We assess the priority and fit · 03  We discuss useful next steps\nThe initial review carries no obligation to start a paid project.' }),
    faq('YOUR QUESTIONS, ANSWERED', 'About your Free Audit.', [
      ['What does the Free Audit include?', 'The Free Audit is an initial review of your website and the business priority you share. It looks for useful opportunities across experience, conversion, measurement and connected workflows. The next conversation clarifies the findings and whether a more detailed scoped assessment would help.'],
      ['Is the Free Audit a full technical or security audit?', 'No. It is a directional starting point based on the information available. A complete UX research programme, security assessment, accessibility certification or technical discovery requires its own agreed scope. Any paid work is explained before you commit.'],
      ['Who is the Free Audit intended for?', 'It is intended for established businesses with an existing website and a clear goal to improve. Share your team size and marketing ownership so we can assess fit. Paid projects start at R50,000; ongoing partnerships require the capacity to support implementation and decisions.'],
      ['What information do I need to complete the form?', 'Provide your business name, website, industry, team context, primary goal and a short description of the challenge. Then add your contact details so we can respond. Current platform names and a potential budget range help focus the review but do not replace discovery.'],
      ['Do you need passwords or access to our systems?', 'Do not send passwords or sensitive customer data in this form. The initial review uses your public website and the context you provide. If deeper access is later required, we agree the purpose, permissions and a suitable way to share access separately.'],
      ['Does requesting an audit commit us to a project or retainer?', 'No. The initial review carries no obligation to start paid work. If there is a suitable next step, we discuss a scoped project or a 12-month growth partnership and provide a separate proposal before you decide.'],
      ['When will we receive the audit findings?', 'After reviewing your request, BWD will confirm the next step and expected timing with you. Timing depends on the scope of the initial review and team availability. The form does not promise an instant automated report or a fixed response window.'],
      ['Will the audit guarantee more leads, bookings or sales?', 'No. The review identifies opportunities and questions to investigate. Results depend on the starting position, demand, implementation, budget and operational follow-through. If we proceed, we agree appropriate KPIs, baselines and delivery commitments as part of the scope.'],
    ]),
  ],
};

// Not in Figma — footer links need a destination. Replace with your approved legal copy, then turn off noindex.
const legal = (slug, title) => ({
  slug, title, order: 90, published: true, seo: { noindex: true },
  sections: [hero(`HOME  /  ${title.toUpperCase()}`, title, '', null, null, '', { align: 'left' }),
    s('richText', { html: `<p>Add your approved ${title.toLowerCase()} in Admin → Pages → ${title}.</p>` })],
});

module.exports = [scoped, partnership, howWeWork, news, integrations, contact, audit, legal('privacy', 'Privacy Notice'), legal('terms', 'Terms')];
