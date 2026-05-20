import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan">
      <span className="h-px w-8 bg-cyan/60" />
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  //padding :"10%"
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-80" />
      </div>

      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] opacity-60" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-indigo/10 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-cyan/8 blur-[80px] opacity-40" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Top line */}
      <div className="absolute top-0 inset-x-0 line-gradient" />

      <div className="container-xl relative">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-7 max-w-4xl text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-[1.04] tracking-tight">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
