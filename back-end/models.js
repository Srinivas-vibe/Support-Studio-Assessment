import mongoose from "mongoose";

// 1. Service Schema
const serviceSchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  imgName: { type: String, required: true }
});

// 2. Capability Schema
const capabilitySchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  name: { type: String, required: true },
  k: { type: String, required: true }
});

// 3. Stat Schema
const statSchema = new mongoose.Schema({
  v: { type: String, required: true },
  l: { type: String, required: true }
});

// 4. CaseStudy Schema
const caseStudySchema = new mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  imgName: { type: String, required: true },
  span: { type: String, default: "lg:col-span-4" },
  featured: { type: Boolean, default: false }
});

// 5. Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  imgName: { type: String, required: true }
});

// 6. Rating Schema
const ratingSchema = new mongoose.Schema({
  k: { type: String, required: true },
  v: { type: String, required: true }
});

// 7. Client Schema
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// 8. Faq Schema
const faqSchema = new mongoose.Schema({
  category: { type: String, required: true },
  q: { type: String, required: true },
  a: { type: String, required: true }
});

// 9. Role Schema
const roleSchema = new mongoose.Schema({
  t: { type: String, required: true },
  l: { type: String, required: true },
  d: { type: String, required: true }
});

// 10. Benefit Schema
const benefitSchema = new mongoose.Schema({
  i: { type: String, required: true },
  t: { type: String, required: true },
  d: { type: String, required: true }
});

// 11. Office Schema
const officeSchema = new mongoose.Schema({
  c: { type: String, required: true },
  a: { type: String, required: true },
  t: { type: String, required: true }
});

// 12. Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

// 13. Application Schema
const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  resume: { type: String, required: true },
  message: { type: String },
  appliedAt: { type: Date, default: Date.now }
});

// 14. Visit Schema
const visitSchema = new mongoose.Schema({
  path: { type: String, required: true },
  userAgent: { type: String },
  ip: { type: String },
  referrer: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// Avoid OverwriteModelError by checking if model exists
export const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export const Capability = mongoose.models.Capability || mongoose.model("Capability", capabilitySchema);
export const Stat = mongoose.models.Stat || mongoose.model("Stat", statSchema);
export const CaseStudy = mongoose.models.CaseStudy || mongoose.model("CaseStudy", caseStudySchema);
export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
export const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);
export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);
export const Faq = mongoose.models.Faq || mongoose.model("Faq", faqSchema);
export const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export const Benefit = mongoose.models.Benefit || mongoose.model("Benefit", benefitSchema);
export const Office = mongoose.models.Office || mongoose.model("Office", officeSchema);
export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);
export const Visit = mongoose.models.Visit || mongoose.model("Visit", visitSchema);
