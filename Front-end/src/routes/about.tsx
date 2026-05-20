import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import aboutImg from "@/assets/about-team.jpg";
import transformImg from "@/assets/transformation.jpg";
import aiImg from "@/assets/tech-ai.jpg";
import { ArrowRight, Target, Compass, Heart, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Support Studio" },
      { name: "description", content: "Support Studio is a global technology services firm engineering the intelligent enterprise for Fortune 500 leaders." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { y: "2009", t: "Founded in Bengaluru with 12 engineers and a single Fortune 500 client." },
  { y: "2013", t: "Expanded into EMEA with hubs in London and Berlin." },
  { y: "2017", t: "Crossed $1B in revenue. Launched our AI research practice." },
  { y: "2020", t: "Acquired three boutique consultancies across cloud, security and data." },
  { y: "2023", t: "Opened the Generative AI Foundry — 1,200 engineers, 4 continents." },
  { y: "2026", t: "75,000 specialists. Operating in 40+ countries. One Support Studio." },
];

const LEADERS = [
  { n: "Anand Krishnan", r: "Chief Executive Officer" },
  { n: "Elena Müller", r: "President, EMEA" },
  { n: "David Park", r: "Chief Technology Officer" },
  { n: "Sofia Almeida", r: "Chief People Officer" },
];

const VALUES = [
  { i: Target, t: "Outcomes over output", d: "We measure success in business impact, not story points." },
  { i: Compass, t: "Long-term thinking", d: "We build systems engineered to outlast trends." },
  { i: Heart, t: "Earned trust", d: "Trust is compounded — never claimed, always proven." },
  { i: Globe2, t: "One global team", d: "We bring the best of Support Studio to every engagement." },
];

function About() {
  return (
    <div>
      <PageHero
        eyebrow="About Support Studio"
        title={<>A technology partner built for <span className="text-gradient">the world's largest enterprises.</span></>}
        subtitle="Since 2009 we've grown from a Bengaluru garage to a 75,000-person global firm — but our obsession remains unchanged: helping ambitious enterprises engineer their next chapter."
        image={aboutImg}
      />

      {/* Mission */}
      <section className="py-24">
        <div className="container-xl grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight">To accelerate the intelligent enterprise.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>We exist to help the world's most consequential organizations move faster, decide better, and build systems that compound advantage decade after decade.</p>
            <p>That means treating technology as an instrument of strategy — not its substitute. It means staying close to the operating reality of our clients, and to the engineers who do the work. And it means investing in a culture where craft, candor and customer obsession are not slogans, but lived behaviors.</p>
          </Reveal>
        </div>
      </section>

      {/* Image story */}
      <section className="container-xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img src={transformImg} alt="Global presence" className="w-full h-[480px] object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 grid md:grid-cols-3 gap-6 max-w-4xl">
              {[{ v: "32", l: "Global delivery hubs" }, { v: "12", l: "AI research labs" }, { v: "$8.2B", l: "Annual revenue" }].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-6">
                  <div className="text-3xl font-display font-semibold text-gradient">{s.v}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="py-32">
        <div className="container-xl">
          <Reveal><Eyebrow>What we believe</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">The principles that shape every decision.</h2></Reveal>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 h-full card-hover">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative">
                    <div className="icon-wrap icon-wrap-lg mb-6">
                      <v.i className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{v.t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-surface/50 border-y border-border">
        <div className="container-xl">
          <Reveal><Eyebrow>Our journey</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">From 12 engineers to 75,000 specialists.</h2></Reveal>
          <div className="mt-16 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {TIMELINE.map((e, i) => (
                <Reveal key={e.y} delay={i * 0.05}>
                  <div className={`relative grid md:grid-cols-2 gap-8 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                    <div className="md:text-right md:pr-12">
                      <div className="text-5xl font-display font-semibold text-gradient">{e.y}</div>
                    </div>
                    <div className="md:pl-12">
                      <p className="text-lg text-muted-foreground leading-relaxed">{e.t}</p>
                    </div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-3 h-3 w-3 rounded-full bg-gradient-primary glow" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32">
        <div className="container-xl">
          <Reveal><Eyebrow>Leadership</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">Operators and engineers — first.</h2></Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((l, i) => (
              <Reveal key={l.n} delay={i * 0.08}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] border border-border">
                    <img src={aiImg} alt={l.n} className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="tag">Leadership</div>
                    </div>
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{l.n}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{l.r}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-xl pb-16">
        <div className="rounded-3xl bg-gradient-primary p-12 md:p-16 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
          <h3 className="text-3xl md:text-4xl font-semibold text-primary-foreground max-w-2xl">Join a team engineering the intelligent enterprise.</h3>
          <Link to="/careers" className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-medium w-fit">
            See open roles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
