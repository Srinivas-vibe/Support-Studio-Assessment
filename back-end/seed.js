import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import {
  Service,
  Capability,
  Stat,
  CaseStudy,
  Testimonial,
  Rating,
  Client,
  Faq,
  Role,
  Benefit,
  Office
} from "./models.js";

dotenv.config();

const CLIENTS = [
  { name: "Lufthansa" },
  { name: "BNY Mellon" },
  { name: "Maersk" },
  { name: "Siemens" },
  { name: "Unilever" },
  { name: "Pfizer" },
  { name: "Vodafone" },
  { name: "HSBC" }
];

const SERVICES = [
  { iconName: "Brain", title: "AI & Generative Intelligence", desc: "Production-grade AI platforms, agents and copilots that reshape how enterprises operate at scale.", imgName: "aiImg" },
  { iconName: "Cloud", title: "Cloud & Platform Engineering", desc: "Multi-cloud foundations, FinOps and platform engineering for enterprise velocity.", imgName: "transformImg" },
  { iconName: "ShieldCheck", title: "Cybersecurity & Trust", desc: "Zero-trust architecture, threat intelligence and 24/7 SOC operations across continents.", imgName: "secImg" },
  { iconName: "BarChart3", title: "Data & Analytics", desc: "Modern data fabrics, lakehouses and decision intelligence powering measurable outcomes.", imgName: "aboutImg" }
];

const CAPABILITIES = [
  { iconName: "Brain", name: "Generative AI", k: "1,200+ models in production" },
  { iconName: "Cloud", name: "Hybrid Cloud", k: "All 3 hyperscalers" },
  { iconName: "ShieldCheck", name: "Cybersecurity", k: "24/7 global SOC" },
  { iconName: "BarChart3", name: "Data Analytics", k: "9 PB processed daily" },
  { iconName: "Cpu", name: "Edge & IoT", k: "Latency under 5ms" },
  { iconName: "Workflow", name: "Automation", k: "40M+ hours saved" }
];

const STATS = [
  { v: "75K+", l: "Specialists worldwide" },
  { v: "40+", l: "Countries served" },
  { v: "$8.2B", l: "Revenue under management" },
  { v: "98%", l: "Client retention" }
];

const CASES = [
  { tag: "Banking", title: "BNY Mellon — AI-led modernization across 24 markets", desc: "Migrated 300M customer records to a cloud-native core in 14 months — zero downtime.", imgName: "secImg", span: "lg:col-span-8", featured: true },
  { tag: "Pharma", title: "Pfizer — Accelerating clinical trials with generative AI", desc: "Cut Phase II timelines by 31% with a federated AI patient-matching engine.", imgName: "aiImg", span: "lg:col-span-4", featured: true },
  { tag: "Logistics", title: "Maersk — A digital backbone for global shipping", desc: "Unified 130 systems into a real-time orchestration platform handling 12M shipments/year.", imgName: "transformImg", span: "lg:col-span-4", featured: true },
  { tag: "Energy", title: "Predictive grid intelligence", desc: "Reduced outage windows 42% via edge AI deployed across 6,000 substations.", imgName: "heroImg", span: "lg:col-span-8", featured: false },
  { tag: "Consumer", title: "Unilever — An AI-native marketing engine", desc: "Personalization at 1.4B-customer scale across 190 markets.", imgName: "aboutImg", span: "lg:col-span-6", featured: false },
  { tag: "Aviation", title: "Lufthansa — Rethinking the passenger experience", desc: "A unified guest platform serving 145M annual travelers.", imgName: "careerImg", span: "lg:col-span-6", featured: false }
];

const TESTIMONIALS = [
  { quote: "Support Studio rebuilt the foundation of our customer platform in 14 months. The business impact has been transformational.", name: "Anita Roy", role: "Group CIO, Lufthansa", imgName: "aboutImg" },
  { quote: "Few partners blend enterprise depth with the engineering speed required for AI. Support Studio is one of them.", name: "Marcus Vogel", role: "EVP Technology, Siemens", imgName: "aboutImg" },
  { quote: "From strategy to scaled production — they showed up as one team across three continents.", name: "Priya Mehta", role: "CTO, HSBC Asia", imgName: "aboutImg" }
];

const RATINGS = [
  { k: "Average CSAT", v: "4.9 / 5" },
  { k: "Repeat business", v: "92%" },
  { k: "NPS", v: "+78" }
];

const FAQS = [
  { category: "Engagements", q: "How do you price programs?", a: "We default to outcome- and milestone-based commercial models tied to measurable business KPIs, with transparent T&M for advisory phases." },
  { category: "Engagements", q: "How fast can a program start?", a: "Discovery typically begins within 2 weeks of contract; first production milestone within 90 days for most engagements." },
  { category: "Engagements", q: "Do you sign master service agreements?", a: "Yes — we operate under enterprise MSAs with most Fortune 500 clients. Our legal team can mirror your preferred framework." },
  { category: "Delivery", q: "Where are your delivery centers?", a: "32 hubs across North America, EMEA and APAC. We staff a blend of onshore proximity, nearshore and global delivery to match each program." },
  { category: "Delivery", q: "Who owns the IP we co-create?", a: "Client owns all bespoke IP. Reusable Support Studio accelerators are licensed perpetually at no additional cost." },
  { category: "Delivery", q: "Can we hire your engineers afterwards?", a: "Yes — we offer a hire-to-source path for embedded engineers after 12 months on engagement." },
  { category: "Security & Trust", q: "What certifications do you hold?", a: "SOC 2 Type II, ISO 27001, ISO 27701, PCI-DSS, HIPAA-aligned controls and FedRAMP for our US Public sector business." },
  { category: "Security & Trust", q: "How do you handle data residency?", a: "All client data stays in client-controlled regions. We never copy production data out of regulated boundaries." },
  { category: "Security & Trust", q: "How do you vet engineers?", a: "Background checks per market regulation, ongoing security training, and least-privilege access on every engagement." }
];

const ROLES = [
  { t: "Senior AI Engineer", l: "Berlin / Remote EMEA", d: "AI Foundry" },
  { t: "Principal Cloud Architect", l: "New York", d: "Hyperscale Platform" },
  { t: "Cybersecurity Consultant", l: "London", d: "Trust & Resilience" },
  { t: "Engineering Manager, Data", l: "Bengaluru", d: "Decision Intelligence" },
  { t: "UX Engineer", l: "Remote — Americas", d: "Experience Studio" },
  { t: "Client Partner — Banking", l: "Singapore", d: "Industry Group" }
];

const BENEFITS = [
  { i: "Heart", t: "World-class healthcare", d: "Comprehensive coverage for you and your family, in every market we operate." },
  { i: "Globe2", t: "Global mobility", d: "Work from any of our 32 hubs — short-term assignments encouraged." },
  { i: "GraduationCap", t: "Learning budget", d: "$3,000/year for resources, certifications, conferences and books." },
  { i: "Coins", t: "Equity for everyone", d: "Every full-time employee participates in our equity program." }
];

const OFFICES = [
  { c: "Bengaluru", a: "Embassy TechVillage, Outer Ring Rd", t: "+91 80 4555 0100" },
  { c: "New York", a: "200 West 41st Street, NY 10036", t: "+1 212 555 0140" },
  { c: "London", a: "1 Aldgate Square, EC3N 1AF", t: "+44 20 7946 0500" },
  { c: "Berlin", a: "Friedrichstraße 68, 10117", t: "+49 30 5557 0200" }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    await Promise.all([
      Client.deleteMany({}),
      Service.deleteMany({}),
      Capability.deleteMany({}),
      Stat.deleteMany({}),
      CaseStudy.deleteMany({}),
      Testimonial.deleteMany({}),
      Rating.deleteMany({}),
      Faq.deleteMany({}),
      Role.deleteMany({}),
      Benefit.deleteMany({}),
      Office.deleteMany({})
    ]);

    console.log("Seeding collections...");
    await Promise.all([
      Client.insertMany(CLIENTS),
      Service.insertMany(SERVICES),
      Capability.insertMany(CAPABILITIES),
      Stat.insertMany(STATS),
      CaseStudy.insertMany(CASES),
      Testimonial.insertMany(TESTIMONIALS),
      Rating.insertMany(RATINGS),
      Faq.insertMany(FAQS),
      Role.insertMany(ROLES),
      Benefit.insertMany(BENEFITS),
      Office.insertMany(OFFICES)
    ]);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
