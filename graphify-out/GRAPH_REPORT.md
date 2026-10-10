# Graph Report - Stolochi_MakeupAndHair  (2026-10-10)

## Corpus Check
- Corpus is ~9,094 words - fits in a single context window. You may not need a graph.

## Summary
- 165 nodes · 279 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- About & Services Pages
- Contact Form & CSV
- Package Manifest
- TS Config
- Root Layout & SEO
- Contact Email API Route
- Home & Gallery Pages
- Dev Dependencies
- NPM Scripts
- Contact Test Script
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `Button()` - 18 edges
2. `compilerOptions` - 17 edges
3. `next` - 15 edges
4. `HomePage()` - 9 edges
5. `SectionHeading()` - 9 edges
6. `scripts` - 8 edges
7. `ServicesGrid()` - 8 edges
8. `TestimonialsCarousel()` - 8 edges
9. `getServices()` - 8 edges
10. `ContactForm()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `HomePage()` --calls--> `ServicesGrid()`  [EXTRACTED]
  stolochi-site/src/app/page.tsx → stolochi-site/src/components/sections/ServicesGrid.tsx
- `HomePage()` --calls--> `TestimonialsCarousel()`  [EXTRACTED]
  stolochi-site/src/app/page.tsx → stolochi-site/src/components/sections/TestimonialsCarousel.tsx
- `HomePage()` --calls--> `Button()`  [EXTRACTED]
  stolochi-site/src/app/page.tsx → stolochi-site/src/components/ui/Button.tsx
- `HomePage()` --calls--> `getServices()`  [EXTRACTED]
  stolochi-site/src/app/page.tsx → stolochi-site/src/lib/sheets.ts
- `HomePage()` --calls--> `getTestimonials()`  [EXTRACTED]
  stolochi-site/src/app/page.tsx → stolochi-site/src/lib/sheets.ts

## Import Cycles
- None detected.

## Communities (11 total, 2 thin omitted)

### Community 0 - "About & Services Pages"
Cohesion: 0.14
Nodes (22): AboutPage(), metadata, values, dynamic, metadata, ServicesPage(), dynamic, metadata (+14 more)

### Community 1 - "Contact Form & CSV"
Cohesion: 0.13
Nodes (14): RFC-4180, ContactPage(), dynamic, metadata, ContactForm(), ContactFormProps, ServicesGridProps, parseCsv() (+6 more)

### Community 2 - "Package Manifest"
Cohesion: 0.09
Nodes (19): @opennextjs/cloudflare, react-dom, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 3 - "TS Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 4 - "Root Layout & SEO"
Cohesion: 0.14
Nodes (11): next, lato, metadata, playfair, RootLayout(), dynamic, dynamic, Footer() (+3 more)

### Community 5 - "Contact Email API Route"
Cohesion: 0.18
Nodes (9): resend, dynamic, MAX, parse(), POST(), esc(), HTML_ESCAPES, sendContactEmail() (+1 more)

### Community 6 - "Home & Gallery Pages"
Cohesion: 0.23
Nodes (11): react, dynamic, GalleryPage(), metadata, dynamic, HomePage(), GalleryGrid(), GalleryGridProps (+3 more)

### Community 7 - "Dev Dependencies"
Cohesion: 0.25
Nodes (8): devDependencies, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, typescript, wrangler

### Community 8 - "NPM Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, cf-typegen, deploy, dev, preview, start, test

## Knowledge Gaps
- **9 isolated node(s):** `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom` (+4 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 92 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Root Layout & SEO` to `About & Services Pages`, `Contact Form & CSV`, `Package Manifest`, `Home & Gallery Pages`?**
  _High betweenness centrality (0.329) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/postcss`, `@types/node` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `About & Services Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.14039408866995073 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `NPM Scripts` to `Package Manifest`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Should `Contact Form & CSV` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Manifest`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Should `Package Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._