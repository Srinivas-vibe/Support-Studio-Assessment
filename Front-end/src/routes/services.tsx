import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import secImg from "@/assets/tech-security.jpg";
import aiImg from "@/assets/tech-ai.jpg";
import transformImg from "@/assets/transformation.jpg";
import aboutImg from "@/assets/about-team.jpg";
import { ArrowRight, Brain, Cloud, ShieldCheck, BarChart3, Cpu, Workflow, Boxes, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchServices } from "@/api";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Support Studio" },
      { name: "description", content: "AI, cloud, cybersecurity, data and enterprise application services for global enterprises." },
    ],
  }),
  component: Services,
});

const ICON_MAP: Record<string, any> = {
  Brain, Cloud, ShieldCheck, BarChart3, Cpu, Workflow, Boxes, Sparkles
};

const IMAGE_MAP: Record<string, string> = {
  secImg, aiImg, transformImg, aboutImg
};

const STACK = [
  { icon: Brain, t: "Generative AI & Agents", d: "Foundation model strategy, AI agents, copilots and production MLOps.", img: aiImg },
  { icon: Cloud, t: "Cloud & Platform Engineering", d: "Hyperscaler-native foundations, FinOps, and internal developer platforms.", img: transformImg },
  { icon: ShieldCheck, t: "Cybersecurity & Trust", d: "Zero-trust, identity, SOC operations and resilience engineering.", img: secImg },
  { icon: BarChart3, t: "Data & Analytics", d: "Modern data fabrics, lakehouses, decision intelligence at scale.", img: aboutImg },
];

const PROCESS = [
  { n: "01", t: "Discover", d: "Two-week strategy sprint with C-suite, IT and business stakeholders." },
  { n: "02", t: "Design", d: "Outcome map, target architecture, and a 90-day production milestone." },
  { n: "03", t: "Deliver", d: "Squad-based delivery with measurable weekly progress and live dashboards." },
  { n: "04", t: "Operate", d: "Run-and-improve model — SLOs, FinOps, and continuous value engineering." },
];

const CAPS = [
  { icon: Cpu, t: "Edge & IoT" },
  { icon: Workflow, t: "Intelligent Automation" },
  { icon: Boxes, t: "Enterprise Applications" },
  { icon: Sparkles, t: "Experience Engineering" },
];

function Services() {
  const [stack, setStack] = useState(STACK);

  useEffect(() => {
    fetchServices()

      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((s: any) => ({
            icon: ICON_MAP[s.iconName] || Brain,
            t: s.title,
            d: s.desc,
            img: IMAGE_MAP[s.imgName] || aiImg
          }));
          setStack(mapped);
        }
      })
      .catch(err => console.error("Error fetching stack:", err));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Services"
        title={<>Engineering services for <span className="text-gradient">the intelligent enterprise.</span></>}
        subtitle="A complete portfolio across AI, cloud, cybersecurity, data and enterprise applications — delivered by squads who own outcomes end-to-end."
        image={aiImg}
      />

      <section className="py-24">
        <div className="container-xl space-y-24">
          {stack.map((s, i) => (
            <Reveal key={s.t}>
              <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-7 relative">
                  <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
                  <div className="relative overflow-hidden rounded-2xl border border-border">
                    <img src={s.img} alt={s.t} loading="lazy" className="h-[440px] w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <s.icon className="h-10 w-10 text-cyan" />
                  <h3 className="mt-6 text-3xl md:text-4xl font-semibold leading-tight">{s.t}</h3>
                  <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{s.d}</p>
                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    {["Strategy & advisory", "Architecture & engineering", "Run & continuous improvement"].map((x) => (
                      <li key={x} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-cyan" />{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-surface/50 border-y border-border">
        <div className="container-xl">
          <Reveal><Eyebrow>How we work</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">A delivery model engineered for enterprise pace.</h2></Reveal>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="group relative rounded-2xl border border-border bg-surface p-8 h-full card-hover overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative">
                    <div className="text-[0.6875rem] font-mono font-medium text-cyan/70 mb-4">{p.n}</div>
                    <div className="icon-wrap mb-5">
                      <span className="text-sm font-display font-bold text-cyan">{p.t.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{p.t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on caps */}
      <section className="py-32">
        <div className="container-xl">
          <Reveal><Eyebrow>And more</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">Specialized practices when you need them.</h2></Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPS.map((c) => (
              <Reveal key={c.t}>
                <div className="group relative rounded-2xl border border-border bg-surface p-8 card-hover overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative">
                    <div className="icon-wrap mb-5">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="text-base font-semibold">{c.t}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-xl pb-16">
        <div className="rounded-3xl bg-gradient-primary p-12 md:p-16 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
          <h3 className="text-3xl md:text-4xl font-semibold text-primary-foreground max-w-2xl">Have a program in mind?</h3>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-medium w-fit">
            Talk to an expert <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
