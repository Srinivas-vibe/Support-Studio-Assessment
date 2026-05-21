const BASE_URL = import.meta.env.VITE_API_URL || "https://support-studio-assessment.onrender.com";

export async function fetchBenefits() {
  const res = await fetch(`${BASE_URL}/api/benefits`);
  if (!res.ok) throw new Error("Failed to fetch benefits");
  return res.json();
}

export async function fetchRoles() {
  const res = await fetch(`${BASE_URL}/api/roles`);
  if (!res.ok) throw new Error("Failed to fetch roles");
  return res.json();
}

export interface ApplicationInput {
  name: string;
  email: string;
  role: string;
  resume: string;
  message?: string;
}

export async function submitApplication(data: ApplicationInput) {
  const res = await fetch(`${BASE_URL}/api/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit job application");
  return res.json();
}

export async function fetchTestimonials() {
  const res = await fetch(`${BASE_URL}/api/testimonials`);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function fetchRatings() {
  const res = await fetch(`${BASE_URL}/api/ratings`);
  if (!res.ok) throw new Error("Failed to fetch ratings");
  return res.json();
}

export async function fetchServices() {
  const res = await fetch(`${BASE_URL}/api/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function fetchCases(featured?: boolean) {
  const url = featured ? `${BASE_URL}/api/cases?featured=true` : `${BASE_URL}/api/cases`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch case studies");
  return res.json();
}

export async function fetchClients() {
  const res = await fetch(`${BASE_URL}/api/clients`);
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
}

export async function fetchCapabilities() {
  const res = await fetch(`${BASE_URL}/api/capabilities`);
  if (!res.ok) throw new Error("Failed to fetch capabilities");
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${BASE_URL}/api/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchFaqs() {
  const res = await fetch(`${BASE_URL}/api/faqs`);
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  return res.json();
}

export async function fetchOffices() {
  const res = await fetch(`${BASE_URL}/api/offices`);
  if (!res.ok) throw new Error("Failed to fetch offices");
  return res.json();
}

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  country: string;
  message: string;
}

export async function submitContact(data: ContactInput) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit contact form");
  return res.json();
}

export async function fetchContactSubmissions() {
  const res = await fetch(`${BASE_URL}/api/contacts`);
  if (!res.ok) throw new Error("Failed to fetch contact submissions");
  return res.json();
}

export async function fetchJobApplications() {
  const res = await fetch(`${BASE_URL}/api/applications`);
  if (!res.ok) throw new Error("Failed to fetch job applications");
  return res.json();
}

export async function fetchVisits() {
  const res = await fetch(`${BASE_URL}/api/analytics/visits`);
  if (!res.ok) throw new Error("Failed to fetch visitor analytics");
  return res.json();
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Invalid administrative credentials");
  }
  return res.json();
}

export async function verifyAdminToken(token: string) {
  const res = await fetch(`${BASE_URL}/api/admin/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Session expired or invalid");
  return res.json();
}
