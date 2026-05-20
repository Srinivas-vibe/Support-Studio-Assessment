import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import aiImg from "@/assets/tech-ai.jpg";
import secImg from "@/assets/tech-security.jpg";
import transformImg from "@/assets/transformation.jpg";
import aboutImg from "@/assets/about-team.jpg";
import careerImg from "@/assets/careers.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Support Studio" },
      { name: "description", content: "Enterprise insights on AI, cloud, cybersecurity and digital transformation from Support Studio's leadership and research." },
    ],
  }),
  component: Blog,
});

const CATS = ["All", "AI", "Cloud", "Security", "Industry", "Culture"];

const FEATURED = {
  tag: "AI", t: "The CIO's playbook for production-grade generative AI in 2026", d: "Eight architectural decisions every CIO should make in the next 90 days — and the ones to defer.", img: aiImg, author: "David Park", date: "May 10, 2026",
};

const POSTS = [
  { tag: "Cloud", t: "FinOps as a board-level discipline", img: transformImg, date: "May 6" },
  { tag: "Security", t: "Zero-trust isn't a product. It's an operating model.", img: secImg, date: "Apr 28" },
  { tag: "Industry", t: "How retail banks are quietly rebuilding their cores", img: aboutImg, date: "Apr 22" },
  { tag: "AI", t: "Why most enterprise copilots fail in month four", img: aiImg, date: "Apr 15" },
  { tag: "Culture", t: "Hiring engineers in the age of AI assistants", img: careerImg, date: "Apr 9" },
  { tag: "Cloud", t: "Inside our reference architecture for multi-cloud data", img: transformImg, date: "Apr 1" },
];

function Blog() {
  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title={<>Field notes from <span className="text-gradient">the enterprise edge.</span></>}
        subtitle="Research, opinion and case-led writing from Support Studio's leadership and engineering practices."
        image={aiImg}
      />

      <section className="container-xl">
        <Reveal>
          <Link to="/blog" className="group grid lg:grid-cols-12 gap-8 rounded-3xl border border-border overflow-hidden bg-surface">
            <div className="lg:col-span-7 relative overflow-hidden">
              <img src={FEATURED.img} alt={FEATURED.t} className="h-[420px] lg:h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="lg:col-span-5 p-10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-cyan">Featured · {FEATURED.tag}</span>
              <h2 className="mt-5 text-3xl md:text-4xl font-semibold leading-tight">{FEATURED.t}</h2>
              <p className="mt-5 text-muted-foreground">{FEATURED.d}</p>
              <div className="mt-8 text-sm text-muted-foreground">{FEATURED.author} · {FEATURED.date}</div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Read essay <ArrowUpRight className="h-4 w-4" /></div>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="container-xl mt-20">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c, i) => (
            <button
              key={c}
              className={`rounded-full px-5 py-2 text-[0.8125rem] font-medium border transition-all duration-200 ${
                i === 0
                  ? "text-white border-transparent glow-sm"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
              style={i === 0 ? { background: "var(--gradient-primary)" } : {}}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <Link to="/blog" className="group block">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] border border-border">
                  <img src={p.img} alt={p.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="tag">{p.tag}</span>
                  </div>
                </div>
                <div className="mt-4 text-[0.6875rem] font-mono text-muted-foreground">{p.date}</div>
                <h3 className="mt-1.5 text-lg font-semibold leading-snug group-hover:text-cyan transition-colors">{p.t}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <div className="h-20" />
    </div>
  );
}
