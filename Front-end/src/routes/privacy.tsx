import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/common/Section";
import secImg from "@/assets/tech-security.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Support Studio" },
      { name: "description", content: "How Support Studio collects, uses and protects information." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  { t: "Information we collect", b: "We collect information you provide directly (such as contact details when you reach out), information collected automatically (cookies, IP addresses, device data), and information from third parties such as marketing partners." },
  { t: "How we use information", b: "To respond to inquiries, deliver services under client contracts, comply with legal obligations, secure our systems, and improve our offerings. We do not sell personal information." },
  { t: "Data residency & transfers", b: "All client data stays in client-controlled regions by default. International transfers rely on Standard Contractual Clauses and equivalent safeguards." },
  { t: "Your rights", b: "Depending on jurisdiction you have rights to access, correct, delete and port your information, and to object to or restrict certain processing. Contact privacy@isupportz.com." },
  { t: "Security", b: "We maintain SOC 2 Type II, ISO 27001 and ISO 27701 certifications, with continuous monitoring, least-privilege access and encryption in transit and at rest." },
  { t: "Updates", b: "We will post material changes to this policy on this page and, where required, notify you directly." },
];

function Privacy() {
  return (
    <div>
      <PageHero eyebrow="Legal" title={<>Privacy <span className="text-gradient">policy.</span></>} subtitle="Last updated May 2026. This policy describes how Support Studio Technologies handles information." image={secImg} />
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
