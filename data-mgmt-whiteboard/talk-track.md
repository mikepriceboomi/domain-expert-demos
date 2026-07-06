# Data Management Whiteboard — Talk Track
**Companion script to storyboard.md · Narration only · ~5 min**

---

## Intro — Lobby

Hey — thanks for making time. What I want to walk you through today is something I think changes the way you look at AI readiness.

There's a lot of conversation right now about which AI model to use, which agent framework to build on, which tools to evaluate. And those are real questions. But they're not the question that's stalling most AI initiatives.

The thing that's actually blocking progress — in most of the organizations I talk to — isn't the model. It's the data. Specifically, the fact that the data is fragmented, ungoverned, and not connected to anything the AI can actually use.

What I'm going to show you is the architecture that solves that. Six chapters. We'll go from raw, fragmented sources — through ingestion, transformation, context, and master data — all the way to a working AI agent answering real operational questions.

Let's start with the problem itself.

---

## Chapter 1 — Sources

Every enterprise runs on fragmented data. Thousands of sources. Each one with its own credentials, its own endpoints, its own quirks. Before you can even begin to analyze data, let alone move it or run AI on top of it — you have to be able to get to it.

There are four main data source categories that matter here.

First, APIs. Systems like Salesforce, NetSuite, Jira, and marketing platforms. Each one behaves differently, and a typical enterprise runs dozens of them.

Next, Databases. SQL Server, Oracle, My-SQL, Postgre-SQL. These are the operational core — often running on-prem, often the most sensitive, and often the hardest to replicate without disrupting the business.

Then there is SAP. Which we have here as a category all on its own, and for good reason. You'll see why shortly.

And finally, Files. CSV, SFTP, FTP, and managed file transfer at scale. Structured. Unstructured. Truly the wild west of our data landscape.

So that's the starting point: many fragmented sources, and a growing pressure to do something intelligent with what's inside them.

---

## Chapter 2 — Boomi Data Integration

Our next stop is a look at Boomi Data Integration — or BDI — and how it builds a bridge from our many fragmented sources to everything we have waiting downstream.

Let's think about BDI in two halves.

The left side is ingestion: reading data from your sources and getting it into your environment. There are five connector types on the ingestion side, each designed for a different class of source. We're going to get into each of these in more detail.

The right side is transformation and orchestration: which is how we shape this incoming data and coordinate what happens to it once it's here.

We'll walk through all five ingestion types next.

---

## Chapter 3 — Connector Types

Ok, let's take a look at our five different connector types for data ingestion in BDI.

First up is native connectors. Around two hundred of them, covering the most common API-based sources. When a vendor changes an endpoint, updates pagination, rotates credentials — Boomi maintains the connector. The data flow keeps running without human intervention.

Next is CDC — Change Data Capture. This is the most efficient way to get data out of operational databases. Instead of querying the database directly, CDC reads from the transaction logs. No load on the production system. No impact on the web and mobile applications running on top of it. For customers whose databases are load-bearing in production, this is the only acceptable approach.

Now let's talk about the SAP Data Connector. Built natively into BDI and paired with Boomi for SAP — this connector runs on-prem inside the SAP environment. Boomi for SAP is a certified SAP-validated product, which means it's been tested and approved to run natively inside the SAP ecosystem. Every table, every dataset, every trigger in SAP can be streamed through Boomi's event layer into BDI. It's effectively CDC for SAP. Boomi is one of just a few vendors who can offer this, and it's why we put SAP in its own category.

Our next connector type is the Data Connector Agent — or DCA. Not every source has its own native connector, and while the list is growing, building one for every system in the world just isn't scalable. Boomi's DCA solves this with AI. Point it at any third-party system — say, a niche manufacturing ERP — and it reads the vendor documentation, identifies the endpoints, credentials, and pagination patterns, and generates a working connector on the fly, unlocking thousands of systems that would otherwise require custom development.

Finally we have Boomi MFT — Managed File Transfer. Native connectors for FTP and SFTP, plus governed, secured file transfer at scale. MFT currently runs as a standalone console, with native BDI integration on the roadmap.

---

## Chapter 4 — Knowledge Hub

As we've seen, Boomi's Data Integration capabilities pack quite a punch, allowing enterprises to ingest and transform data from a wide variety of sources. But to run AI agents, you need more than structured data. You need context.

For most enterprises, the most valuable of that context lives in unstructured sources — documents, PDFs, images, location feeds. Traditional data warehouses weren't built for this. Boomi's Knowledge Hub was.

Knowledge Hub is a native extension of the data integration layer, not a separate product bolted on. Any source you can connect to in BDI, you can feed directly into the Knowledge Hub — where it's vectorized and made available for semantic retrieval.

The result is a context layer your agents can trust — continuously updated, governed at the source, and accessible without custom pipelines.

---

## Chapter 5 — Data Hub

DataHub is Boomi's golden record layer. Data stewardship, deduplication, and synchronised records — all in one place.

There's a very important conversation worth having here, and frankly we don't have it enough. Every time a modern business decides to implement integrations across three or more systems, DataHub belongs in the design. Point-to-point integrations between six or seven systems become an architectural tangle — hard to govern, expensive to change, impossible to scale.

With DataHub in the middle, the architecture stays clean. Instead of an exponentially growing spaghetti mess, every system now connects to one hub. Wiring in a new system provides additive value, not exponential effort.

Boomi's native integration between BDI and DataHub makes this significantly more powerful. Golden record datasets flow directly into any data or AI service downstream. And onboarding new sources is fast — point any BDI source at Data Hub in a few clicks, less configuration, faster time to value. Whether teams are using Boomi Integration or Boomi Data Integration to move data — depending on their use case — all of their master data ends up synchronised in one place.

Together, these capabilities turn Data Hub from a master data store into an active participant in the AI data architecture.

---

## Chapter 6 — Use Case

Here's what this looks like end-to-end.

Imagine a modern global retailer. Complex operations, multiple HR systems from years of acquisitions, logistics spanning dozens of distribution locations. Like most of their competitors, they want to build an AI agent to optimize their distribution network — routes, schedules, driver assignments. But their data is a mess. Their integrations are old and resistant to change. Their internal resources are maxed out, and their leaders won't stop asking how AI is going to transform their business.

Let's look at how they can get to work with Boomi.

First, BDI ingests data from every relevant source. From there, the data splits by type.

Unstructured data — PDFs, location feeds, photos — flows into the Knowledge Hub, where it's vectorized and made available for semantic retrieval.

Structured records — employee data, driver and delivery data — all flow into Data Hub, where they're deduplicated and merged into clean golden records.

The organization uses Agent Studio to build an agent that knows who every driver is, across every system that's ever touched that record, all with existing governance and security checks in place. Knowledge Hub, Data Hub, and the entire Boomi platform combine to ground the agent's activity in context and grounded truth.

The result is an agent that can answer real operational questions — not from stale exports or disconnected reports, but from a live, governed, unified data foundation built on every source the business runs on.

That's the data activation story: get the data, improve the data, activate it for AI.

Simple, right?
