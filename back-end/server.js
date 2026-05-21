import express from "express";
import mongoose from "mongoose";
import cors from "cors";
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
  Office,
  Contact,
  Application,
  Visit
} from "./models.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// --- GET API ENDPOINTS ---

// Get Services
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// Get Capabilities
app.get("/api/capabilities", async (req, res) => {
  try {
    const capabilities = await Capability.find({});
    res.json(capabilities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch capabilities" });
  }
});

// Get Stats
app.get("/api/stats", async (req, res) => {
  try {
    const stats = await Stat.find({});
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Get Case Studies (supports ?featured=true filter)
app.get("/api/cases", async (req, res) => {
  try {
    const { featured } = req.query;
    const query = featured === "true" ? { featured: true } : {};
    const cases = await CaseStudy.find(query);
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch case studies" });
  }
});

// Get Testimonials
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// Get Ratings
app.get("/api/ratings", async (req, res) => {
  try {
    const ratings = await Rating.find({});
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

// Get Clients
app.get("/api/clients", async (req, res) => {
  try {
    const clients = await Client.find({});
    // Return array of strings to match front-end format easily
    res.json(clients.map(c => c.name));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// Get FAQs
app.get("/api/faqs", async (req, res) => {
  try {
    const faqs = await Faq.find({});
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

// Get Open Roles
app.get("/api/roles", async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch open roles" });
  }
});

// Get Benefits
app.get("/api/benefits", async (req, res) => {
  try {
    const benefits = await Benefit.find({});
    res.json(benefits);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch benefits" });
  }
});

// Get Offices
app.get("/api/offices", async (req, res) => {
  try {
    const offices = await Office.find({});
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offices" });
  }
});

// --- POST API ENDPOINTS (FORMS) ---

// Submit Contact Form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, company, country, message } = req.body;

    if (!name || !email || !company || !country || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, company, country, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Contact request submitted successfully", data: newContact });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit contact request" });
  }
});

// Submit Job Application
app.post("/api/apply", async (req, res) => {
  try {
    const { name, email, role, resume, message } = req.body;

    if (!name || !email || !role || !resume) {
      return res.status(400).json({ error: "Name, email, role and resume details are required" });
    }

    const newApplication = new Application({ name, email, role, resume, message });
    await newApplication.save();

    res.status(201).json({ success: true, message: "Job application submitted successfully", data: newApplication });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit job application" });
  }
});

// --- SUBMISSION INSPECTION ENDPOINTS (Optional but great for admin verification) ---

// View Contact Submissions
app.get("/api/contacts", async (req, res) => {
  try {
    const submissions = await Contact.find({}).sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error("Contacts error:", error.message);
    res.status(500).json({ error: "Failed to fetch contact submissions", detail: error.message });
  }
});

// View Job Applications
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error("Applications error:", error.message);
    res.status(500).json({ error: "Failed to fetch job applications", detail: error.message });
  }
});

// Admin Authentication
app.post("/api/admin/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "admin@supportstudio.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (email === adminEmail && password === adminPassword) {
      res.json({
        success: true,
        token: "sst_secure_session_token_from_backend_hash_192837",
        message: "Authentication successful",
      });
    } else {
      res.status(401).json({ error: "Invalid email or security code" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal authentication error" });
  }
});

// Admin Token Verification
app.get("/api/admin/verify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const validToken = "sst_secure_session_token_from_backend_hash_192837";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (token === validToken) {
    res.json({ success: true, admin: "Portal Admin" });
  } else {
    res.status(401).json({ error: "Invalid or expired session token" });
  }
});

// Record page visit
app.post("/api/analytics/visit", async (req, res) => {
  try {
    const { path, referrer } = req.body;
    const userAgent = req.headers["user-agent"];
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!path) {
      return res.status(400).json({ error: "Path is required" });
    }

    const newVisit = new Visit({ path, userAgent, ip, referrer });
    await newVisit.save();

    res.status(201).json({ success: true, data: newVisit });
  } catch (error) {
    res.status(500).json({ error: "Failed to log visit" });
  }
});

// View visitor analytics
app.get("/api/analytics/visits", async (req, res) => {
  try {
    const visits = await Visit.find({}).sort({ timestamp: -1 }).limit(1000);
    res.json(visits);
  } catch (error) {
    console.error("Visits error:", error.message);
    res.status(500).json({ error: "Failed to fetch visits", detail: error.message });
  }
});

// Root check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Nexora Enterprise Backend API is active and running!" });
});

// Health check endpoint — shows DB connection status
app.get("/api/health", (req, res) => {
  try {
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    const dbState = states[mongoose.connection.readyState] || "unknown";
    res.json({
      status: "ok",
      db: dbState,
      env: {
        mongoUri: process.env.MONGO_URI ? "SET" : "NOT SET",
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Health check failed: " + error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
