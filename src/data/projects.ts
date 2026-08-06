/**
 * Projects drive three surfaces: the featured grid on the home page, the full
 * grid at /projects, and the case-study page at /projects/[slug].
 *
 * Adding a project = appending one object here. No component edits needed.
 * Set `featured: true` to surface it on the home page (top 4 are shown).
 */

export type ProjectLink = {
  label: string;
  href: string;
};

export type CaseStudy = {
  /** Long-form intro on the case-study page. 2–3 sentences. */
  overview: string;
  /** What was broken / missing before the project existed. */
  problem: string[];
  /** How it was built — the interesting engineering decisions. */
  approach: { title: string; detail: string }[];
  /** Bullet list rendered as an architecture breakdown. */
  architecture: string[];
  /** Hard problems and how they were handled. */
  challenges: { title: string; detail: string }[];
  /** Outcomes. Prefer numbers where you have them. */
  results: { metric: string; label: string }[];
  /** Honest reflection — reads well to senior engineers. */
  learnings: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One line, shown under the title on cards. */
  tagline: string;
  /** Card-length description, 2–3 sentences max. */
  summary: string;
  /** Single sentence: the business or user outcome. */
  outcome: string;
  role: string;
  period: string;
  status: "Live" | "In development" | "Maintained" | "Shipped";
  stack: string[];
  featured: boolean;
  openSource: boolean;
  links: {
    github?: string;
    demo?: string;
    /** Rendered as a disabled note when there's no public link. */
    note?: string;
  };
  stars?: number;
  forks?: number;
  /**
   * Optional real screenshot in /public/projects/. When omitted the card renders
   * a generated <ProjectMockup /> so the grid never shows a broken image.
   * Recommended: 1200×750 (16:10), WebP or AVIF.
   */
  image?: string;
  /**
   * How `image` fills the 16:10 frame. "cover" (default) crops to fill and suits
   * desktop screenshots. Use "contain" for portrait/mobile captures — it letterboxes
   * onto a flat panel instead of cropping the screen down to a strip.
   */
  imageFit?: "cover" | "contain";
  /** Solid accent for the generated mockup and OG card. One flat colour, no gradient. */
  accent: string;
  /** Short code sample shown in the generated mockup. Keep under ~9 lines. */
  snippet: { lang: string; code: string };
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "predifi",
    title: "PrediFi",
    tagline: "Decentralized outcome prediction protocol on Stellar (Soroban)",
    summary:
      "An open-source, on-chain prediction market protocol where users create and join trustless prediction pools. Market logic, staking, resolution and payouts all run on-chain across modular Soroban contracts, with automated price-based resolution via oracle integrations like Pyth.",
    outcome:
      "Gives users a fully trustless way to create and settle prediction markets on-chain — no centralized intermediary ever holds or resolves funds.",
    role: "Maintainer & core protocol engineer",
    period: "2024 — Present",
    status: "Maintained",
    stack: ["Rust", "Soroban", "Stellar", "Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    openSource: true,
    links: {
      github: "https://github.com/Web3Novalabs/predifi",
      note: "Live deployment pending",
    },
    stars: 23,
    forks: 206,
    accent: "#f59e0b", // amber
    snippet: {
      lang: "rust",
      code: `pub fn resolve_pool(env: Env, pool_id: u32) -> Result<Outcome, Error> {
    let pool = Pool::load(&env, pool_id)?;
    pool.require_state(PoolState::Locked)?;

    let price = OracleClient::new(&env, &pool.oracle)
        .price(&pool.feed_id)
        .ok_or(Error::OracleUnavailable)?;

    let outcome = pool.settle_against(price)?;
    pool.emit_resolved(&env, outcome);
    Ok(outcome)
}`,
    },
    caseStudy: {
      overview:
        "PrediFi is a prediction market protocol built entirely on Soroban, Stellar's smart contract platform. Anyone can spin up a pool around a future outcome, stake against it, and have the result settled automatically from an on-chain price feed. I maintain the project — reviewing community contributions, driving core protocol work, and owning the security posture of the contracts.",
      problem: [
        "Prediction markets are one of the clearest use cases for smart contracts, yet most live products still depend on a centralized operator who custodies stakes and decides outcomes.",
        "That operator is a single point of failure: they can freeze withdrawals, resolve a market incorrectly, or simply disappear with the pot.",
        "Stellar's Soroban ecosystem had no mature, auditable prediction market primitive that other apps could build on.",
      ],
      approach: [
        {
          title: "Modular contract boundaries",
          detail:
            "Rather than one monolithic contract, the protocol splits into focused modules — pool lifecycle, staking accounting, access control, and resolution. Each is independently testable and upgradeable, which keeps the audit surface of any single change small.",
        },
        {
          title: "Oracle-driven automatic resolution",
          detail:
            "Price-based markets settle from an on-chain oracle (Pyth) rather than a human calling a winner. The resolution path is deterministic: given a pool and a feed reading at lock time, exactly one outcome is reachable.",
        },
        {
          title: "Role-based access control",
          detail:
            "Admin capabilities are enumerated as explicit roles instead of a single owner key, so pool creation, emergency pause and oracle configuration can be separated and delegated without handing over the whole protocol.",
        },
        {
          title: "Open-source contribution pipeline",
          detail:
            "Issues are scoped so external contributors can land meaningful work. I review PRs, enforce test coverage on protocol paths, and keep the contribution surface documented.",
        },
      ],
      architecture: [
        "Soroban smart contracts written in Rust, organised as a workspace of focused crates.",
        "Pool lifecycle state machine: Created → Open → Locked → Resolved → Settled, with transitions gated by explicit guards.",
        "Staking ledger held in contract storage, keyed by pool and participant, with checked arithmetic on every balance mutation.",
        "Oracle adapter layer so price feeds (Pyth and others) can be swapped without touching settlement logic.",
        "RBAC module gating admin operations — pause, oracle config, fee parameters.",
        "Next.js + TypeScript frontend talking to contracts through the Stellar SDK, styled with Tailwind CSS.",
      ],
      challenges: [
        {
          title: "Arithmetic safety in payout math",
          detail:
            "Proportional payouts mean multiplication before division on user-controlled balances — the exact shape where overflow and precision loss bite. Every payout path uses checked arithmetic and orders operations to preserve precision, with tests pinning the edge cases at both ends of the range.",
        },
        {
          title: "Reentrancy across token transfers",
          detail:
            "Payouts move tokens out of the contract, so state has to be final before any external call. Balances are zeroed and the pool marked settled before transfers execute, so a re-entrant call finds nothing left to claim.",
        },
        {
          title: "Reviewing contributions without lowering the bar",
          detail:
            "A high fork count means a steady stream of PRs of very mixed quality. Protocol-critical paths require tests to merge, and I keep review feedback specific enough that contributors improve rather than bounce.",
        },
      ],
      results: [
        { metric: "23", label: "GitHub stars" },
        { metric: "206", label: "Forks" },
        { metric: "100%", label: "On-chain settlement — no custodial step" },
        { metric: "0", label: "Trusted intermediaries in the resolution path" },
      ],
      learnings: [
        "Designing for external contributors from day one changes how you structure a codebase — clear module seams are as much a collaboration feature as an engineering one.",
        "Oracle integration is mostly a failure-mode exercise: the happy path is short, and everything interesting is what happens when the feed is stale, absent, or wrong.",
        "Writing contracts in Rust means the type system catches a whole class of state-machine mistakes before a test ever runs, if you model states as types rather than as flags.",
      ],
    },
  },
  {
    slug: "paymesh",
    title: "PayMesh",
    tagline: "Automated on-chain group payments and fundraising on Starknet",
    summary:
      "Groups set payout rules once via a smart contract and every payment to the group address splits and distributes automatically. Each group gets its own child contract on Starknet, so splits are enforced by code and fully transparent on-chain. I co-founded the project and built the Rust/Axum backend.",
    outcome:
      "Turns multi-step, error-prone manual crypto payouts into a one-time setup with instant, trustless distribution.",
    role: "Co-founder & backend lead",
    period: "2024 — Present",
    status: "Live",
    stack: ["Cairo", "Starknet", "Rust", "Axum", "Next.js", "TypeScript"],
    featured: true,
    openSource: false,
    links: {
      github: "https://github.com/Web3Novalabs/PayMesh",
      demo: "https://paymesh.app",
      note: "Source is public but closed to outside contributions",
    },
    stars: 1,
    forks: 1,
    image: "/projects/paymesh.png",
    accent: "#38bdf8", // cyan
    snippet: {
      lang: "rust",
      code: `async fn distribute(
    State(app): State<AppState>,
    Path(group_id): Path<Uuid>,
) -> Result<Json<Distribution>, ApiError> {
    let group = app.groups.find(group_id).await?;
    let plan = group.split_plan()?;          // percentages must sum to 100
    let receipt = app.starknet.execute(plan).await?;
    Ok(Json(receipt.into()))
}`,
    },
    caseStudy: {
      overview:
        "PayMesh removes the manual work from group crypto payouts. Instead of collecting wallet addresses, calculating percentages and firing off individual transfers every cycle, a group configures its split once and a dedicated on-chain contract handles every payment from then on. I co-founded the project and own the backend — a Rust service built on Axum that coordinates group state, split plans and Starknet execution.",
      problem: [
        "Paying out to a group in crypto is a manual, repetitive process: gather addresses, compute each share, send N transactions, then reconcile what actually landed.",
        "Every repetition is a chance to fat-finger an address or miscalculate a share, and there's no shared source of truth the group can audit.",
        "Revenue shares, DAO contributor payouts and group fundraising all hit the same wall — the split rules live in a spreadsheet, not in code.",
      ],
      approach: [
        {
          title: "One child contract per group",
          detail:
            "A factory deploys a dedicated Cairo contract per group. The group's address is a real on-chain destination, so any incoming payment triggers the split automatically — no bot, no cron, no operator pressing send.",
        },
        {
          title: "Rules configured once, enforced forever",
          detail:
            "Payout percentages are written into the contract at setup. After that the split is not a policy anyone can forget to follow, it's the only behaviour the contract has.",
        },
        {
          title: "Rust + Axum backend as the coordination layer",
          detail:
            "The backend handles group lifecycle, validates split plans before they reach the chain, indexes distribution history and exposes a typed REST API to the Next.js frontend. Axum's extractor model keeps handlers thin and the error surface explicit.",
        },
        {
          title: "Observability from the start",
          detail:
            "Redis caching plus Prometheus metrics and Grafana dashboards were added early, so distribution latency and failure rates are visible rather than inferred from user complaints.",
        },
      ],
      architecture: [
        "Cairo factory contract deploying an isolated child contract per group on Starknet.",
        "Child contract holds the split table; incoming transfers fan out to members by preset percentage.",
        "Rust/Axum REST API: group CRUD, split-plan validation, distribution history, wallet linking.",
        "Validation layer rejecting any plan whose shares don't sum to exactly 100% before it can be deployed.",
        "Redis for hot-path caching of group and split lookups.",
        "Prometheus metrics scraped into Grafana dashboards for distribution throughput and error rates.",
        "Next.js + TypeScript frontend for group setup, member management and payout history.",
      ],
      challenges: [
        {
          title: "Keeping off-chain and on-chain state honest",
          detail:
            "The backend's view of a group has to match what the contract actually enforces. Split plans are validated and normalised server-side, then treated as write-once — the chain is the source of truth and the API reads back from it rather than trusting its own cache.",
        },
        {
          title: "Rounding a split across N members",
          detail:
            "Percentages rarely divide a payment evenly. The distribution math is defined so remainders are handled deterministically instead of leaving dust stranded in the contract.",
        },
        {
          title: "Making failures diagnosable",
          detail:
            "A failed distribution is a user's money not arriving. Structured errors from the Axum layer plus Prometheus counters per failure class made it possible to tell a chain-level failure from a validation bug at a glance.",
        },
      ],
      results: [
        { metric: "$10K+", label: "Processed in on-chain transactions" },
        { metric: "1 setup", label: "Replaces every future manual payout round" },
        { metric: "N→1", label: "Transactions the payer has to send per cycle" },
        { metric: "100%", label: "Split enforcement moved into contract code" },
      ],
      learnings: [
        "Giving each group its own contract costs more at deploy time but buys clean isolation — one group's state can never corrupt another's.",
        "Axum's typed extractors and error handling pushed most input validation to the edge of the service, which kept the core distribution logic small enough to reason about.",
        "Adding metrics before launch rather than after an incident is the cheapest observability work you will ever do.",
      ],
    },
  },
  {
    slug: "studly",
    title: "Studly",
    tagline: "AI-powered collaborative study platform",
    summary:
      "Studly helps students learn, share knowledge, track progress and stay motivated through collaborative study tools, a community feed and a personalised 'Lucid' learning engine. I co-founded the product and built the feed backend in Rust with Axum.",
    outcome:
      "Powers the community feed that drives daily engagement and peer-to-peer learning for 3,000+ users.",
    role: "Co-founder & backend engineer",
    period: "2025 — Present",
    status: "Live",
    stack: ["Rust", "Axum", "REST API", "Systems Design"],
    featured: true,
    openSource: false,
    links: {
      demo: "https://usestudly.com/feed",
      note: "Private repository",
    },
    accent: "#c084fc", // violet
    snippet: {
      lang: "rust",
      code: `#[derive(Debug, Deserialize)]
struct FeedQuery { cursor: Option<Cursor>, limit: Option<u8> }

async fn feed(
    State(app): State<AppState>,
    Query(q): Query<FeedQuery>,
    user: AuthUser,
) -> Result<Json<Page<Post>>, ApiError> {
    let limit = q.limit.unwrap_or(20).min(50);
    app.feed.timeline(user.id, q.cursor, limit).await.map(Json)
}`,
    },
    caseStudy: {
      overview:
        "Studly is a social-first e-learning platform: students study, practise, share what they know, and keep each other accountable. The community feed is the surface that makes it social — and it's the piece I built, as a Rust service on Axum serving real-time knowledge sharing for a platform now past 3,000 users.",
      problem: [
        "Studying alone is where motivation goes to die — most learning apps optimise for content delivery and treat community as an afterthought.",
        "A feed is deceptively hard: it has to stay fast as content grows, stay relevant per user, and never show the same thing twice while paginating.",
        "The platform needed a feed service that could take engagement traffic without becoming the bottleneck for the rest of the product.",
      ],
      approach: [
        {
          title: "Rust and Axum for a predictable hot path",
          detail:
            "The feed is the most-hit endpoint on the platform. Rust gives predictable latency with no GC pauses, and Axum's tower-based middleware stack made auth, tracing and rate limiting composable rather than bolted on.",
        },
        {
          title: "Cursor pagination, not offsets",
          detail:
            "Offset pagination duplicates and skips posts as new content lands mid-scroll. The feed paginates on an opaque cursor so a user's scroll stays stable no matter what's being published underneath them.",
        },
        {
          title: "Typed API contract end to end",
          detail:
            "Request and response shapes are modelled as Rust types with serde, so the API contract is checked at compile time and the frontend gets a stable, documented surface.",
        },
      ],
      architecture: [
        "Rust service built on Axum, structured as handler → service → repository layers.",
        "Cursor-based timeline pagination with a bounded page size.",
        "Auth extracted as an Axum extractor, so every protected handler is authenticated by its own signature.",
        "Structured error type mapping domain failures to correct HTTP status codes.",
        "Tracing instrumentation on request spans for latency and error attribution.",
      ],
      challenges: [
        {
          title: "Stable ordering under concurrent writes",
          detail:
            "New posts arrive while users are mid-scroll. Using an opaque cursor derived from a stable sort key means pagination stays consistent instead of shuffling items between pages.",
        },
        {
          title: "Bounding what clients can ask for",
          detail:
            "An unbounded `limit` parameter is a free denial-of-service. Page size is clamped server-side, and the clamp lives in one place rather than scattered across handlers.",
        },
      ],
      results: [
        { metric: "3,000+", label: "Users on the platform" },
        { metric: "Live", label: "Serving the feed at usestudly.com" },
        { metric: "Daily", label: "Engagement surface for peer-to-peer learning" },
        { metric: "Rust", label: "Predictable latency, no GC pauses on the hot path" },
      ],
      learnings: [
        "Feeds are a data-modelling problem long before they're a performance problem — get the sort key right and most of the performance work disappears.",
        "Axum extractors are an underrated design tool: putting auth in a handler's type signature makes it impossible to forget.",
      ],
    },
  },
  {
    slug: "agromart",
    title: "AgroMart",
    tagline: "E-marketplace for fresh food items",
    summary:
      "A digital marketplace connecting buyers directly with fresh produce and food vendors. I worked on the backend with NestJS, building the API layer that powers the marketplace — catalog, vendors, and order flow.",
    outcome:
      "Gives buyers a streamlined way to buy fresh food direct from vendors, with expansion into Uganda in progress.",
    role: "Backend engineer",
    period: "2024",
    status: "Live",
    stack: ["NestJS", "TypeScript", "Node.js", "REST API"],
    featured: true,
    openSource: false,
    links: {
      demo: "https://agromart.thebuidl.xyz/",
      note: "Repository not public",
    },
    image: "/projects/agromart.png",
    imageFit: "contain",
    accent: "#4ade80", // green
    snippet: {
      lang: "typescript",
      code: `@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  findAll(@Query() query: ListProductsDto) {
    return this.products.findAll(query);
  }

  @Post()
  @UseGuards(VendorGuard)
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }
}`,
    },
    caseStudy: {
      overview:
        "AgroMart connects buyers with fresh produce vendors through an online marketplace. I built the backend API with NestJS — the catalog, vendor and ordering layer the storefront runs on. The platform is now being set up to operate in Uganda alongside its existing market.",
      problem: [
        "Buying fresh produce means either physically going to a market or going through layers of middlemen who add cost without adding value.",
        "Vendors selling fresh food have no straightforward way to list stock and reach buyers online.",
        "Marketplace inventory is unusually volatile — fresh stock changes daily, so the API has to treat availability as a first-class concern.",
      ],
      approach: [
        {
          title: "NestJS module boundaries per domain",
          detail:
            "Products, vendors and orders are separate modules with their own controllers, services and DTOs. Domain logic lives in services, HTTP concerns stay in controllers, and the boundaries hold as the surface grows.",
        },
        {
          title: "DTO validation at the edge",
          detail:
            "Every request body and query string is a validated DTO. Malformed input is rejected before it ever reaches business logic, and the DTOs double as the API's documentation.",
        },
        {
          title: "Guard-based authorization",
          detail:
            "Vendor-only operations are protected by guards rather than inline checks, so authorization is declarative and visible on the route it protects.",
        },
      ],
      architecture: [
        "NestJS application split into product, vendor and order modules.",
        "Controller → service → repository layering with dependency injection throughout.",
        "class-validator DTOs enforcing request shape at the boundary.",
        "Guards for role-based access to vendor and admin operations.",
        "Paginated, filterable catalog endpoints backing marketplace browse and search.",
      ],
      challenges: [
        {
          title: "Modelling volatile inventory",
          detail:
            "Fresh stock turns over fast, so availability is part of the read model rather than something computed at checkout — buyers should never get to payment on an item that's already gone.",
        },
        {
          title: "Keeping the catalog fast as it grows",
          detail:
            "Browse and search hit the catalog hardest. Filtering and pagination were pushed into the query layer instead of being done in application memory.",
        },
      ],
      results: [
        { metric: "Live", label: "Marketplace running at agromart.thebuidl.xyz" },
        { metric: "Uganda", label: "Next market — expansion in progress" },
        { metric: "3", label: "Domain modules: products, vendors, orders" },
        { metric: "Direct", label: "Buyer-to-vendor purchasing, no middlemen" },
      ],
      learnings: [
        "NestJS's opinionated structure pays off the moment more than one person touches the codebase — there's no argument about where a thing goes.",
        "Validating at the edge with DTOs removes an entire category of defensive checks from the layers underneath.",
      ],
    },
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
