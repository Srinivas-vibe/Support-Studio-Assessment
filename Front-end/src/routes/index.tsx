import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  fetchClients,
  fetchServices,
  fetchCapabilities,
  fetchStats,
  fetchCases,
  fetchTestimonials
} from "@/api";
import {
  ArrowRight, ArrowUpRight, Brain, Cloud, ShieldCheck, BarChart3,
  Cpu, Sparkles, Globe2, Workflow, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-main.jpg";
import aboutImg from "@/assets/about-team.jpg";
import aiImg from "@/assets/tech-ai.jpg";
import secImg from "@/assets/tech-security.jpg";
import transformImg from "@/assets/transformation.jpg";
import { Reveal, Eyebrow } from "@/components/common/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Support Studio — Engineering the Intelligent Enterprise" },
      { name: "description", content: "AI, cloud, cybersecurity and digital transformation for Fortune 500 enterprises. 40+ countries, 75,000+ specialists." },
    ],
  }),
  component: Home,
});

// Dynamic component and asset lookups
const ICON_MAP: Record<string, any> = {
  Brain, Cloud, ShieldCheck, BarChart3, Cpu, Workflow, Sparkles, Globe2, ChevronRight
};

const IMAGE_MAP: Record<string, string> = {
  heroImg, aboutImg, aiImg, secImg, transformImg
};

const CLIENTS = ["Lufthansa", "BNY Mellon", "Maersk", "Siemens", "Unilever", "Pfizer", "Vodafone", "HSBC"];

const SERVICES = [
  { icon: Brain, title: "AI & Generative Intelligence", desc: "Production-grade AI platforms, agents and copilots that reshape how enterprises operate at scale.", img: aiImg },
  { icon: Cloud, title: "Cloud & Platform Engineering", desc: "Multi-cloud foundations, FinOps and platform engineering for enterprise velocity.", img: transformImg },
  { icon: ShieldCheck, title: "Cybersecurity & Trust", desc: "Zero-trust architecture, threat intelligence and 24/7 SOC operations across continents.", img: secImg },
  { icon: BarChart3, title: "Data & Analytics", desc: "Modern data fabrics, lakehouses and decision intelligence powering measurable outcomes.", img: aboutImg },
];

const CAPABILITIES = [
  { icon: Brain, name: "Generative AI", k: "1,200+ models in production" },
  { icon: Cloud, name: "Hybrid Cloud", k: "All 3 hyperscalers" },
  { icon: ShieldCheck, name: "Cybersecurity", k: "24/7 global SOC" },
  { icon: BarChart3, name: "Data Analytics", k: "9 PB processed daily" },
  { icon: Cpu, name: "Edge & IoT", k: "Latency under 5ms" },
  { icon: Workflow, name: "Automation", k: "40M+ hours saved" },
];

const STATS = [
  { v: "75K+", l: "Specialists worldwide" },
  { v: "40+", l: "Countries served" },
  { v: "$8.2B", l: "Revenue under management" },
  { v: "98%", l: "Client retention" },
];

const CASES = [
  { tag: "Banking", title: "BNY Mellon — AI-led modernization across 24 markets", img: secImg },
  { tag: "Logistics", title: "Maersk — A digital backbone for global shipping", img: transformImg },
  { tag: "Pharma", title: "Pfizer — Accelerating clinical trials with generative AI", img: aiImg },
];

const TESTIMONIALS = [
  { quote: "Support Studio rebuilt the foundation of our customer platform in 14 months. The business impact has been transformational.", name: "Anita Roy", role: "Group CIO, Lufthansa" },
  { quote: "Few partners blend enterprise depth with the engineering speed required for AI. Support Studio is one of them.", name: "Marcus Vogel", role: "EVP Technology, Siemens" },
  { quote: "From strategy to scaled production — they showed up as one team across three continents.", name: "Priya Mehta", role: "CTO, HSBC Asia" },
];

function Home() {
  const HERO_SLIDES = [heroImg, aiImg, transformImg];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // Dynamic States initialized with preloaded fallbacks
  const [clients, setClients] = useState<string[]>(CLIENTS);
  const [services, setServices] = useState(SERVICES);
  const [capabilities, setCapabilities] = useState(CAPABILITIES);
  const [stats, setStats] = useState(STATS);
  const [cases, setCases] = useState(CASES);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    // Fetch clients
    fetchClients()
      .then(data => { if (Array.isArray(data)) setClients(data); })
      .catch(err => console.error("Error fetching clients:", err));

    // Fetch services
    fetchServices()
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((s: any) => ({
            icon: ICON_MAP[s.iconName] || Brain,
            title: s.title,
            desc: s.desc,
            img: IMAGE_MAP[s.imgName] || aiImg
          }));
          setServices(mapped);
        }
      })
      .catch(err => console.error("Error fetching services:", err));

    // Fetch capabilities
    fetchCapabilities()
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((c: any) => ({
            icon: ICON_MAP[c.iconName] || Brain,
            name: c.name,
            k: c.k
          }));
          setCapabilities(mapped);
        }
      })
      .catch(err => console.error("Error fetching capabilities:", err));

    // Fetch stats
    fetchStats()
      .then(data => { if (Array.isArray(data)) setStats(data); })
      .catch(err => console.error("Error fetching stats:", err));

    // Fetch featured cases
    fetchCases(true)
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((c: any) => ({
            tag: c.tag,
            title: c.title,
            img: IMAGE_MAP[c.imgName] || secImg
          }));
          setCases(mapped);
        }
      })
      .catch(err => console.error("Error fetching cases:", err));

    // Fetch testimonials
    fetchTestimonials()
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((t: any) => ({
            quote: t.quote,
            name: t.name,
            role: t.role
          }));
          setTestimonials(mapped);
        }
      })
      .catch(err => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentSlide}
              src={HERO_SLIDES[currentSlide]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              alt="Hero background"
              className="absolute inset-0 h-full w-full object-cover"
              width={1920}
              height={1088}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </motion.div>

        <div className="container-xl relative pb-24 pt-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <Eyebrow>Intelligent Enterprise · 2026</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 max-w-5xl text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl font-semibold"
          >
            Engineering the <span className="text-gradient">intelligent enterprise</span> — at the scale of the world's largest businesses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground"
          >
            We partner with Fortune 500 leaders to design, build and operate the AI-native systems behind every meaningful business outcome.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white overflow-hidden"
              style={{ background: "var(--gradient-primary)" }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors rounded-full" />
              <span className="relative">Start a conversation</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 glass px-7 py-4 text-sm font-medium hover:border-white/30 hover:bg-white/8 transition-all"
            >
              Explore the work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="mt-20 max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden"
          >
            {stats.map((s) => (
              <div key={s.l} className="glass-card px-6 py-6 group hover:bg-primary/8 transition-colors">
                <div className="font-display text-3xl md:text-[2.25rem] font-bold text-gradient leading-none">{s.v}</div>
                <div className="mt-2.5 text-[0.65rem] font-mono uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRUSTED — animated marquee */}
      <section className="relative py-14 border-y border-border bg-surface/40 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-surface/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-surface/90 to-transparent z-10 pointer-events-none" />
        <p className="text-center text-[0.6875rem] font-mono uppercase tracking-[0.26em] text-muted-foreground mb-8">
          Trusted by the world's most demanding enterprises
        </p>
        <div className="flex overflow-hidden select-none">
          <div className="flex shrink-0 items-center gap-14 marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="font-display text-xl font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors whitespace-nowrap cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SHOWCASE — alternating */}
      <section className="py-32">
        <div className="container-xl">
          <div className="max-w-3xl">
            <Reveal><Eyebrow>What we do</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-4xl md:text-6xl font-semibold leading-tight">
                Four enterprise capabilities. <span className="text-gradient">One operating fabric.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-20 space-y-28">
            {services.map((s, i) => (
              <Reveal key={s.title}>
                <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-7 relative">
                    <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-border">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        className="h-[420px] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 glass rounded-full px-4 py-2 text-xs uppercase tracking-widest">
                        0{i + 1} / 04
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <s.icon className="h-10 w-10 text-cyan" />
                    <h3 className="mt-6 text-3xl md:text-4xl font-semibold leading-tight">{s.title}</h3>
                    <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{s.desc}</p>
                    <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan hover:gap-3 transition-all">
                      Explore capability <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATION STORY */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={transformImg} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-background/85" />
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
        <div className="container-xl relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal><Eyebrow>Digital Transformation</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5 text-4xl md:text-6xl font-semibold leading-[1.05]">
                  Transformation isn't a project. <br />
                  <span className="text-gradient">It's an operating model.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  We embed alongside leadership teams to re-architect enterprises end-to-end — from cloud foundations to AI products, with measurable business outcomes from day one.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                  {[
                    { k: "Avg. time to value", v: "11 months" },
                    { k: "Cost-to-serve reduction", v: "38%" },
                    { k: "AI workloads in prod", v: "1,200+" },
                    { k: "Programs delivered", v: "2,400" },
                  ].map((m) => (
                    <div key={m.k} className="glass rounded-xl p-5">
                      <div className="text-2xl font-display font-semibold text-gradient">{m.v}</div>
                      <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{m.k}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-border glow">
                <img src={aboutImg} alt="Transformation team" className="w-full h-[520px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-5">
                  <div className="text-xs uppercase tracking-widest text-cyan">Case in focus</div>
                  <div className="mt-2 font-display text-lg leading-snug">Re-platforming a global bank serving 24M customers across 24 markets.</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="py-32">
        <div className="container-xl">
          <div className="flex flex-wrap items-end justify-between gap-6 max-w-5xl">
            <div>
              <Reveal><Eyebrow>Technology expertise</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight">Deep capability across the full stack of enterprise technology.</h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm text-cyan font-medium">All capabilities <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 card-hover h-full">
                  <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-15 blur-3xl transition duration-700" />
                  <div className="icon-wrap icon-wrap-lg mb-6">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.k}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono text-cyan/60 group-hover:text-cyan transition-colors">
                    View details <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-32 bg-surface/50 border-y border-border">
        <div className="container-xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow>Selected work</Eyebrow></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5 text-4xl md:text-5xl font-semibold">Real outcomes for real enterprises.</h2>
              </Reveal>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-cyan">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <Link to="/portfolio" className="group block relative overflow-hidden rounded-2xl border border-border h-[460px]">
                  <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="inline-flex w-fit items-center text-xs uppercase tracking-widest text-cyan glass rounded-full px-3 py-1">{c.tag}</span>
                    <h3 className="mt-4 text-2xl font-semibold leading-snug">{c.title}</h3>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium">Read case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32">
        <div className="container-xl">
          <Reveal><Eyebrow>What clients say</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 max-w-3xl text-4xl md:text-5xl font-semibold leading-tight">Trusted by leaders, measured by impact.</h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 h-full flex flex-col card-hover">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  <div className="relative flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} className="h-4 w-4 fill-cyan text-cyan" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="relative text-base leading-relaxed text-foreground/85 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="relative mt-8 pt-6 border-t border-border/70 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full grid place-items-center text-sm font-display font-bold text-white shrink-0" style={{ background: "var(--gradient-primary)" }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* INNOVATION BANNER */}
      <section className="relative py-40 overflow-hidden border-y border-border">
        <div className="absolute inset-0">
          <img src={aiImg} alt="" className="h-full w-full object-cover opacity-50" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/30" />
        </div>
        <div className="container-xl relative">
          <Reveal>
            <Globe2 className="h-12 w-12 text-cyan" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 max-w-4xl text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              We don't deliver projects. <br />
              <span className="text-gradient">We compound advantage.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-sm font-medium text-primary-foreground glow">
              Inside the Support Studio method <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="py-32">
        <div className="container-xl grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal><Eyebrow>Common questions</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-4xl md:text-5xl font-semibold">Answers for procurement, IT and the boardroom.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/faq" className="mt-6 inline-flex items-center gap-2 text-sm text-cyan">All FAQs <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {[
              { q: "How do you price enterprise engagements?", a: "Outcome-based and milestone models built around measurable business KPIs, not staffing." },
              { q: "Where are your delivery centers?", a: "32 delivery hubs across North America, EMEA and APAC, with onshore proximity teams." },
              { q: "How fast can a program start?", a: "Discovery in 2 weeks, first production milestone within 90 days for most engagements." },
              { q: "Do you work with our existing partners?", a: "Yes — we operate inside hyperscaler, ISV and SI ecosystems, not against them." },
            ].map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group rounded-xl border border-border bg-surface p-6 open:bg-surface-2 transition">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-6">
                    <span className="text-lg font-medium">{f.q}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-xl pb-20">
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20" style={{ background: "var(--gradient-primary)" }}>
          <div className="absolute inset-0 bg-grid-sm opacity-15 pointer-events-none" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/15 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-[0.6875rem] font-mono uppercase tracking-[0.2em] text-white/65 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse" />
                Ready when you are
              </div>
              <h2 className="text-4xl md:text-[3.5rem] lg:text-[4rem] font-semibold leading-[1.04] text-white">
                Ready to engineer your next decade?
              </h2>
              <p className="mt-6 max-w-xl text-white/70 text-lg leading-relaxed">
                Let's talk about the outcomes that matter most to your business — and the systems that will deliver them.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-background hover:bg-white/92 transition-all shadow-2xl"
              >
                Schedule a briefing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
