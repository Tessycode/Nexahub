import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  slug: string
  onNavigate: (page: string) => void
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

type Post = {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  author: { name: string; role: string; img: string; bio: string }
  heroImg: string
  content: string
  tags: string[]
  relatedSlugs: string[]
}

const posts: Post[] = [
  {
    slug: 'b2b-saas-onboarding',
    category: 'Product Design',
    title: 'Why most B2B SaaS onboarding fails — and how to fix it',
    excerpt: 'The first 15 minutes determine whether a user stays or churns. Most products spend months on acquisition and days on activation.',
    date: 'January 14, 2025',
    readTime: '7 min read',
    author: {
      name: 'Lin Zhao',
      role: 'Head of Design',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
      bio: 'Lin leads design at Nexahub. She has 12 years of experience in product design across fintech, healthtech and enterprise software.',
    },
    heroImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&auto=format',
    tags: ['Product Design', 'SaaS', 'Onboarding', 'UX Research'],
    relatedSlugs: ['page-load-performance', 'rebranding-strategy'],
    content: `
<h2>The activation gap is real — and most teams ignore it</h2>
<p>In the past 18 months, Nexahub has conducted onboarding audits for 23 B2B SaaS products. The finding that surprises every client is always the same: the biggest drop-off in their funnel isn't acquisition or churn. It's activation.</p>
<p>We define activation as the moment a new user reaches their first "aha moment" — the point where the product delivers enough value that the user understands why they signed up. In well-designed products, this happens within the first 15 minutes. In most B2B tools, it never happens at all.</p>
<blockquote>Activation is the moment a user stops trying to understand your product and starts using it to do work.</blockquote>
<h2>Why onboarding fails in B2B</h2>
<p>Consumer apps have spent a decade perfecting activation flows. B2B products, by contrast, still largely treat onboarding as a problem of information delivery — give the user a checklist of features, show them a tooltip tour, and call it done.</p>
<p>This misses the point entirely. Users don't want to learn your product. They want to accomplish a specific goal that prompted them to sign up in the first place. Your entire onboarding job is to get them to that goal as fast as possible.</p>
<p>Three patterns we see repeatedly in failing B2B onboarding:</p>
<ul>
  <li><strong>The empty state problem.</strong> The user logs in for the first time and sees an empty dashboard. Nothing to interact with, nothing to respond to. The product looks useless because it is useless — the user has no data in it yet. Good products solve this with sample data, templates, or guided first actions.</li>
  <li><strong>The "set up your account first" trap.</strong> Many products force users through a lengthy configuration step before they can do anything meaningful. Company name, team members, billing details, notification preferences — all before the user has any reason to care about the product. Ask for data when it's relevant, not upfront.</li>
  <li><strong>The feature tour that teaches, not enables.</strong> A guided tour of 14 features tells the user what exists. It doesn't help them do the thing they came to do. Replace feature tours with goal-based flows: "What are you trying to accomplish?" leads to a short, specific path to first value.</li>
</ul>
<h2>What good activation looks like in practice</h2>
<p>One of our most successful onboarding redesigns was for a project management tool aimed at construction companies. Their original onboarding was a 12-step setup wizard that covered every configuration option. Average time to first meaningful action: 4 days. After our redesign, that number dropped to 22 minutes.</p>
<p>What changed? We identified the single most common first action — creating a project and inviting a colleague — and built the entire first-run experience around that one task. Everything else was hidden until it was relevant.</p>
<h3>The four questions your onboarding must answer</h3>
<p>Before someone can feel the value of your product, they need four things answered implicitly or explicitly:</p>
<ul>
  <li><strong>Where am I?</strong> Make it immediately clear what kind of product this is and what it does.</li>
  <li><strong>What do I do first?</strong> Give them a single, clear starting action. Not a menu of options.</li>
  <li><strong>Is this working?</strong> Provide immediate feedback when they take an action so they know the product is responding.</li>
  <li><strong>What should I do next?</strong> After their first success, guide them to a second one. Don't abandon them after the first win.</li>
</ul>
<h2>Measuring activation properly</h2>
<p>Most teams track free trial to paid conversion as their activation metric. This is too late. By the time a user decides not to convert, the battle was already lost — usually in the first 24 hours.</p>
<p>Define an activation event that is correlated with long-term retention. For most tools, this is a specific action that creates persistent value in the account: a project created, a template saved, an integration connected. Instrument this event, track how many new users reach it within 24 hours, and optimise relentlessly for that number.</p>
<p>In our experience, every 10 percentage point improvement in 24-hour activation rates corresponds to roughly 6–9% improvement in 90-day retention. That's the leverage point most teams ignore while spending money on acquisition.</p>
<h2>The practical path forward</h2>
<p>If you're working on a B2B SaaS product right now, here's where to start:</p>
<ul>
  <li>Identify your activation event — the action that predicts long-term retention most reliably.</li>
  <li>Measure how many new users reach that event within their first 24 hours.</li>
  <li>Watch recordings of users who <em>don't</em> reach it. Note where they stop and why.</li>
  <li>Remove everything from the onboarding flow that doesn't directly help users reach that event.</li>
  <li>Add a sample state to every empty screen a new user might encounter.</li>
</ul>
<p>Onboarding isn't a feature. It's the most important product surface you have. The users who don't activate never come back — and they rarely tell you why they left.</p>
    `,
  },
  {
    slug: 'page-load-performance',
    category: 'Engineering',
    title: "Building for performance: how we cut 3s from a client's page load",
    excerpt: 'A real-world deep-dive into bundle analysis, server-side rendering decisions, and the trade-offs that actually move the needle on Core Web Vitals.',
    date: 'December 28, 2024',
    readTime: '11 min read',
    author: {
      name: 'Marcus Webb',
      role: 'Head of Engineering',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
      bio: 'Marcus leads engineering at Nexahub and has been building web applications for 14 years. He specialises in performance engineering and distributed systems.',
    },
    heroImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&auto=format',
    tags: ['Engineering', 'Performance', 'Core Web Vitals', 'Next.js'],
    relatedSlugs: ['b2b-saas-onboarding', 'rebranding-strategy'],
    content: `
<h2>The brief: a Next.js app taking 5.8 seconds to become interactive</h2>
<p>Last October we took on a performance engagement for a SaaS client whose application had accrued roughly three years of technical debt. Their main dashboard — the first thing users saw after login — had a Time to Interactive (TTI) of 5.8 seconds on a mid-range laptop with a fast broadband connection. On mobile, it was closer to 12 seconds.</p>
<p>Their NPS had been declining for two quarters. When we surveyed their users, "slow" appeared in 34% of negative responses. The product team had been treating this as a technical problem to fix someday. We convinced them it was a business problem to fix now.</p>
<blockquote>A 100ms reduction in load time correlates with a 1% increase in revenue, according to Amazon's internal research. At scale, performance is money.</blockquote>
<h2>Phase 1: Diagnosis before prescription</h2>
<p>The most common mistake in performance work is jumping to solutions. Before touching any code, we ran a comprehensive audit using Lighthouse, WebPageTest, and Chrome DevTools' Performance profiler. We also set up real-user monitoring (RUM) with Datadog to establish a baseline from actual user sessions.</p>
<p>The audit revealed five distinct problems contributing to the slow load:</p>
<ul>
  <li>A 2.1MB JavaScript bundle, of which 800KB was loaded on every page but only used on two</li>
  <li>12 external font requests, 4 of which loaded fonts not used on the dashboard</li>
  <li>All data fetching happening client-side on mount, causing a waterfall of API calls</li>
  <li>Images served at 4x their rendered size with no lazy loading</li>
  <li>A third-party chat widget loading synchronously in the <code>&lt;head&gt;</code></li>
</ul>
<h2>Phase 2: Quick wins (hours, not days)</h2>
<p>We always start with changes that have high impact and low risk. In this case, three changes took less than a day to implement and accounted for 1.4 seconds of the improvement:</p>
<h3>Font loading strategy</h3>
<p>Removing unused font families and switching to <code>font-display: swap</code> with preloaded WOFF2 files reduced render-blocking font time from 800ms to 80ms. This is almost always worth doing immediately.</p>
<h3>Image optimisation</h3>
<p>Switching from <code>&lt;img&gt;</code> tags to Next.js <code>&lt;Image&gt;</code> with appropriate <code>sizes</code> attributes and adding <code>loading="lazy"</code> to below-fold images reduced the initial image payload by 68%.</p>
<h3>Third-party script deferral</h3>
<p>Moving the chat widget to load after the page was interactive (using the <code>afterInteractive</code> strategy in Next.js Script) removed 340ms from the critical path immediately.</p>
<h2>Phase 3: Server-side rendering and data fetching</h2>
<p>The harder problem was the client-side data waterfall. The dashboard made three sequential API calls on mount: first for user data, then for project data that depended on user ID, then for activity feed data that depended on project IDs. Each call waited for the previous one to complete.</p>
<p>Moving to <code>getServerSideProps</code> for the initial data fetch allowed all three calls to happen in parallel on the server, with the fully-populated page HTML sent to the client. This eliminated 900ms of client-side waterfall — but introduced a trade-off: server response time increased by 180ms because the server was now doing more work per request.</p>
<p>The net result was still a 720ms improvement. But this is the kind of trade-off that only makes sense once you've measured both sides. Don't assume SSR is always faster; measure it.</p>
<h2>Phase 4: Code splitting and bundle analysis</h2>
<p>The 2.1MB bundle was the most complex problem to solve. Using <code>@next/bundle-analyzer</code>, we identified that 400KB came from a rich text editor library loaded on every page but only used on the project settings page. Another 200KB was moment.js — a library that the team had stopped using directly, but which was pulled in as a dependency of a date picker component.</p>
<p>We replaced the date picker with a lighter alternative (date-fns, 75KB vs 200KB), added dynamic imports for the rich text editor, and audited all remaining packages for lighter alternatives. Total bundle reduction: 680KB. This alone accounted for 1.1 seconds on mobile connections.</p>
<h2>The final result</h2>
<p>After all changes were deployed and validated in production with real user data:</p>
<ul>
  <li>TTI: 5.8s → 2.6s (55% reduction)</li>
  <li>Largest Contentful Paint: 4.2s → 1.8s</li>
  <li>Total Blocking Time: 2,100ms → 180ms</li>
  <li>JavaScript bundle: 2.1MB → 890KB</li>
  <li>Lighthouse performance score: 31 → 84</li>
</ul>
<p>Three months after the performance improvements went live, the client reported a 12% improvement in 7-day retention for new users and a meaningful uptick in NPS. The engineering work took six weeks of calendar time, with an estimated three weeks of actual engineering effort.</p>
<h2>What we'd do differently</h2>
<p>The work that took the most time — and that we'd advocate doing upfront on any new project — was establishing performance budgets and monitoring. Having a budget for bundle size, TTI, and LCP from day one would have prevented most of this debt from accumulating in the first place.</p>
<p>Performance is not a one-time fix. It's an ongoing practice. The teams that do it best treat Lighthouse scores and Core Web Vitals as first-class product metrics, not engineering housekeeping.</p>
    `,
  },
  {
    slug: 'rebranding-strategy',
    category: 'Brand Strategy',
    title: 'Rebranding without losing your existing customers',
    excerpt: "Brand evolution is more art than science. Here's how we approach identity refreshes without triggering brand recognition loss.",
    date: 'December 10, 2024',
    readTime: '8 min read',
    author: {
      name: 'James Hartfield',
      role: 'Co-Founder & CEO',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
      bio: 'James co-founded Nexahub in 2018. He has worked on brand strategy and product positioning for over 40 companies across B2B software, fintech and consumer products.',
    },
    heroImg: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=600&fit=crop&auto=format',
    tags: ['Branding', 'Strategy', 'Identity', 'B2B Marketing'],
    relatedSlugs: ['b2b-saas-onboarding', 'page-load-performance'],
    content: `
<h2>The rebrand that nearly cost a company its market position</h2>
<p>In 2023 we were brought in to help a 7-year-old B2B software company manage the aftermath of a rebrand that had gone wrong. They'd spent £180,000 on a new visual identity from a well-regarded branding agency, rolled it out overnight, and watched their inbound enquiry rate drop 40% in the following six weeks.</p>
<p>The new brand was objectively better — cleaner, more modern, more distinctive. But the rollout had severed the visual and verbal connections that existing customers and prospects used to recognise the company. Their SEO took a hit when old brand terms stopped appearing in metadata. Their Google Ads campaigns stopped converting because the landing pages no longer matched the brand recognition that users had built up over years.</p>
<p>The lesson isn't that rebranding is dangerous. It's that how you rebrand matters as much as what you rebrand to.</p>
<blockquote>Brand equity is stored in the minds of your customers. A rebrand that doesn't account for what's already there is gambling with real business value.</blockquote>
<h2>When rebranding is actually the right answer</h2>
<p>Not every brand problem is a brand problem. Before recommending a rebrand, we run a diagnostic that tries to rule out the simpler explanations. Many companies that think they need a new identity actually need one of three things instead:</p>
<ul>
  <li><strong>Better messaging.</strong> The visual brand is fine; the words aren't doing the work. This is a copywriting and positioning problem, not a logo problem.</li>
  <li><strong>Consistent execution.</strong> The brand exists but isn't being applied consistently across touchpoints. The solution is a design system and governance, not a new identity.</li>
  <li><strong>Product-market fit.</strong> The brand isn't converting because the product proposition isn't clear. No visual identity change will fix this.</li>
</ul>
<p>That said, there are genuine reasons to rebrand. The most common ones we encounter: the company has changed its business model or target market significantly; the brand was built at a stage that the company has clearly outgrown; the competitive landscape has shifted and the brand no longer differentiates; a merger or acquisition requires consolidation.</p>
<h2>The evolution vs. revolution question</h2>
<p>The first decision in any rebrand is whether you're evolving or starting from scratch. This isn't an aesthetic question — it's a business strategy question.</p>
<p>Evolution preserves brand equity while improving expression. The wordmark stays recognisable, the colour palette remains in the same family, the voice evolves rather than inverts. Evolution is right when your brand has genuine equity to preserve — when customers, prospects and employees have positive associations with it.</p>
<p>Revolution — a completely new identity — makes sense when the existing brand is actively working against you: when it's associated with problems the company has moved past, when it's so generic it provides no differentiation, or when the business itself has genuinely transformed into something different.</p>
<h3>A practical framework for the decision</h3>
<p>We ask three questions to help clients make this call:</p>
<ul>
  <li>If we surveyed your best customers, would they describe your brand positively or negatively? If positively, evolution is usually right.</li>
  <li>Does your current brand still represent where the company is going? If the company has pivoted, the brand probably needs to pivot too.</li>
  <li>Are your best prospects mistaking you for a different kind of company based on your visual identity? If so, the brand is creating a positioning problem that evolution alone may not fix.</li>
</ul>
<h2>The rollout: where most rebrands fail</h2>
<p>The creative work is the visible part of a rebrand. The rollout is where the actual risk lives.</p>
<p>A rebrand rollout that we consider well-executed has several characteristics. First, it's phased — not everything changes on the same day. Primary touchpoints (website, product, main social accounts) update together. Secondary touchpoints (collateral, email signatures, partner materials) follow over weeks. This gives the market time to adjust.</p>
<p>Second, the old brand doesn't disappear overnight. For companies with meaningful SEO equity, we recommend maintaining legacy brand terms in metadata, running parallel campaigns during transition periods, and redirecting old brand search terms for at least six months.</p>
<p>Third, existing customers hear about it before they see it. A brief, honest message — "We're evolving our visual identity because we've grown as a company" — turns a potential moment of confusion into a moment of engagement.</p>
<h2>Measuring rebrand success</h2>
<p>This is the part most branding projects skip entirely. We set up measurement frameworks before a rebrand launches and track changes in:</p>
<ul>
  <li>Brand awareness and recall in target segments (survey-based, quarterly)</li>
  <li>Direct and branded organic traffic trends (6-month window)</li>
  <li>Inbound enquiry rate and quality</li>
  <li>NPS for new vs. existing customers post-launch</li>
  <li>Sales cycle length — a strong brand shortens it</li>
</ul>
<p>Without measurement, you can't know whether the rebrand worked. And if you can't prove it worked, the next time someone questions the investment — and someone always does — you have nothing to show them.</p>
<p>Brand is a business function, not a creative exercise. Treat it with the same rigour you'd apply to any other significant business investment.</p>
    `,
  },
  {
    slug: 'paid-ads-conversion',
    category: 'Growth',
    title: 'The hidden reason your paid ads aren\'t converting',
    excerpt: 'Spending on traffic but not on what happens after the click is like pouring water into a leaking bucket. Post-click experience matters more than most marketers admit.',
    date: 'November 25, 2024',
    readTime: '6 min read',
    author: {
      name: 'Sofia Patel',
      role: 'Director of Growth',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format',
      bio: 'Sofia leads growth at Nexahub, with a background in performance marketing and CRO across e-commerce, SaaS, and fintech.',
    },
    heroImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&auto=format',
    tags: ['Growth', 'Paid Ads', 'Conversion', 'CRO'],
    relatedSlugs: ['b2b-saas-onboarding', 'rebranding-strategy'],
    content: `
<h2>Most teams optimise the wrong half of the funnel</h2>
<p>When a paid campaign underperforms, the instinctive response is to look at the ad itself. Test a new headline. Try a different audience segment. Increase the bid. These changes feel productive because they're visible in the platform and produce rapid feedback loops.</p>
<p>But in most underperforming campaigns we audit, the ad is fine. The problem lives somewhere between the click and the conversion — in the landing page, the form, the email follow-up, or the sales process. Fixing the ad creative while ignoring the post-click experience is optimising the wrong thing entirely.</p>
<blockquote>Your average conversion rate on a well-targeted paid campaign should be 3–6%. If you're seeing less than 1%, the problem is almost certainly your landing page, not your ad.</blockquote>
<h2>The message match problem</h2>
<p>The most common post-click failure we encounter is message mismatch. A user clicks an ad promising a specific benefit — "Cut your reporting time in half" — and lands on a homepage that talks about the company's history and mission. The specific promise that generated the click isn't visible anywhere on the page they land on.</p>
<p>This creates cognitive friction. The user has to do work to reconnect the ad promise to the product on the page. Most don't — they bounce. The fix is simple in principle but surprisingly hard to execute at scale: every ad should lead to a page that immediately reaffirms the specific promise in the ad. Not the homepage. Not the pricing page. A dedicated landing page that picks up exactly where the ad left off.</p>
<h2>Form length and conversion: the evidence</h2>
<p>We ran an A/B test for a B2B SaaS client last year that was instructive. Their lead generation form had 11 fields: name, email, company, job title, phone, company size, industry, use case, current solution, budget range, and how they heard about the company. They justified each field as "necessary for sales qualification."</p>
<p>We reduced the form to 3 fields (name, work email, company). Conversion rate went from 1.4% to 6.1% — a 335% increase. The sales team pushed back: without the qualification data, they'd have to qualify on the phone. We tracked the outcomes: qualified leads per month went from 28 to 91. Even accounting for the additional qualification calls, sales efficiency improved significantly.</p>
<p>Qualification data has value. But that value is zero if you're not generating enough leads to qualify in the first place. Get the email, then ask the questions that matter.</p>
<h2>Page speed and paid ads</h2>
<p>Most marketers know page speed affects organic search rankings. Fewer realise it directly affects paid ad performance. Google's Quality Score includes expected landing page experience, which is partly determined by page speed. A slow landing page means a lower Quality Score means a higher cost per click.</p>
<p>We have clients who cut their average CPC by 25–30% purely by improving landing page Core Web Vitals. At meaningful ad spend levels, this is a significant cost reduction — paid for entirely by engineering investment in performance.</p>
<h2>The follow-up window</h2>
<p>For lead generation campaigns, conversion doesn't end at form submission. How quickly and how well you follow up determines whether a lead becomes a customer.</p>
<p>Research consistently shows that response time within the first hour dramatically improves conversion-to-meeting rates. One study found that leads contacted within five minutes of submission were 21 times more likely to convert than those contacted after 30 minutes.</p>
<p>If your CRM doesn't notify sales the moment a lead comes in, and if sales doesn't have a clear SLA for first response, your paid campaign investment is partly wasted regardless of how well the top of the funnel performs.</p>
<p>Paid media is a system, not a campaign. Every element of that system — ad, landing page, form, follow-up, sales process — needs to work together. Optimising only what's easy to see in a dashboard leaves a significant portion of your investment on the table.</p>
    `,
  },
  {
    slug: 'react-native-vs-native',
    category: 'Engineering',
    title: 'When to choose React Native vs. native development',
    excerpt: 'The correct answer depends on your team, your users, your timeline, and your long-term maintenance appetite.',
    date: 'November 8, 2024',
    readTime: '9 min read',
    author: {
      name: 'Yemi Adeyinka',
      role: 'Co-Founder & CTO',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format',
      bio: 'Yemi co-founded Nexahub and leads technology strategy. He has 14 years in distributed systems and mobile development, previously at AWS and Palantir.',
    },
    heroImg: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop&auto=format',
    tags: ['Engineering', 'Mobile', 'React Native', 'iOS', 'Android'],
    relatedSlugs: ['page-load-performance', 'b2b-saas-onboarding'],
    content: `
<h2>The question we're asked most often about mobile development</h2>
<p>Roughly half of our mobile development enquiries begin with the same question: should we build native or use React Native? It's a genuinely important question, and the answer has real consequences for cost, timeline, hiring, performance, and long-term maintainability. We've built over 30 mobile applications at Nexahub, split roughly evenly between the two approaches. Here's how we think about the decision.</p>
<blockquote>The right answer to "native or React Native" is never "whichever is cheaper to build." It's "whichever best serves your users over the next three years."</blockquote>
<h2>When React Native is the right choice</h2>
<p>React Native's primary advantage is a shared codebase across iOS and Android. A single team can build and maintain both platforms, which has obvious cost implications. For many products, this is the deciding factor — and it's a legitimate one.</p>
<p>React Native works well when:</p>
<ul>
  <li><strong>You have a web engineering team.</strong> The transition from React web to React Native is relatively smooth. Your team can contribute meaningfully without learning Swift or Kotlin from scratch.</li>
  <li><strong>Your app is primarily UI-driven.</strong> If the core experience is displaying and interacting with content, React Native handles this well. The performance gap with native is small or imperceptible for most content-driven interfaces.</li>
  <li><strong>You need to ship to both platforms quickly.</strong> For MVPs and early-stage products where speed matters more than perfection, React Native's shared codebase is a genuine advantage.</li>
  <li><strong>Your product is primarily content and forms.</strong> Apps like internal tools, CRM interfaces, news readers, and many B2B applications fall into this category. React Native is well-suited to them.</li>
</ul>
<h2>When native is the better choice</h2>
<p>Native development gives you full access to platform capabilities and delivers the best possible performance. The trade-off is maintaining two codebases, which typically means two specialist teams or one team with expertise in both Swift and Kotlin.</p>
<p>Native wins when:</p>
<ul>
  <li><strong>Performance is the product.</strong> Gaming apps, real-time video, complex animations, AR/VR experiences, and high-frequency sensor data processing all benefit significantly from native performance characteristics.</li>
  <li><strong>Deep platform integration is required.</strong> Apps that need heavy use of platform-specific APIs — camera systems, background processing, HealthKit, NFC, Bluetooth Low Energy — are significantly easier to build and maintain natively.</li>
  <li><strong>The platform experience is part of your differentiation.</strong> If your competitive advantage is in how natural and polished the app feels on each platform, native is worth the extra cost. Users notice the difference, even if they can't articulate it.</li>
  <li><strong>You're building a consumer product at scale.</strong> Consumer apps with millions of users, where every frame of animation matters and battery usage is scrutinised, generally benefit from the efficiency of native code.</li>
</ul>
<h2>The honest conversation about React Native's limitations</h2>
<p>React Native has matured significantly since its early days. The New Architecture (JSI and Fabric) has meaningfully improved performance and eliminated some of the most painful bridge-related issues. For most applications, it's a capable and productive choice.</p>
<p>But there are genuine limitations worth understanding before you commit:</p>
<p>The JavaScript bridge — even with the New Architecture improvements — introduces overhead that pure native code doesn't have. For most apps this is imperceptible. For performance-intensive applications it can be significant.</p>
<p>Dependency management is more complex in React Native than in pure web or native environments. Every native dependency needs a native module that works across versions of both iOS and Android, maintained by a third party. When React Native updates its core, some of these modules break. If your app has many native dependencies, upgrades become a project.</p>
<p>The ecosystem, while large, is not always production-ready. Some packages that appear to have high install counts haven't been maintained in years. Evaluating React Native packages requires more due diligence than evaluating npm packages for web use.</p>
<h2>A decision framework that actually works</h2>
<p>We use a simple scoring exercise with clients. For each of these factors, assign a weight based on importance to your product, and score React Native vs. native against each:</p>
<ul>
  <li>Development speed and cost</li>
  <li>Long-term maintenance cost</li>
  <li>Performance requirements</li>
  <li>Platform integration depth</li>
  <li>Team skills and hiring market</li>
  <li>User experience quality bar</li>
</ul>
<p>This won't give you a definitive answer, but it forces the conversation to be about trade-offs rather than technology preferences. The worst mobile technology decisions we've seen were driven by engineer preference rather than product requirements.</p>
<p>Pick the tool that serves your users best over the lifetime of the product. That's the only criterion that matters.</p>
    `,
  },
  {
    slug: 'cloud-cost-optimisation',
    category: 'Cloud Infrastructure',
    title: "The £40k mistake: running EC2 when you should be running serverless",
    excerpt: "Infrastructure decisions made at MVP stage have a way of compounding. One of our most common consulting engagements is reversing architectures that made sense at 100 users but not at 100,000.",
    date: 'October 22, 2024',
    readTime: '10 min read',
    author: {
      name: 'Ravi Krishnan',
      role: 'Lead Solutions Architect',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format',
      bio: 'Ravi is a certified AWS Solutions Architect with 10 years of experience in cloud infrastructure. He previously worked at Deloitte and has led infrastructure projects for companies ranging from Series A startups to FTSE 100 enterprises.',
    },
    heroImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&auto=format',
    tags: ['Cloud Infrastructure', 'AWS', 'Serverless', 'Cost Optimisation'],
    relatedSlugs: ['page-load-performance', 'react-native-vs-native'],
    content: `
<h2>How a sensible MVP decision becomes a six-figure cost centre</h2>
<p>The pattern is remarkably consistent. A startup builds an MVP. They're moving fast, the team knows EC2, and provisioning a few instances is faster than learning a new paradigm. The MVP gets traction. The team hires and iterates. Infrastructure decisions from the first six months get locked in by application code that depends on them. Three years later, they're running 40 EC2 instances at £8,000 per month for a workload that would cost £600 per month on Lambda and API Gateway.</p>
<p>We've seen this specific scenario — or close variants of it — across a dozen infrastructure audits in the past two years. The opportunity cost isn't just the monthly spend difference. It's the engineering time spent managing instances, applying security patches, handling capacity planning, and responding to availability incidents that a serverless architecture would handle automatically.</p>
<blockquote>The question isn't "what works at our current scale." It's "what will be maintainable and cost-effective at 10x our current scale, and can we afford the migration if we get that wrong?"</blockquote>
<h2>Understanding the actual cost of EC2</h2>
<p>The AWS bill is the visible cost. The invisible costs are engineering time and operational risk. A properly maintained EC2 fleet requires:</p>
<ul>
  <li>Regular OS patching (typically 2–4 hours per month per engineer for a medium-sized fleet)</li>
  <li>AMI updates and instance replacement procedures</li>
  <li>Capacity planning and right-sizing reviews</li>
  <li>Load balancer health check tuning</li>
  <li>Auto-scaling group configuration and testing</li>
  <li>Backup and recovery testing</li>
</ul>
<p>For a startup with a 3-person engineering team, this overhead is significant. It's time not spent building product. For a company with one infrastructure engineer and a £40k annual EC2 bill, the true cost including engineering overhead often exceeds £80k per year.</p>
<h2>When serverless genuinely doesn't fit</h2>
<p>Serverless is not the answer to every problem. There are workloads where EC2 (or ECS, or EKS) remains the right choice:</p>
<ul>
  <li><strong>Long-running compute jobs.</strong> Lambda has a 15-minute maximum execution time. Machine learning training, video transcoding, complex report generation, and batch ETL jobs that run longer than this belong on EC2 or Fargate.</li>
  <li><strong>Stateful applications.</strong> Applications that maintain connection state — WebSocket servers, gaming servers, some real-time collaborative tools — are awkward to run serverlessly. Not impossible, but awkward.</li>
  <li><strong>High-throughput, consistently loaded workloads.</strong> If your application runs at near-maximum capacity 24/7, the cost advantage of serverless disappears. Lambda pricing optimises for variable load. If load is constant and high, dedicated compute can be cheaper.</li>
  <li><strong>Applications with cold start sensitivity.</strong> Lambda cold starts — the latency penalty when a new container is initialised — are a genuine problem for user-facing APIs with strict latency requirements. Provisioned concurrency mitigates this but adds cost.</li>
</ul>
<h2>The migration path</h2>
<p>For clients who've already built on EC2 and want to migrate, the approach that works best is incremental replacement rather than a big-bang migration. We typically follow this sequence:</p>
<p>First, identify workloads that map cleanly to serverless: asynchronous jobs, webhook handlers, scheduled tasks, low-traffic APIs. These can usually be migrated independently without changes to other parts of the system.</p>
<p>Second, migrate those workloads and run them in parallel with the EC2 equivalents for a validation period. Compare cost, performance, and error rates. This builds confidence in the architecture and gives the team time to develop serverless operational skills.</p>
<p>Third, identify the highest-cost EC2 workloads that aren't excluded by the constraints above, and migrate them. In most cases this is the core API layer.</p>
<p>The migration for our reference client — 40 EC2 instances, £8k monthly spend — took three engineers approximately six months working alongside product delivery. The final AWS bill: £620 per month. The payback period on the engineering investment was under 12 months.</p>
<h2>Infrastructure decisions are product decisions</h2>
<p>The reason these infrastructure debts accumulate isn't usually technical ignorance. It's that infrastructure decisions are treated as purely technical decisions, made by engineers at the start of a project before the product has found its footing. By the time the costs become visible, they're baked into the architecture in ways that are expensive to reverse.</p>
<p>The right approach is to treat infrastructure architecture as a product decision from day one: what are our scaling assumptions? What's our cost model at different user volumes? What operational overhead are we willing to accept? These aren't questions engineers can answer alone — they need input from product and commercial leadership.</p>
<p>The best time to make these decisions is before you start building. The second best time is now.</p>
    `,
  },
]

const allPosts = posts

export default function BlogPost({ slug, onNavigate }: Props) {
  const post = allPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-24">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Article not found</h1>
          <button onClick={() => onNavigate('blog')} className="btn btn-primary">Back to blog</button>
        </div>
      </div>
    )
  }

  const relatedPosts = allPosts.filter(p => post.relatedSlugs.includes(p.slug)).slice(0, 2)

  return (
    <div className="page-enter pt-24">
      {/* Hero */}
      <section className="section-pad pb-0">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => onNavigate('blog')} className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                All articles
              </button>
              <span style={{ color: 'var(--border)' }}>/</span>
              <span className="tag accent text-xs">{post.category}</span>
            </div>

            <h1 className="section-heading mb-6">{post.title}</h1>

            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>{post.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <img src={post.author.img} alt={post.author.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{post.author.name}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono-data text-xs" style={{ color: 'var(--muted-foreground)' }}>{post.date}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--border)' }} />
                <span className="font-mono-data text-xs" style={{ color: 'var(--muted-foreground)' }}>{post.readTime}</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Hero image */}
      <FadeUp delay={0.1}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 my-10">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '2/1', background: 'var(--muted)' }}>
            <img src={post.heroImg} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </FadeUp>

      {/* Article body */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div
              className="prose-content text-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeUp>

          {/* Tags */}
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
              {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </FadeUp>

          {/* Author card */}
          <FadeUp delay={0.15}>
            <div className="mt-10 p-6 rounded-2xl border flex items-start gap-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <img src={post.author.img} alt={post.author.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
              <div>
                <p className="font-semibold mb-0.5">{post.author.name}</p>
                <p className="text-xs mb-3" style={{ color: 'var(--primary)' }}>{post.author.role} at Nexahub</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{post.author.bio}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <FadeUp>
              <h2 className="text-xl font-semibold mb-8">Continue reading</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {relatedPosts.map(related => (
                  <article
                    key={related.slug}
                    className="rounded-xl border overflow-hidden cursor-pointer group card-hover"
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                    onClick={() => onNavigate(`blog-post-${related.slug}`)}
                  >
                    <div className="overflow-hidden" style={{ height: '160px', background: 'var(--muted)' }}>
                      <img src={related.heroImg} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ opacity: 0.85 }} />
                    </div>
                    <div className="p-4">
                      <span className="tag accent text-xs mb-2 block w-fit">{related.category}</span>
                      <h3 className="text-sm font-semibold leading-snug mb-1">{related.title}</h3>
                      <p className="font-mono-data text-xs" style={{ color: 'var(--muted-foreground)' }}>{related.readTime}</p>
                    </div>
                  </article>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 border-t" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <FadeUp>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Enjoyed this article?</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>We write about product, engineering, and growth 2–4 times a month.</p>
            <div className="flex gap-2 max-w-sm mx-auto mb-4">
              <input type="email" className="input-base flex-1 text-sm" placeholder="your@company.com" />
              <button className="btn btn-primary flex-shrink-0 text-sm" style={{ padding: '0.75rem 1.25rem' }}>Subscribe</button>
            </div>
            <button onClick={() => onNavigate('blog')} className="text-sm animated-link" style={{ color: 'var(--muted-foreground)' }}>Browse all articles</button>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
