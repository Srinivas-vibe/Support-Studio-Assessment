import { Link, useRouterState } from "@tanstack/react-router";
import { Linkedin, Twitter, Instagram, ArrowUpRight, Zap, MapPin, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import sstLogo from "@/assets/SST.svg";
import { SuccessModal } from "@/components/common/SuccessModal";

const SOCIALS = [
  { Icon: Linkedin, href: "https://www.linkedin.com/company/supportstudiotechnologies", label: "LinkedIn" },
  { Icon: Twitter, href: "https://x.com/isupportz", label: "X (Twitter)" },
  { Icon: Instagram, href: "https://www.instagram.com/support_studio_technologies", label: "Instagram" },
];

const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      { to: "/services", label: "AI & Generative Intelligence" },
      { to: "/services", label: "Cloud & Platform Engineering" },
      { to: "/services", label: "Cybersecurity & Trust" },
      { to: "/services", label: "Data & Analytics" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/careers", label: "Careers" },
      { to: "/testimonials", label: "Client Stories" },
      { to: "/blog", label: "Insights" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/portfolio", label: "Case Studies" },
      { to: "/faq", label: "FAQ" },
      { to: "/blog", label: "Newsroom" },
      { to: "/contact", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/contact", label: "Compliance" },
    ],
  },
];

export function Footer() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setSubmittedEmail(email);
      setShowSuccessModal(true);
      setEmail("");
    }
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative mt-24 overflow-hidden bg-surface/60 border-t border-border">
      {/* Gradient top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Mesh gradient blobs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan/4 blur-[80px] pointer-events-none" />

      <div className="container-xl relative">
        {/* Newsletter strip */}
        <div className="py-12 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-lg">
              <div className="text-[0.6875rem] font-mono font-medium uppercase tracking-[0.2em] text-cyan mb-3">
                Insights Newsletter
              </div>
              <h3 className="text-2xl font-display font-semibold leading-tight">
                Enterprise intelligence, delivered weekly.
              </h3>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              {submitted ? (
                <div className="flex items-center gap-2 text-sm text-cyan font-medium py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                  You're on the list. Thanks!
                </div>
              ) : (
                <>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="work@company.com"
                    required
                    className="flex-1 min-w-0 rounded-full px-5 py-3 text-sm bg-white/6 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition hover:opacity-90"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Subscribe <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="py-14 grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center group mb-6">
              <img src={sstLogo} alt="Support Studio Logo" className="h-8 w-auto" />
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Powering the next generation of digital enterprises through AI, cloud, and intelligent transformation across 40+ countries and 75,000+ specialists worldwide.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-cyan/70 shrink-0" />
                <span>Puducherry, India · London · Singapore</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-cyan/70 shrink-0" />
                <a
                  href="mailto:hello@supportstudio.tech"
                  className="hover:text-foreground transition-colors"
                >
                  hello@supportstudio.tech
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 flex gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group h-10 w-10 grid place-items-center rounded-xl glass hover:bg-primary/15 hover:border-primary/30 transition-all duration-200"
                >
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-5 text-[0.6875rem] font-mono font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-foreground/70 hover:text-foreground transition-colors leading-snug"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-border text-xs text-muted-foreground/70">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>© {new Date().getFullYear()} Support Studio Technologies Pvt. Ltd. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Engineered with intent in Puducherry</span>
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Subscription Active"
        subtitle="You have successfully subscribed to the Support Studio newsletter."
        details={[
          { label: "Subscriber Email", value: submittedEmail },
          { label: "Frequency", value: "Weekly Digest" },
          { label: "Subscription Type", value: "Enterprise Intelligence Insights" },
        ]}
      />
    </footer>
  );
}
