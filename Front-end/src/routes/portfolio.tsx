import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import secImg from "@/assets/tech-security.jpg";
import aiImg from "@/assets/tech-ai.jpg";
import transformImg from "@/assets/transformation.jpg";
import aboutImg from "@/assets/about-team.jpg";
import careerImg from "@/assets/careers.jpg";
import heroImg from "@/assets/hero-main.jpg";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchCases } from "@/api";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Support Studio" },
      { name: "description", content: "Selected case studies of enterprise digital transformation across banking, logistics, pharma and energy." },
    ],
  }),
  component: Portfolio,
});

const IMAGE_MAP: Record<string, string> = {
  secImg, aiImg, transformImg, aboutImg, careerImg, heroImg
};

const WORKS = [
  { tag: "Banking", t: "Re-platforming a 24-market retail bank", d: "Migrated 300M customer records to a cloud-native core in 14 months — zero downtime.", img: secImg, span: "lg:col-span-8" },
  { tag: "Pharma", t: "AI-accelerated clinical trials", d: "Cut Phase II timelines by 31% with a federated AI patient-matching engine.", img: aiImg, span: "lg:col-span-4" },
  { tag: "Logistics", t: "Maersk: a digital backbone for global trade", d: "Unified 130 systems into a real-time orchestration platform handling 12M shipments/year.", img: transformImg, span: "lg:col-span-4" },
  { tag: "Energy", t: "Predictive grid intelligence", d: "Reduced outage windows 42% via edge AI deployed across 6,000 substations.", img: heroImg, span: "lg:col-span-8" },
  { tag: "Consumer", t: "Unilever: an AI-native marketing engine", d: "Personalization at 1.4B-customer scale across 190 markets.", img: aboutImg, span: "lg:col-span-6" },
  { tag: "Aviation", t: "Lufthansa: rethinking the passenger experience", d: "A unified guest platform serving 145M annual travelers.", img: careerImg, span: "lg:col-span-6" },
];

function Portfolio() {
  const [works, setWorks] = useState(WORKS);

  useEffect(() => {
    fetchCases()

      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((c: any) => ({
            tag: c.tag,
            t: c.title,
            d: c.desc,
            img: IMAGE_MAP[c.imgName] || secImg,
            span: c.span || "lg:col-span-4"
          }));
          setWorks(mapped);
        }
      })
      .catch(err => console.error("Error fetching works:", err));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Selected work"
        title={<>The proof <span className="text-gradient">isn't slideware.</span> It's production.</>}
        subtitle="A look at recent enterprise programs across banking, pharma, logistics, energy and consumer industries."
        image={transformImg}
      />

      <section className="py-16">
        <div className="container-xl grid lg:grid-cols-12 gap-6">
          {works.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06} className={w.span}>
              <Link to="/portfolio" className="group block relative overflow-hidden rounded-2xl border border-border h-[460px] lg:h-[520px]">
                <img src={w.img} alt={w.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                  <span className="inline-flex w-fit items-center text-xs uppercase tracking-widest text-cyan glass rounded-full px-3 py-1">{w.tag}</span>
                  <h3 className="mt-4 text-2xl md:text-3xl font-semibold leading-snug max-w-xl">{w.t}</h3>
                  <p className="mt-3 text-muted-foreground max-w-xl">{w.d}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Read the story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
