import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import careerImg from "@/assets/careers.jpg";
import aboutImg from "@/assets/about-team.jpg";
import { ArrowUpRight, Heart, Globe2, GraduationCap, Coins } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchBenefits, fetchRoles, submitApplication } from "@/api";
import { SuccessModal } from "@/components/common/SuccessModal";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Support Studio" },
      { name: "description", content: "Join 75,000+ engineers, designers and consultants engineering the intelligent enterprise across 40+ countries." },
    ],
  }),
  component: Careers,
});

const BENEFIT_ICON_MAP: Record<string, any> = {
  Heart, Globe2, GraduationCap, Coins
};

const BENEFITS = [
  { i: Heart, t: "World-class healthcare", d: "Comprehensive coverage for you and your family, in every market we operate." },
  { i: Globe2, t: "Global mobility", d: "Work from any of our 32 hubs — short-term assignments encouraged." },
  { i: GraduationCap, t: "Learning budget", d: "$3,000/year for courses, certifications, conferences and books." },
  { i: Coins, t: "Equity for everyone", d: "Every full-time employee participates in our equity program." },
];

const ROLES = [
  { t: "Senior AI Engineer", l: "Berlin / Remote EMEA", d: "AI Foundry" },
  { t: "Principal Cloud Architect", l: "New York", d: "Hyperscale Platform" },
  { t: "Cybersecurity Consultant", l: "London", d: "Trust & Resilience" },
  { t: "Engineering Manager, Data", l: "Bengaluru", d: "Decision Intelligence" },
  { t: "UX Engineer", l: "Remote — Americas", d: "Experience Studio" },
  { t: "Client Partner — Banking", l: "Singapore", d: "Industry Group" },
];

function Careers() {
  const [benefits, setBenefits] = useState(BENEFITS);
  const [roles, setRoles] = useState(ROLES);

  // Job Application modal & form state
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetchBenefits()
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((b: any) => ({
            i: BENEFIT_ICON_MAP[b.i] || Heart,
            t: b.t,
            d: b.d
          }));
          setBenefits(mapped);
        }
      })
      .catch(err => console.error("Error fetching benefits:", err));

    fetchRoles()
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((r: any) => ({
            t: r.t,
            l: r.l,
            d: r.d
          }));
          setRoles(mapped);
        }
      })
      .catch(err => console.error("Error fetching roles:", err));
  }, []);

  const handleApplyClick = (role: any, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedRole(role);
    setIsModalOpen(true);
    setSubmitSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const appRole = selectedRole?.t || "General Application";

    submitApplication({
      name,
      email,
      role: appRole,
      resume,
      message
    })
      .then(data => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setSubmittedDetails({ name, email, role: appRole });
        setIsModalOpen(false);
        setShowSuccessModal(true);
        setName("");
        setEmail("");
        setResume("");
        setMessage("");
      })
      .catch(err => {
        console.error("Error submitting job application:", err);
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title={<>Build the systems that <span className="text-gradient">shape the world.</span></>}
        subtitle="75,000 specialists across 40+ countries — engineers, consultants, designers and researchers united by craft and consequence."
        image={careerImg}
      />

      {/* Culture image-text */}
      <section className="py-24">
        <div className="container-xl grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl">
              <img src={aboutImg} alt="Team" className="w-full h-[520px] object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <Eyebrow>Our culture</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight">A place engineers can do the best work of their lives.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">We hire people who care about craft, customer outcomes and one another. Everything else we'll teach. Our culture rewards judgment, candor and the kind of long-term thinking that compounds.</p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-surface/50 border-y border-border">
        <div className="container-xl">
          <Reveal><Eyebrow>Benefits</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">Built to support a long career — and a full life.</h2></Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-surface p-8 h-full">
                  <b.i className="h-8 w-8 text-cyan" />
                  <h3 className="mt-6 text-xl font-semibold">{b.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-24">
        <div className="container-xl">
          <Reveal><Eyebrow>Open roles</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl font-semibold">A few of the seats we're filling now.</h2></Reveal>
          <div className="mt-12 rounded-2xl border border-border overflow-hidden">
            {roles.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.04}>
                <button
                  onClick={(e) => handleApplyClick(r, e)}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 hover:bg-surface transition border-b border-border last:border-0 w-full text-left cursor-pointer"
                >
                  <div>
                    <div className="text-xl font-semibold">{r.t}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{r.d} · {r.l}</div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-cyan group-hover:gap-3 transition-all">
                    Apply <ArrowUpRight className="h-4 w-4" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Job Application Overlay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Reveal className="w-full max-w-lg bg-surface border border-border rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-xl cursor-pointer"
            >
              ✕
            </button>
            <Eyebrow>Apply Now</Eyebrow>
            <h3 className="mt-4 text-2xl font-semibold">{selectedRole?.t}</h3>
            <p className="text-sm text-cyan mt-1">{selectedRole?.d} · {selectedRole?.l}</p>

            {submitSuccess ? (
              <div className="mt-8 p-6 bg-cyan/10 border border-cyan/20 rounded-2xl text-center">
                <div className="text-cyan text-lg font-semibold">Application Submitted!</div>
                <p className="text-sm text-muted-foreground mt-2 font-light">Thank you for applying. We will review your profile and reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-cyan outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-cyan outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Resume / LinkedIn Profile Link</label>
                  <textarea
                    required
                    rows={3}
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Paste resume text or link your professional profile..."
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-cyan outline-none transition resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Brief Cover Note</label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us why you are excited about Support Studio..."
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-cyan outline-none transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-primary font-medium text-sm text-primary-foreground glow hover:opacity-95 transition disabled:opacity-50 mt-2 cursor-pointer"
                >
                  {isSubmitting ? "Submitting application..." : "Submit Application"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Application Received"
        subtitle="Thank you for applying. We will review your profile and reach out shortly."
        details={[
          { label: "Applicant Name", value: submittedDetails.name },
          { label: "Email Address", value: submittedDetails.email },
          { label: "Applied Position", value: submittedDetails.role },
          { label: "Status", value: "Reviewing Credentials" },
        ]}
      />
    </div>
  );
}
