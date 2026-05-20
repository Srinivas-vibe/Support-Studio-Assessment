import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import secImg from "@/assets/tech-security.jpg";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchFaqs } from "@/api";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Support Studio" },
      { name: "description", content: "Answers to common questions about Support Studio's enterprise services, engagement model and security posture." },
    ],
  }),
  component: FAQ,
});

const GROUPS = [
  {
    cat: "Engagements",
    items: [
      { q: "How do you price programs?", a: "We default to outcome- and milestone-based commercial models tied to measurable business KPIs, with transparent T&M for advisory phases." },
      { q: "How fast can a program start?", a: "Discovery typically begins within 2 weeks of contract; first production milestone within 90 days for most engagements." },
      { q: "Do you sign master service agreements?", a: "Yes — we operate under enterprise MSAs with most Fortune 500 clients. Our legal team can mirror your preferred framework." },
    ],
  },
  {
    cat: "Delivery",
    items: [
      { q: "Where are your delivery centers?", a: "32 hubs across North America, EMEA and APAC. We staff a blend of onshore proximity, nearshore and global delivery to match each program." },
      { q: "Who owns the IP we co-create?", a: "Client owns all bespoke IP. Reusable Support Studio accelerators are licensed perpetually at no additional cost." },
      { q: "Can we hire your engineers afterwards?", a: "Yes — we offer a hire-to-source path for embedded engineers after 12 months on engagement." },
    ],
  },
  {
    cat: "Security & Trust",
    items: [
      { q: "What certifications do you hold?", a: "SOC 2 Type II, ISO 27001, ISO 27701, PCI-DSS, HIPAA-aligned controls and FedRAMP for our US Public sector business." },
      { q: "How do you handle data residency?", a: "All client data stays in client-controlled regions. We never copy production data out of regulated boundaries." },
      { q: "How do you vet engineers?", a: "Background checks per market regulation, ongoing security training, and least-privilege access on every engagement." },
    ],
  },
];

function FAQ() {
  const [groups, setGroups] = useState(GROUPS);

  useEffect(() => {
    fetchFaqs()

      .then(data => {
        if (Array.isArray(data)) {
          // Group by category dynamically
          const map: Record<string, any[]> = {};
          data.forEach((item: any) => {
            if (!map[item.category]) map[item.category] = [];
            map[item.category].push({ q: item.q, a: item.a });
          });
          const grouped = Object.keys(map).map(cat => ({
            cat,
            items: map[cat]
          }));
          setGroups(grouped);
        }
      })
      .catch(err => console.error("Error fetching FAQs:", err));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="FAQ"
        title={<>Answers for <span className="text-gradient">procurement, IT and the boardroom.</span></>}
        subtitle="The questions we hear most from CIOs, CISOs and chief procurement officers — answered."
        image={secImg}
      />
      <section className="py-16">
        <div className="container-xl space-y-16">
          {groups.map((g) => (
            <Reveal key={g.cat}>
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <Eyebrow>{g.cat}</Eyebrow>
                  <h2 className="mt-4 text-3xl md:text-4xl font-semibold">{g.cat} questions</h2>
                </div>
                <div className="lg:col-span-8 space-y-3">
                  {g.items.map((it, i) => <Accordion key={it.q} q={it.q} a={it.a} defaultOpen={i === 0} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function Accordion({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`rounded-xl border border-border bg-surface overflow-hidden transition ${open ? "bg-surface-2" : ""}`}>
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-6 p-6 text-left">
        <span className="text-lg font-medium">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}
