/* ══════════════════════════════════════════════════════════════════════
   Boomi Data Management Whiteboard — segment map + presenter talking points

   ONE source of truth, read by three consumers:
     · each chapter HTML  — to know which beats belong to which segment,
                            so speaker mode can reveal them on demand
     · index.html         — segment counts and labels for the player
     · presenter.html     — talking points and discovery questions

   Each segment:
     key    stable id
     label  short name shown in the player and presenter page
     ids    every beat id revealed by this segment. Order inside a segment
            keeps the authored relative timing.
     points 2-4 prompts. These are NOT a script to read — they are what to
            cover. Presenters use their own words.
     ask    one discovery question to turn the segment into a conversation
     land   the specific number or claim worth landing (optional)

   If a beat id is added to a chapter it MUST be added here too, or speaker
   mode will never reveal it. index.html verifies this on load and warns.
   ══════════════════════════════════════════════════════════════════════ */

window.WB_SEGMENTS = {

  '01-intro': [
    {
      key: 'sources-frame', label: 'The problem',
      ids: ['logo-wb', 'src-title', 'src-rule'],
      points: [
        'Every enterprise runs on fragmented data — thousands of sources, each with its own credentials, endpoints and quirks.',
        'Before you can analyse it, move it, or run AI on it, you have to be able to reach it.',
        'Set up that four categories drive most of the complexity.',
      ],
      ask: 'Roughly how many systems would have to be in the picture before an AI initiative here was actually useful?',
    },
    {
      key: 'apis', label: 'APIs',
      ids: ['api-ell', 'api-L', 'api-R', 'api-arc', 'api-lbl', 'api-sub1', 'api-sub2',
            'dot-a1', 'dot-a2', 'dot-a3'],
      points: [
        'Salesforce, NetSuite, Jira, marketing platforms.',
        'A typical enterprise runs dozens, and each behaves differently.',
      ],
      ask: 'Which of your SaaS systems causes the most integration rework when the vendor changes something?',
    },
    {
      key: 'databases', label: 'Databases',
      ids: ['dbs-ell', 'dbs-L', 'dbs-R', 'dbs-arc', 'dbs-lbl', 'dbs-sub1', 'dbs-sub2',
            'dot-b1', 'dot-b2'],
      points: [
        'SQL Server, Oracle, MySQL, PostgreSQL — the operational core.',
        'Usually on-prem, often the most sensitive, hardest to replicate without disrupting the business.',
      ],
      ask: 'Are any of those databases load-bearing enough that you would not allow a tool to query them directly?',
      land: 'This sets up why CDC matters later — do not skip it.',
    },
    {
      key: 'sap', label: 'SAP',
      ids: ['sap-rect', 'sap-lbl', 'sap-sub', 'dot-c1'],
      points: [
        'SAP gets its own category, deliberately.',
        'Flag that you will come back to why — do not explain it yet.',
      ],
      ask: 'Is SAP in the estate, and is it ECC, S/4, or mid-migration?',
    },
    {
      key: 'files', label: 'Files',
      ids: ['files-rect', 'files-lbl', 'files-sub'],
      points: [
        'CSV, SFTP, FTP, managed file transfer at scale.',
        'Structured and unstructured — the wild west of the data landscape.',
      ],
      ask: 'How much of your partner or supplier data still arrives as a file drop?',
    },
    {
      key: 'whats-coming', label: 'What comes next',
      ids: ['bdi-ghost', 'src-arrows-ghost', 'dest-ghost'],
      points: [
        'Ghost the shape of the architecture to come, then move on.',
        'Do not explain BDI here — the next chapter does it.',
      ],
      ask: '',
    },
  ],

  '02-bdi': [
    {
      key: 'bridge', label: 'BDI as the bridge',
      ids: ['src-arrows', 'bdi-title', 'icon-bdi', 'bdi-subtitle', 'bdi-rect'],
      points: [
        'Boomi Data Integration is the bridge from those fragmented sources to everything downstream.',
        'One layer, not a per-source project.',
      ],
      ask: 'Today, who builds and maintains the pipes between those systems?',
    },
    {
      key: 'ingestion', label: 'Ingestion side',
      ids: ['bdi-divider', 'hdr-ingest', 'hdr-line-L',
            'ing-connectors', 'ing-connectors-b', 'ing-connectors-sub'],
      points: [
        'Left half is ingestion — reading from your sources and getting data into your environment.',
        'Five connector types, each built for a different class of source.',
      ],
      ask: '',
      land: 'Five connector types. Say the number — the next chapter pays it off.',
    },
    {
      key: 'transform', label: 'Transform & orchestrate',
      ids: ['hdr-transform', 'hdr-line-R', 'trx-clean', 'trx-orchestrate', 'dest-ghost'],
      points: [
        'Right half is transformation and orchestration — shaping the data and coordinating what happens once it is there.',
        'Hand off into the five connector types.',
      ],
      ask: '',
    },
  ],

  '03-connectors': [
    {
      key: 'frame', label: 'Five connector types',
      ids: ['bdi-rect', 'bdi-div', 'ing-hdr', 'trn-hdr'],
      points: [
        'Frame the five. Draw the container fast — nothing to say here yet.',
      ],
      ask: '',
    },
    {
      key: 'native', label: 'Native connectors',
      ids: ['nat-rect', 'nat-title', 'nat-d1', 'nat-d2'],
      points: [
        'Around two hundred, covering the most common API-based sources.',
        'When a vendor changes an endpoint, updates pagination or rotates credentials, Boomi maintains the connector.',
        'The data flow keeps running without human intervention.',
      ],
      ask: 'When a SaaS vendor changes their API today, who finds out first — your team or your users?',
      land: '~200 connectors, and Boomi maintains them. The maintenance point matters more than the count.',
    },
    {
      key: 'cdc', label: 'CDC',
      ids: ['cdc-rect', 'cdc-title', 'cdc-d1', 'cdc-d2'],
      points: [
        'Change Data Capture — the most efficient way to get data out of operational databases.',
        'Reads the transaction logs instead of querying the database.',
        'No load on the production system, no impact on the applications running on top.',
      ],
      ask: 'Has a reporting or integration job ever slowed down one of your production systems?',
      land: 'For databases that are load-bearing in production, this is the only acceptable approach.',
    },
    {
      key: 'sap', label: 'SAP Data Connector',
      ids: ['sap-rect', 'sap-title', 'sap-d1', 'sap-d2', 'sap-d3'],
      points: [
        'Runs on-prem inside the SAP environment, built natively into BDI and paired with Boomi for SAP.',
        'Certified, SAP-validated — tested and approved to run natively inside the SAP ecosystem.',
        'Every table, dataset and trigger can stream through Boomi’s event layer into BDI. Effectively CDC for SAP.',
      ],
      ask: 'How are you getting SAP data out today, and what does that cost you in latency?',
      land: 'One of very few vendors who can do this. This is the strongest claim in the chapter — slow down.',
    },
    {
      key: 'dca', label: 'Data Connector Agent',
      ids: ['dca-rect', 'dca-title', 'dca-d1', 'dca-d2', 'dca-d3'],
      points: [
        'Building a native connector for every system in the world is not scalable, so DCA does it with AI.',
        'Point it at any third-party system — a niche manufacturing ERP, say.',
        'It reads the vendor documentation, identifies endpoints, credentials and pagination, and generates a working connector on the fly.',
      ],
      ask: 'Is there a system in your estate that no vendor has ever built a connector for?',
      land: 'Unlocks systems that would otherwise need custom development.',
    },
    {
      key: 'mft', label: 'MFT',
      ids: ['mft-rect', 'icon-mft', 'mft-title', 'mft-d1', 'mft-d2'],
      points: [
        'Managed File Transfer — native FTP and SFTP connectors plus governed, secured file transfer at scale.',
        'Be straight about the state: MFT runs as a standalone console today, with native BDI integration on the roadmap.',
      ],
      ask: 'Who owns file transfer today, and is it governed or is it scripts?',
      land: 'Do not overclaim the BDI integration — it is roadmap, not shipped.',
    },
  ],

  '04-knowledge-hub': [
    {
      key: 'context-gap', label: 'Structured is not enough',
      ids: ['khub-title', 'khub-rect', 'kh-icon', 'khub-rule'],
      points: [
        'To run AI agents you need more than structured data. You need context.',
        'For most enterprises the most valuable context lives in unstructured sources — documents, PDFs, images, location feeds.',
        'Traditional data warehouses were not built for this.',
      ],
      ask: 'Where does the knowledge your team actually relies on live — in a system, or in documents?',
    },
    {
      key: 'native-extension', label: 'Native extension of BDI',
      ids: ['khub-line1', 'khub-line2', 'khub-line3', 'khub-sub', 'khub-sub2'],
      points: [
        'Knowledge Hub is a native extension of the data integration layer, not a separate product bolted on.',
        'Any source you can connect to in BDI feeds directly in, vectorized and available for semantic retrieval.',
        'Continuously updated, governed at the source, no custom pipelines.',
      ],
      ask: 'If you stood up a RAG pipeline today, who would keep it fresh six months from now?',
      land: '"Native extension, not bolted on" is the differentiator. Say it plainly.',
    },
    {
      key: 'to-agent', label: 'Feeding the agent',
      ids: ['khub-arrow', 'agent-rect', 'agent-text1', 'agent-text2', 'datahub-ghost'],
      points: [
        'This becomes a context layer the agent can trust.',
        'Ghost Data Hub to set up the next chapter.',
      ],
      ask: '',
    },
  ],

  '05-data-hub': [
    {
      key: 'golden-record', label: 'Golden record layer',
      ids: ['dhub-title', 'dhub-rect', 'icon-dhub', 'dhub-rule'],
      points: [
        'Data Hub is the golden record layer — stewardship, deduplication, synchronised records.',
        'Avoid calling this MDM or a single source of truth. It is deliberately not positioned that way.',
      ],
      ask: 'How many places does a customer or employee record exist in your estate right now?',
      land: 'Say "synchronised records", never "unified master data".',
    },
    {
      key: 'three-systems', label: 'The three-system rule',
      ids: ['dhub-line1', 'dhub-line2', 'dhub-line3'],
      points: [
        'Every time a business integrates three or more systems, Data Hub belongs in the design.',
        'Point-to-point across six or seven systems becomes an architectural tangle — hard to govern, expensive to change, impossible to scale.',
        'With Data Hub in the middle every system connects to one hub instead.',
      ],
      ask: 'How many systems are in scope for this project — and what happens when the eighth one arrives?',
      land: 'Adding a new source is additive effort, not exponential. This is the line people repeat back.',
    },
    {
      key: 'native-bdi', label: 'Native BDI integration',
      ids: ['dhub-native', 'dhub-native2'],
      points: [
        'Golden record datasets flow directly into any data or AI service downstream.',
        'Onboarding a new source is a few clicks rather than a configuration project.',
      ],
      ask: '',
    },
  ],

  '06-use-case': [
    {
      key: 'scenario', label: 'The retailer',
      ids: ['uc-banner', 'src-title', 'src-line'],
      points: [
        'A global retailer. Complex operations, multiple HR systems from years of acquisitions, logistics across dozens of distribution locations.',
        'They want an AI agent to optimise the distribution network — routes, schedules, driver assignments.',
        'Their data is fragmented and their integrations are old and resistant to change.',
      ],
      ask: 'Does that sound closer to your situation than not?',
      land: 'Get the scenario on the table before any architecture. If they do not buy the setup, the rest does not land.',
    },
    {
      key: 'sources', label: 'Their sources',
      ids: ['src-api', 'src-api-sub', 'src-dbs', 'src-dbs-sub',
            'src-sap', 'src-sap-sub', 'src-files', 'src-files-sub', 'src-arrows'],
      points: [
        'Walk the four with their retailer specifics: CRM and marketing, inventory and purchase history, logistics and finance, then photos, PDFs and location data.',
        'Keep it concrete — these labels are what make the example real.',
      ],
      ask: 'Which of those four would be hardest for you to get at today?',
    },
    {
      key: 'bdi', label: 'BDI ingests',
      ids: ['icon-bdi', 'bdi-title', 'bdi-line', 'bdi-rect', 'bdi-divider',
            'bdi-hdr-ing', 'bdi-ing-content', 'bdi-hdr-trx', 'bdi-trx-content'],
      points: [
        'BDI ingests from every relevant source, then the data splits by type.',
      ],
      ask: '',
    },
    {
      key: 'split', label: 'Split by type',
      ids: ['dest-title', 'dest-line', 'arr-to-dwh', 'dwh-rect', 'dwh-title', 'dwh-sub'],
      points: [
        'Name the destinations. The warehouse still has a job — this is not a rip-and-replace story.',
      ],
      ask: 'What is your warehouse today, and is it staying?',
    },
    {
      key: 'unstructured', label: 'Unstructured → Knowledge Hub',
      ids: ['arr-to-khub', 'khub-rect', 'kh-icon', 'khub-title', 'khub-d1', 'khub-d2',
            'khub-sub1', 'khub-sub2', 'khub-sub3'],
      points: [
        'PDFs, location feeds and photos flow into Knowledge Hub, vectorized for semantic retrieval.',
      ],
      ask: '',
    },
    {
      key: 'structured', label: 'Structured → Data Hub',
      ids: ['arr-to-dhub', 'dhub-rect', 'icon-dhub', 'dhub-title', 'dhub-d1', 'dhub-d2',
            'dhub-sub1', 'dhub-sub2', 'dhub-sub3'],
      points: [
        'Employee, driver and delivery records flow into Data Hub, deduplicated and merged into clean golden records.',
      ],
      ask: '',
    },
    {
      key: 'agent', label: 'The agent',
      ids: ['arr-khub-agent', 'arr-dhub-agent', 'agent-rect', 'icon-agent',
            'agent-t1', 'agent-t2', 'agent-rule', 'agent-bubble',
            'agent-q1', 'agent-q2', 'agent-ans', 'agent-feed1', 'agent-feed2'],
      points: [
        'Agent Studio builds an agent that knows who every driver is, across every system that has ever touched that record.',
        'Existing governance and security checks stay in place.',
        'It answers real operational questions — not from stale exports, but from a live governed foundation.',
      ],
      ask: 'What is the first question you would want to ask an agent like that?',
      land: 'Close on: get the data, improve the data, activate it for AI.',
    },
    {
      key: 'close', label: 'Close',
      ids: ['logo-close'],
      points: ['Stop talking. Let it land.'],
      ask: '',
    },
  ],

  '07-meta-hub': [
    {
      key: 'ea-title', label: 'Early Access',
      ids: ['badge-bg', 'badge-lbl', 'eyebrow', 'mh-title', 'mh-title-icon', 'mh-sub', 'div1'],
      points: [
        'One more layer, already in Early Access.',
        'Signal a change of register — the story closed in the last chapter. This is an addition, not a conclusion.',
      ],
      ask: '',
    },
    {
      key: 'gap', label: 'The gap',
      ids: ['prob1', 'prob2', 'prob3', 'prob4', 'prob5', 'prob6',
            'dhub-ghost', 'dhub-ghost-icon', 'dhub-ghost-lbl', 'dhub-ghost-sub'],
      points: [
        'Data Hub gives your agents clean records. But a record does not know what "high-priority" means in your business.',
        'It does not know which customer tier triggers an escalation, or what your team means by "active account".',
      ],
      ask: 'Is there a term your team uses constantly that a new hire would get wrong for months?',
    },
    {
      key: 'tribal-tax', label: 'Tribal Knowledge Tax',
      ids: ['tkx-bg', 'tkx-label', 'tkx-desc', 'tkx-desc2', 'outcome', 'outcome2'],
      points: [
        'That context lives in human heads — definitions, business rules, endorsed terminology.',
        'Trapped in silos, in a spreadsheet someone maintains, or with the one person who has been there eleven years.',
        'We call it the Tribal Knowledge Tax. It creates a reasoning wall for AI.',
      ],
      ask: 'Who in your org is the single point of failure for knowing what the data actually means?',
      land: '"Tribal Knowledge Tax" is the phrase people steal. Land it and pause.',
    },
    {
      key: 'meta-hub', label: 'Meta Hub',
      ids: ['arr-dh-mh', 'arr-dh-mh-lbl', 'mh-rect', 'mh-icon', 'mh-rect-title',
            'mh-rule', 'mh-f1', 'mh-f2', 'mh-f3', 'mh-f4'],
      points: [
        'Meta Hub is the semantic layer that closes that gap.',
        'Business glossaries, endorsed definitions, semantic associations — linking business meaning to the data assets agents already use.',
      ],
      ask: '',
    },
    {
      key: 'forward', label: 'Meaning flows forward',
      ids: ['arr-mh-kh', 'arr-mh-kh-lbl', 'kh-ghost', 'kh-ghost-icon', 'kh-ghost-lbl',
            'kh-ghost-sub', 'arr-kh-as', 'as-ghost', 'as-ghost-icon', 'as-ghost-lbl'],
      points: [
        'Meaning flows forward into Knowledge Hub, and from there into the agent.',
      ],
      ask: '',
    },
    {
      key: 'availability', label: 'Availability',
      ids: ['avail-line', 'avail-label', 'avail-date'],
      points: [
        'Available now, in Early Access.',
        'Make the ask: offer to get them access.',
      ],
      ask: 'Would it be useful to get your team into the Early Access programme?',
    },
  ],

};
