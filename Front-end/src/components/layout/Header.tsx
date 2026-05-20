import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import sstLogo from "@/assets/SST.svg";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
  { to: "/careers", label: "Careers" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouterState();
  const pathname = router.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-background/75 shadow-[0_1px_0_oklch(1_0_0_/0.06)]"
          : "bg-transparent"
      }`}
    >
      {/* Top accent line — only visible before scroll */}
      {!scrolled && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />
      )}

      <div className="container-xl flex h-[72px] items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center group shrink-0">
          <img src={sstLogo} alt="Support Studio Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV.map((n) => {
            const isActive =
              n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative px-4 py-2 text-[0.8125rem] font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {n.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-gradient-to-r from-primary to-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="relative group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold text-white overflow-hidden"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-full" />
            <span className="relative">Talk to us</span>
            <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="lg:hidden relative h-10 w-10 flex items-center justify-center rounded-xl glass text-foreground transition-colors"
          onClick={() => setOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/98 backdrop-blur-2xl"
          >
            <nav className="container-xl flex flex-col py-5 gap-1" aria-label="Mobile navigation">
              {NAV.map((n, i) => {
                const isActive =
                  n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                return (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      to={n.to}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-[0.9375rem] font-medium transition-all ${
                        isActive
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {n.label}
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV.length * 0.04 + 0.05 }}
                className="mt-2"
              >
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[0.875rem] font-semibold text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Talk to us <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
