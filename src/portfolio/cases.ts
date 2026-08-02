export type PortfolioSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

export type TableauEmbedConfig = {
  /** Tableau Public viz name, e.g. adTechAnalysis/Dashboard1 */
  name: string;
  staticImageUrl: string;
  alt: string;
};

export type PortfolioLink = {
  label: string;
  href: string;
  /** Short role label shown before the link, e.g. "Inspired by" */
  note?: string;
};

export type PortfolioCase = {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  disclaimer: string;
  sections: PortfolioSection[];
  tableau: TableauEmbedConfig;
  seoDescription: string;
  links?: PortfolioLink[];
  /** Insert the Tableau dashboard after this section heading */
  dashboardAfterHeading?: string;
};

export const portfolioCases: PortfolioCase[] = [
  {
    slug: 'outbrain-ad-analytics',
    title: 'Outbrain Content Recommendation & Ad Analytics Dashboard',
    summary:
      'End-to-end ETL and interactive Tableau dashboard simulating a large-scale content recommendation engine: user navigation, ad contexts, and click-through performance over 6 months.',
    tech: ['Tableau', 'Python', 'Pandas', 'NumPy', 'ETL', 'SQL-style modeling', 'Cursor'],
    disclaimer:
      'This project is an independent portfolio piece created to showcase data analysis, dashboard design, and ETL capabilities using Tableau. The dataset is fully synthetic, generated programmatically to simulate the Outbrain Click Prediction Kaggle competition schema, and is independent of any proprietary Outbrain data, systems, or internal metrics.',
    links: [
      {
        note: 'Inspired by',
        label: 'Outbrain Click Prediction (Kaggle)',
        href: 'https://www.kaggle.com/competitions/outbrain-click-prediction/',
      },
      {
        note: 'Dataset generator',
        label: 'github.com/avitalglazer/outbrain',
        href: 'https://github.com/avitalglazer/outbrain',
      },
    ],
    seoDescription:
      'Portfolio case study: synthetic Outbrain-style content recommendation and ad analytics dashboard with Python ETL and Tableau.',
    dashboardAfterHeading: '3. Analysis Plan & Research Questions',
    tableau: {
      name: 'adTechAnalysis/Dashboard1',
      staticImageUrl:
        'https://public.tableau.com/static/images/ad/adTechAnalysis/Dashboard1/1.png',
      alt: 'Marketing analysis dashboard',
    },
    sections: [
      {
        heading: '1. Executive Summary & Objective',
        paragraphs: [
          'This project delivers an end-to-end analytical data pipeline and interactive Tableau dashboard simulating a large-scale content recommendation engine, inspired by the Outbrain Kaggle competition. The objective was to process, model, and visualize 6 months of user navigation telemetry, ad display contexts, and click-through performance to uncover granular daily engagement trends, platform distribution dynamics, and organic traffic seasonality.',
        ],
      },
      {
        heading: '2. Data Architecture & Relational Schema',
        paragraphs: [
          'The fully integrated relational data model comprises four primary datasets matching the exact Outbrain schema:',
        ],
        image: {
          src: '/portfolio/outbrain-erd.png',
          alt: 'Entity-relationship diagram for the Outbrain Kaggle competition dataset: documents_meta, page_views, events, and clicks',
          caption: 'Outbrain Kaggle competition dataset ERD — documents, page views, events, and clicks',
        },
        bullets: [
          'page_views.csv (10,000 rows, 500 unique users): Tracks comprehensive user navigation telemetry across a 6-month window (September 2025 – March 2026), capturing uuid, document_id, timestamps, device platforms, geo-locations, and traffic sources.',
          'events.csv (5,200 rows): Captures recommendation widget display contexts (display_id) mapped to specific user sessions, article views, and exact timestamps.',
          'clicks.csv (15,590 rows): The training set containing candidate ad recommendations (ad_id) per display slot and their binary click outcomes (clicked: 0 or 1).',
          'documents_meta.csv (50 rows): Content catalog detailing article metadata, source publishers (e.g., CNN, BBC, Reuters, TechCrunch, Figaro), and chronologically aligned publication timestamps.',
        ],
      },
      {
        heading: '3. Analysis Plan & Research Questions',
        paragraphs: [
          'These are the product and performance questions the dashboard and SQL-style queries were designed to answer:',
        ],
        bullets: [
          'Which platforms drive the most page views and recommendation events over time—desktop, mobile, or tablet?',
          'How do page views compare across traffic sources (Search, Internal, Social), and which channel leads engagement?',
          'What does daily seasonality look like for page views and recommendation events, and are there calendar-driven spikes?',
          'What is the overall and monthly click-through rate (CTR) for recommendation displays?',
          'Which ads and publisher sources lead in clicks?',
        ],
      },
      {
        heading: '4. Key Insights & Dashboard Highlights',
        bullets: [
          'Mobile Dominance & Platform Discrepancy: Platform telemetry clearly proves mobile dominance (platform = 2), consistently out-pacing desktop traffic across the timeline. Interestingly, tablet usage (platform = 3) remains exceptionally low compared to mobile and desktop; this structural gap may point to a tracking anomaly or device-identification misclassification in user agent strings rather than organic user behavior.',
          'Traffic Source Distribution: Comparative analysis across traffic channels reveals that search-driven traffic (Search) consistently drives a higher volume of engagement and page views compared to internal referrals (Internal) and social media (Social).',
          'Seasonality & Temporal Spikes: Shifting the time-series granularity to a daily view successfully captured organic monthly fluctuations alongside sharp behavioral spikes tied to calendar events—most notably a significant surge in mobile recommendation events on February 14, 2026 (Valentine\'s Day).',
          'Data Completeness & Endpoint Drop: The time-series trend concludes with a sharp downward trajectory toward the end of March 2026. This contraction is likely an artifact of incomplete logging or data truncation at the end of the collection window rather than a genuine drop in user demand.',
          'Industry-Standard Ad Performance (CTR): Evaluated recommendation efficacy against display slots to establish a robust, industry-standard overall Click-Through Rate (CTR) of 1.27% (with monthly comparative benchmarks), aligning perfectly with authentic publisher and AdTech standards.',
        ],
      },
      {
        heading: '5. Technical Implementation & Data Engineering',
        bullets: [
          'Synthetic data generation: Built a reproducible Python generator with Cursor that writes the four related CSVs with referential integrity, publish-time constraints, weekday/weekend seasonality, and calendar-driven spikes. The script is open on [GitHub](https://github.com/avitalglazer/outbrain).',
          'ETL & Data Hygiene: Addressed and resolved chronological consistency challenges using Python (Pandas/NumPy) to ensure publication timestamps strictly precede user interaction logs.',
          'Tableau Modeling: Built multi-table relational joins (1:N and N:1) across core keys (document_id, display_id), leveraging calculated fields, daily date truncations, and native Top-N filters to deliver an executive-ready, high-performance interactive dashboard.',
        ],
      },
    ],
  },
];

export function getPortfolioCase(slug: string | undefined): PortfolioCase | undefined {
  if (!slug) return undefined;
  return portfolioCases.find((c) => c.slug === slug);
}

export function listPortfolioCases(): PortfolioCase[] {
  return portfolioCases;
}
