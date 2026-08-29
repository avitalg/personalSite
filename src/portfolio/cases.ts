export type PortfolioTableColumn = {
  header: string;
  align?: 'left' | 'right';
};

export type PortfolioTable = {
  caption?: string;
  columns: PortfolioTableColumn[];
  rows: string[][];
};

export type PortfolioFigure = {
  src: string;
  alt: string;
  caption?: string;
};

export type PortfolioSection = {
  heading: string;
  subheading?: string;
  paragraphs?: string[];
  /** Heading rendered after lists, before closing paragraphs. */
  closingSubheading?: string;
  /** Rendered after lists (e.g. a closing summary). */
  closingParagraphs?: string[];
  bullets?: string[];
  /** Use a numbered list for bullets */
  ordered?: boolean;
  tables?: PortfolioTable[];
  /** Optional fenced code block (e.g. SQL) */
  code?: string;
  image?: PortfolioFigure;
  images?: PortfolioFigure[];
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
  seoDescription: string;
  links?: PortfolioLink[];
  /** Show on homepage portfolio grid (default true) */
  featured?: boolean;
  /** Keep the page off search indexes (direct-link only) */
  noindex?: boolean;
  tableau?: TableauEmbedConfig;
  /** Company/product logo shown at the top right of the case header */
  logo?: {
    src: string;
    alt: string;
  };
  /** Social preview image path or absolute URL */
  ogImage?: string;
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
  {
    slug: 'mize-rebooking-analysis',
    title: 'Mize Hotel Rebooking — SQL & Python Analytics',
    logo: {
      src: '/portfolio/mize/logo.png',
      alt: 'Mize',
    },
    summary:
      'Take-home analysis of hotel reservation and rebooking data: DuckDB/JupySQL KPI extraction by city, pandas client review, and root-cause investigation of declining rebooking volume.',
    featured: false,
    noindex: true,
    tech: ['DuckDB', 'JupySQL', 'SQL', 'Python', 'Pandas', 'Excel', 'Data investigation', 'Business analytics'],
    disclaimer:
      'This content was created solely as a home assignment for Mize. It is not indexed by search engines and is only accessible to those with the direct link.',
    links: [
      {
        note: 'Analysis notebook',
        label: 'Google Colab — DuckDB, JupySQL & pandas',
        href: 'https://colab.research.google.com/drive/1kPhLk6X_ourmvsIVPZyb9y4Nec-IMBuF?usp=sharing',
      },
    ],
    seoDescription:
      'Case study: Mize-style hotel rebooking analytics — DuckDB and JupySQL city KPIs, pandas client review, and investigation of reservation inflow collapse.',
    sections: [
      {
        heading: '1. Context & Objective',
        paragraphs: [
          'Mize is a rebooking system that identifies lower-priced reservations matching a client’s original booking conditions, books the cheaper alternative, and cancels the higher-priced reservation. This is the company’s primary revenue model.',
          'The assignment used two file sheets: a list of reservations received from the client and a list of rebookings made by the system between 1 Aug 2025 and 16 Oct 2025.',
          'The four parts of the assignment: (A) extract city KPIs with SQL in DuckDB via JupySQL, (B) run a quarterly client review in Python with pandas, (C) explain why rebooking amounts declined toward year-end using pandas, and (D) interpret a visualization of reservations that could not be replaced.',
        ],
      },
      {
        heading: '2. Part A — SQL KPIs by City',
        paragraphs: [
          'Part A was run in DuckDB through JupySQL in a Colab notebook. It required the fewest queries possible to return, for Paris, Dubai, New York, and Bangkok: number of active reservations, sum of original cost (USD), number of successful rebookings, and sum of extra savings.',
          'Active reservation definition: processed with no issues, cancellation date is not null, and cancellation occurs after the created date (future cancellation policy).',
        ],
        code: `WITH cities(city) AS (
    VALUES ('Paris'), ('Dubai'), ('New York'), ('Bangkok')
),
active_reservations AS (
    SELECT
        city,
        COUNT(*) AS active_reservations
    FROM reservations
    WHERE processed = 1
      AND "Has Issue" = 'No'
      AND firstcxl IS NOT NULL
      AND CAST(firstcxl AS DATE) > CAST(created AS DATE)
      AND city IN ('Paris', 'Dubai', 'New York', 'Bangkok')
    GROUP BY city
),
original_cost AS (
    SELECT
        city,
        SUM(costusd) AS original_cost_usd
    FROM reservations
    WHERE city IN ('Paris', 'Dubai', 'New York', 'Bangkok')
    GROUP BY city
),
successful_rebookings AS (
    SELECT
        r.city,
        COUNT(*) AS successful_rebookings,
        SUM(b.savings) AS extra_savings
    FROM rebookings AS b
    JOIN reservations AS r
        ON r.res_id = b.reservation_id
    WHERE b."Rebooking State" = 1
      AND r.city IN ('Paris', 'Dubai', 'New York', 'Bangkok')
    GROUP BY r.city
)
SELECT
    c.city,
    COALESCE(a.active_reservations, 0)   AS active_reservations,
    COALESCE(o.original_cost_usd, 0)     AS original_cost_usd,
    COALESCE(s.successful_rebookings, 0) AS successful_rebookings,
    COALESCE(s.extra_savings, 0)         AS extra_savings
FROM cities AS c
LEFT JOIN active_reservations AS a USING (city)
LEFT JOIN original_cost AS o USING (city)
LEFT JOIN successful_rebookings AS s USING (city);`,
        tables: [
          {
            caption: 'City KPIs',
            columns: [
              { header: 'City' },
              { header: 'Active reservations', align: 'right' },
              { header: 'Original cost (USD)', align: 'right' },
              { header: 'Successful rebookings', align: 'right' },
              { header: 'Extra savings', align: 'right' },
            ],
            rows: [
              ['Paris', '41', '$66,187', '0', '$0'],
              ['Dubai', '437', '$393,394', '0', '$0'],
              ['New York', '110', '$169,277', '1', '$44'],
              ['Bangkok', '272', '$173,855', '6', '$115'],
            ],
          },
        ],
      },
      {
        heading: '3. Part B — Client Performance Review',
        paragraphs: [
          'Part B used Python with pandas on the provided Excel file to answer the quarterly review questions.',
        ],
        tables: [
          {
            caption: 'Quarterly snapshot',
            columns: [
              { header: 'Metric' },
              { header: 'Value', align: 'right' },
            ],
            rows: [
              ['Active reservations', '9,817'],
              ['Most travelled season', 'Summer (5,958 trips)'],
              ['Most travelled month', 'August (5,849 trips)'],
            ],
          },
          {
            caption: 'Top 10 suppliers by income',
            columns: [
              { header: 'Rank', align: 'right' },
              { header: 'Supplier' },
              { header: 'Reservations', align: 'right' },
              { header: 'Income (USD)', align: 'right' },
            ],
            rows: [
              ['1', 'supplier a', '5,043', '$3,496,277'],
              ['2', 'supplier c', '2,934', '$1,537,020'],
              ['3', 'supplier l1', '392', '$252,049'],
              ['4', 'supplier j', '412', '$220,499'],
              ['5', 'supplier f2', '288', '$208,822'],
              ['6', 'supplier b', '237', '$191,010'],
              ['7', 'supplier f1', '228', '$156,572'],
              ['8', 'supplier d', '222', '$136,463'],
              ['9', 'supplier g1', '213', '$133,513'],
              ['10', 'supplier m1', '171', '$125,244'],
            ],
          },
        ],
      },
      {
        heading: '4. Part C — Why Rebookings Declined',
        paragraphs: [
          'Customer Success reported a decrease in rebooking amounts by year-end. Part C used pandas to investigate whether this was a product hit-rate problem or an upstream volume issue.',
        ],
        images: [
          {
            src: '/portfolio/mize/part-c-incoming.png',
            alt: 'Line chart of incoming reservations by week: new and active reservations collapse the week of 15 September 2025 and stay near zero through mid-October',
            caption:
              'Incoming reservations by week — new and active volume collapse the week of 15 Sep 2025 and do not recover.',
          },
          {
            src: '/portfolio/mize/part-c-rebookings.png',
            alt: 'Line chart of rebookings by week: all rebookings and successful rebookings fluctuate through September then decline into October',
            caption:
              'Rebookings by week — volume stays volatile through mid-September, then declines as the reservation pool is not replenished.',
          },
        ],
        tables: [
          {
            caption: 'Monthly reservation inflow',
            columns: [
              { header: 'Period' },
              { header: 'New reservations', align: 'right' },
              { header: 'Rebookings', align: 'right' },
            ],
            rows: [
              ['August 2025', '10,241', '138'],
              ['September 2025', '2,188', '109'],
              ['October 2025 (1–16 only)', '168', '23'],
            ],
          },
          {
            caption: 'Weekly reservations and rebookings',
            columns: [
              { header: 'Week start' },
              { header: 'Reservations', align: 'right' },
              { header: 'Rebookings', align: 'right' },
            ],
            rows: [
              ['28 Jul 2025', '1,210', '17'],
              ['4 Aug 2025', '2,402', '27'],
              ['11 Aug 2025', '2,289', '26'],
              ['18 Aug 2025', '2,326', '35'],
              ['25 Aug 2025', '2,014', '33'],
              ['1 Sep 2025', '1,131', '36'],
              ['8 Sep 2025', '901', '19'],
              ['15 Sep 2025', '63', '37'],
              ['22 Sep 2025', '76', '12'],
              ['29 Sep 2025', '52', '13'],
              ['6 Oct 2025', '73', '10'],
              ['13 Oct 2025', '60', '5'],
            ],
          },
        ],
        subheading: 'Conclusions',
        bullets: [
          'Inflow cliff after 15 Sep 2025: weekly new reservations fell from 901 to 63 and stayed around ~60; rebookings lagged as the existing pool was worked through without replenishment.',
          'The next check is **why incoming orders dropped**. The collapse starts the week of 15 Sep 2025 and stays low for a month. A one-week step-change that does not recover is not a seasonal fade. It looks like a bug or feed/pipeline break from that date.',
          'October is a partial month (data ends 16 Oct) - direct month-on-month comparison overstates decline, but the weekly run-rate was still much quieter than August.',
          'Travel demand in this file concentrates in Aug–Sep 2026 stays; later check-in months can leave fewer reservations to rebook, but that mix does not explain an overnight 901→63 cliff.',
        ],
        closingParagraphs: [
          '**Core Issue:** The drop in rebooking volume is a direct consequence of a failure in either the generation or the reporting of new reservations. As the inflow of new reservations drops, it directly restricts the volume of rebookings the system can execute.',
          '**Required Action:** An immediate investigation is needed to identify the root cause. We must determine if the breakdown is occurring at the business level (actual orders), in the data collection process, or within the data pipeline.',
          '**Recommendation:** Add an alert on incoming reservation volume so a cliff like 15 Sep (901→63, then a month near ~60) is flagged immediately, rather than discovered later as a drop in rebooking amounts.',
        ],
      },
      {
        heading: '5. Part D — Match-Failure Visualization',
        subheading: 'Insights',
        image: {
          src: '/portfolio/mize/part-d-unmatched.png',
          alt: 'Stacked bar chart of unmatched reservations over time from late August to late December, in brown and grey failure categories',
          caption: 'Unmatched reservations over time (Aug–Dec), stacked by match-failure category.',
        },
        ordered: true,
        bullets: [
          '**Unmatched volume is structurally huge and stable (~750k–800k per bar).** Almost all inventory is not being rebooked. Rebooking is a thin slice, unmatched is the default outcome.',
          '**Four independent blockers stack every day.** A reservation fails if *any* of: no cheaper rate, no hotel match, no room match, no matching cancellation policy. Light grey (CXL mismatch) and brown (no savings) are persistent slices — content matching and price competitiveness are both ongoing constraints, not one-off spikes.',
          '**Sharp hole around 25 Oct.** Several bars drop near zero, then recover to the previous ~775k level. That pattern is a *data/pipeline/system gap*, not a real day where unmatched demand vanished and then returned overnight.',
          '**After the dip, the stack returns to its immediate pre-drop state.** The recovery mirrors the exact height and mix seen just before October 25th. The data gap was a pipeline interruption, not a shift in engine behavior or market supply, as the system picked up exactly where it left off.',
          '**Rising impact of cancellation policies over time.** Looking at the macro trend from August to December, the light grey slice (CXL mismatch) steadily widens, starting around early October. As we move toward year-end, strict cancellation policies become a progressively larger blocker for successful rebookings, replacing "no savings" (dark brown) as a primary constraint.',
        ],
        closingSubheading: 'Conclusions & Recommendations',
        closingParagraphs: [
          'The system’s matching logic is stable; the late-October drop was strictly a data pipeline failure, not an algorithm issue. Notably, while the "no savings" barrier is noticeably shrinking toward year-end, it is being directly overtaken by cancellation policy mismatches as the primary rebooking blocker. To improve actual rebooking performance, efforts should focus on investigating this winter shift in cancellation policies (determining if it is driven by stricter supplier terms or user booking behavior).',
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

export function listFeaturedPortfolioCases(): PortfolioCase[] {
  return portfolioCases.filter((c) => c.featured !== false);
}
