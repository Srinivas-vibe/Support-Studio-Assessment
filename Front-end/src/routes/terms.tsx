import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/common/Section";
import secImg from "@/assets/tech-security.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Support Studio" },
      { name: "description", content: "Terms governing the use of Support Studio's website and services." },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  { t: "Acceptance of terms", b: "By accessing isupportz.com you agree to these terms. Use of our paid services is governed by your master services agreement, which controls in case of conflict." },
  { t: "Permitted use", b: "You may use this site for lawful purposes only. You may not interfere with operation, attempt unauthorized access, or scrape content for resale." },
  { t: "Intellectual property", b: "All site content, brand assets and reference architectures are © Support Studio Technologies unless otherwise marked. Reuse requires written permission." },
  { t: "Third-party links", b: "We are not responsible for the content, privacy or security practices of third-party sites linked from isupportz.com." },
  { t: "Disclaimer", b: "The site is provided \"as is\" without warranties of any kind. Nothing on this site constitutes professional advice unless covered by a signed engagement." },
  { t: "Governing law", b: "These terms are governed by the laws of New York. Disputes will be resolved exclusively in the state and federal courts located in New York County." },
];

function Terms() {
  return (
    <div>
      <PageHero eyebrow="Legal" title={<>Terms of <span className="text-gradient">service.</span></>} subtitle="Last updated May 2026. The terms below govern your use of this website." image={secImg} />
      <section className="container-xl pb-32 max-w-3xl">
        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <div key={s.t}>
              <div className="text-xs uppercase tracking-widest text-cyan">Section {String(i + 1).padStart(2, "0")}</div>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold">{s.t}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-lg">{s.b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
