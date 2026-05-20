import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal, Eyebrow } from "@/components/common/Section";
import aboutImg from "@/assets/about-team.jpg";
import aiImg from "@/assets/tech-ai.jpg";
import transformImg from "@/assets/transformation.jpg";
import { Star, Quote, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchTestimonials, fetchRatings } from "@/api";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Support Studio" },
      { name: "description", content: "Client success stories and testimonials from Fortune 500 leaders." },
    ],
  }),
  component: Testimonials,
});

const STORIES = [
  { q: "Support Studio rebuilt the foundation of our customer platform in 14 months. The business impact has been transformational.", n: "Anita Roy", r: "Group CIO, Lufthansa", img: aboutImg },
  { q: "Few partners blend enterprise depth with the engineering speed required for AI. Support Studio is one of them.", n: "Marcus Vogel", r: "EVP Technology, Siemens", img: aiImg },
  { q: "From strategy to scaled production — they showed up as one team across three continents.", n: "Priya Mehta", r: "CTO, HSBC Asia", img: transformImg },
];

const RATINGS = [
  { k: "Average CSAT", v: "4.9 / 5" },
  { k: "Repeat business", v: "92%" },
  { k: "NPS", v: "+78" },
];

const IMAGE_MAP: Record<string, string> = {
  aboutImg, aiImg, transformImg
};

function Testimonials() {
  const [stories, setStories] = useState(STORIES);
  const [ratings, setRatings] = useState(RATINGS);

  useEffect(() => {
    fetchTestimonials()
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((t: any) => ({
            q: t.quote,
            n: t.name,
            r: t.role,
            img: IMAGE_MAP[t.imgName] || aboutImg
          }));
          setStories(mapped);
        }
      })
      .catch(err => console.error("Error fetching testimonials:", err));

    fetchRatings()
      .then(data => { if (Array.isArray(data)) setRatings(data); })
      .catch(err => console.error("Error fetching ratings:", err));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Client voices"
        title={<>The work — <span className="text-gradient">in their words.</span></>}
        subtitle="Hear from the leaders we've partnered with across banking, aviation, pharma and consumer industries."
        image={aboutImg}
      />

      {/* Big testimonial */}
      <section className="py-16">
        <div className="container-xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-16 grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <Quote className="h-12 w-12 text-cyan" />
                <p className="mt-6 text-2xl md:text-4xl leading-snug font-display font-semibold">"Support Studio didn't deliver a project. They handed us a new operating model — one our business has compounded on for three years and counting."</p>
                <div className="mt-8">
                  <div className="font-semibold text-lg">Rohan Desai</div>
                  <div className="text-muted-foreground">Group CEO, Maersk Digital</div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer">
                  <img src={transformImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-primary glow grid place-items-center"><Play className="h-7 w-7 fill-current" /></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16">
        <div className="container-xl grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 h-full flex flex-col card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="h-4 w-4 fill-cyan text-cyan" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="relative text-base leading-relaxed text-foreground/85 flex-1">&ldquo;{s.q}&rdquo;</p>
                <div className="relative mt-8 pt-6 border-t border-border/70 flex items-center gap-3">
                  <img src={s.img} alt={s.n} className="h-10 w-10 rounded-full object-cover border border-border" loading="lazy" />
                  <div>
                    <div className="text-sm font-semibold">{s.n}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ratings */}
      <section className="py-16">
        <div className="container-xl">
          <Reveal>
            <div className="grid sm:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden">
              {ratings.map((r) => (
                <div key={r.k} className="group relative bg-surface p-10 text-center overflow-hidden hover:bg-surface-2 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="text-5xl font-display font-bold text-gradient">{r.v}</div>
                    <div className="mt-3 text-[0.6875rem] font-mono uppercase tracking-[0.2em] text-muted-foreground">{r.k}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
