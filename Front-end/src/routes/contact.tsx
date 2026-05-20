import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import heroImg from "@/assets/hero-main.jpg";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchOffices, submitContact } from "@/api";
import { SuccessModal } from "@/components/common/SuccessModal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Support Studio" },
      { name: "description", content: "Talk to Support Studio about your next enterprise transformation program." },
    ],
  }),
  component: Contact,
});

const OFFICES = [
  { c: "Bengaluru", a: "Embassy TechVillage, Outer Ring Rd", t: "+91 80 4555 0100" },
  { c: "New York", a: "200 West 41st Street, NY 10036", t: "+1 212 555 0140" },
  { c: "London", a: "1 Aldgate Square, EC3N 1AF", t: "+44 20 7946 0500" },
  { c: "Berlin", a: "Friedrichstraße 68, 10117", t: "+49 30 5557 0200" },
];

function Contact() {
  const [offices, setOffices] = useState(OFFICES);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState({ name: "", email: "", company: "" });

  useEffect(() => {
    fetchOffices()

      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((o: any) => ({
            c: o.c,
            a: o.a,
            t: o.t
          }));
          setOffices(mapped);
        }
      })
      .catch(err => console.error("Error fetching offices:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);

    submitContact({ name, email, company, country, message })
      .then(data => {
        setIsSubmitting(false);
        setSubmitted(true);
        setSubmittedDetails({ name, email, company });
        setShowSuccessModal(true);
        setName("");
        setEmail("");
        setCompany("");
        setCountry("");
        setMessage("");
      })
      .catch(err => {
        console.error("Error submitting contact form:", err);
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title={<>Start a <span className="text-gradient">conversation.</span></>}
        subtitle="Tell us about your business priorities. We'll respond within one business day with the right team for the conversation."
        image={heroImg}
      />

      <section className="py-16">
        <div className="container-xl grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-surface p-8 md:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Full name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:outline-none focus:border-cyan transition"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Business email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:outline-none focus:border-cyan transition"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Company</label>
                  <input
                    required
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:outline-none focus:border-cyan transition"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Country</label>
                  <input
                    required
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:outline-none focus:border-cyan transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">How can we help?</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:outline-none focus:border-cyan transition"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-sm font-medium text-primary-foreground glow hover:opacity-95 disabled:opacity-50 transition cursor-pointer"
              >
                {isSubmitting ? "Sending message..." : "Send message"} <ArrowRight className="h-4 w-4" />
              </button>
              {submitted && <p className="text-sm text-cyan">Thanks — a member of our team will be in touch shortly.</p>}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 space-y-4">
            <Eyebrow>Direct lines</Eyebrow>
            <div className="rounded-2xl border border-border p-6 flex items-start gap-4">
              <Mail className="h-5 w-5 text-cyan mt-1" />
              <div>
                <div className="font-semibold">info@isupportz.com</div>
                <div className="text-sm text-muted-foreground">General inquiries</div>
              </div>
            </div>
            <div className="rounded-2xl border border-border p-6 flex items-start gap-4">
              <Mail className="h-5 w-5 text-cyan mt-1" />
              <div>
                <div className="font-semibold">hr@isupportz.com</div>
                <div className="text-sm text-muted-foreground">HR & careers</div>
              </div>
            </div>
            <div className="rounded-2xl border border-border p-6 flex items-start gap-4">
              <Phone className="h-5 w-5 text-cyan mt-1" />
              <div>
                <div className="font-semibold">0413-2191301</div>
                <div className="text-sm text-muted-foreground">Direct office line</div>
              </div>
            </div>
            <div className="rounded-2xl border border-border p-6 flex items-start gap-4">
              <MapPin className="h-5 w-5 text-cyan mt-1" />
              <div>
                <div className="font-semibold">Puducherry Head Office</div>
                <div className="text-sm text-muted-foreground">#192, Kamaraj Salai, Puducherry – 605 013</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Offices */}
      <section className="py-24">
        <div className="container-xl">
          <Reveal><Eyebrow>Global offices</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">A team on every continent we serve.</h2></Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offices.map((o, i) => (
              <Reveal key={o.c} delay={i * 0.06}>
                <div className="rounded-2xl border border-border bg-surface p-8 h-full">
                  <div className="text-xs uppercase tracking-widest text-cyan">{o.c}</div>
                  <div className="mt-3 text-base">{o.a}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{o.t}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 relative overflow-hidden rounded-3xl border border-border h-[420px]">
              <img src={heroImg} alt="Map" className="h-full w-full object-cover opacity-40" loading="lazy" />
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Interactive map · 32 hubs · 40+ countries</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Inquiry Submitted"
        subtitle="Thank you. We have received your inquiry and our team will get in touch shortly."
        details={[
          { label: "Partner Name", value: submittedDetails.name },
          { label: "Business Email", value: submittedDetails.email },
          { label: "Company", value: submittedDetails.company },
          { label: "Service Request", value: "Consultation Request" },
        ]}
      />
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input required name={name} type={type} className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:outline-none focus:border-primary transition" />
    </div>
  );
}
