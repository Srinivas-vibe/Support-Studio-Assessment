# Support Studio — Enterprise Digital Transformation Platform
> Technical & Operational Documentation (Client-Ready)

Welcome to the documentation for **Support Studio** (also referred to under backend services as **Nexora**). Support Studio is a production-grade enterprise platform engineered to showcase capabilities in Generative AI, cloud platform engineering, cybersecurity, and data analytics. 

This document provides a comprehensive overview of the architecture, features, user roles, installation steps, and API configurations.

---

## 1. Project Overview & Architecture

Support Studio is built using a modern decoupled architecture, separating the client-side user experience from the data-persistence and analytics services.

```mermaid
graph TD
    subgraph Client-Side (Front-end)
        V[Visitor Web Portal - Port 8081]
        A[Admin Dashboard - Port 8081]
    end

    subgraph Server-Side (back-end)
        API[Express API Gateway - Port 5000]
    end

    subgraph Data Layer
        DB[(MongoDB Database)]
    end

    V -->|Submit Forms / Page Views| API
    A -->|Auth / Read Submissions & Logs| API
    API <--> DB
```

### Key Technical Specs
* **Front-end**: Built on **TanStack Start** (Vite + React 19 + TypeScript) utilizing Tailwind CSS and Framer Motion for high-fidelity animations.
* **back-end**: Powered by **Node.js** and **Express**, providing RESTful services, analytical endpoints, and administrative authentication.
* **Database**: **MongoDB** (using Mongoose ODM) to handle document collections.

---

## 2. Setup & Installation Guide

To configure and run the application locally on your Windows environment, follow these instructions step-by-step.

### Prerequisites

Ensure you have the following installed on your system:
1. **Node.js** (Recommended: v18+ or v20 LTS) — [Download Node.js](https://nodejs.org/)
2. **MongoDB Community Server** — [Download MongoDB](https://www.mongodb.com/try/download/community) (Make sure the MongoDB service is running locally on port `27017`).

---

### Step-by-Step Installation

#### Step 1: Extract the Zip & Explore Structure
Extract the provided project zip file. The resulting folder structure should look like this:
```
Assessment-with/
├── back-end/         # Express API & DB schemas
└── Front-end/        # TanStack Start App (React & Vite)
```

#### Step 2: Set Up and Run the back-end

1. Open your terminal (Command Prompt, PowerShell, or Git Bash) and navigate to the `back-end` directory:
   ```bash
   cd back-end
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. **Database Seeding**: Run the database seeder to populate the MongoDB database with initial enterprise content (such as services, offices, stats, capabilities, case studies, and FAQs):
   ```bash
   npm run seed
   ```
   *Verify that you see the message: `Database seeded successfully!` in the terminal.*
4. Start the backend API server:
   * **Production Start**:
     ```bash
     npm run start
     ```
   * **Development Start (with Nodemon automatic reload)**:
     ```bash
     npm run dev
     ```
   *The server runs by default on `http://localhost:5000`.*

#### Step 3: Set Up and Run the Front-end

1. Open a new terminal window and navigate to the `Front-end` directory:
   ```bash
   cd Front-end
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite server:
   ```bash
   npm run dev
   ```
4. Access the portal by navigating to the following URL in your web browser:
   * **Visitor Portal & Admin Login**: [http://localhost:8081](http://localhost:8081)

---

## 3. Detailed User Roles & Capabilities

The platform defines two major user roles, each with distinct interfaces and access privileges.

### Role A: The Visitor (Client-Facing Portal)
The visitor role represents external users, prospective enterprise clients, and job candidates. They interact with the public pages, submit information, and explore capabilities.

#### Key Visitor Pages & Interactive Features:
1. **Landing Page (`/`)**: Displays the main corporate pitch, client portfolios, key metrics, client logos (Lufthansa, HSBC, BNY Mellon, etc.), and overall value propositions.
2. **Services (`/services`)**: Showcases specialized domains like *AI & Generative Intelligence* and *Cybersecurity* (fetched dynamically from the MongoDB database).
3. **Portfolio/Case Studies (`/portfolio`)**: Interactive showcase of real-world client deployments (e.g., migrating BNY Mellon records, accelerating Pfizer trials).
4. **Testimonials (`/testimonials`)**: Live feedback quotes from corporate CIOs and CTOs alongside customer satisfaction (CSAT) metrics.
5. **FAQ Page (`/faq`)**: Interactive accordions structured by category (Engagements, Delivery, Security) to answer prospective clients' questions.
6. **Contact Page & Form (`/contact`)**: Allows visitors to submit inquiries specifying name, email, company, country, and message. Submissions are saved securely to MongoDB.
7. **Careers Portal (`/careers`)**: Displays active job openings and allows candidates to upload resume URLs and submit job applications.
8. **Automated Analytics Tracking**: Whenever a visitor browses public pages, the platform automatically logs the visit (page path, user-agent, anonymous IP group) to the backend database to feed the admin charts.

---

### Role B: The Admin (Administrative Control Center)
The admin role is designed for operations, HR, and marketing teams to monitor traffic, review applications, and view customer inquiries.

* **Admin Login Route**: [http://localhost:8081/admin/login](http://localhost:8081/admin/login)
* **Default Administrative Credentials**:
  * **Email**: `admin@supportstudio.com`
  * **Password**: `admin123`
  * *(These can be configured via environment variables `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the backend)*

#### Key Admin Dashboard Sections:
Once logged in, the admin token is securely stored in local storage (`sst_admin_token`) and validated with every page transition. The dashboard is divided into four tabs:

1. **System Overview Tab**:
   * **Real-time Metrics**: Displays totals for page views, contact inquiries, job applications, and unique visitor IPs.
   * **Traffic Pattern Chart**: An interactive Area Chart visualizing traffic patterns over time.
   * **Device Distribution Chart**: A Pie Chart showcasing the device types (Desktop, Mobile, or Other) based on incoming browser user-agents.
   * **Popular Page Paths**: Ranked list of the most visited pages with percentage-based progress bars.
   * **Latest Submissions Grid**: A quick preview cards section showing the most recent client contacts.
2. **Form Submissions Tab**:
   * Displays all messages submitted from the contact page in an structured grid table.
   * Includes a dynamic search bar to search by name, email, company, or message content.
   * **"View Full" Modal**: Opens an overlay window presenting the complete submission details (date, name, email, company, country, and the full message).
3. **Job Applications Tab**:
   * Tabulates all candidate profiles submitted through the careers portal.
   * Displays candidate name, email, applied role, and application date.
   * Provides a link to review the candidate's Resume/CV.
   * **"Inspect" Modal**: Allows administrative users to read additional cover messages left by the candidate.
4. **Visitor Traffic Tab**:
   * Houses raw analytics logs recorded by visitor traffic.
   * Displays IP addresses, requested paths, user-agents, referrers, and precise timestamps.
   * Features a search input to track particular IPs or user actions.

---

## 4. API Endpoints Reference

The backend API is listening on port `5000` and offers the following REST endpoints:

### Public Fetching Endpoints (GET)
* `/api/services` - Fetches list of core services.
* `/api/capabilities` - Fetches technical capabilities.
* `/api/stats` - Fetches organizational metrics.
* `/api/cases` - Fetches case studies (supports filter `?featured=true`).
* `/api/testimonials` - Fetches corporate client reviews.
* `/api/ratings` - Fetches CSAT scores and NPS.
* `/api/clients` - Fetches client list.
* `/api/faqs` - Fetches FAQ items.
* `/api/roles` - Fetches open employment positions.
* `/api/benefits` - Fetches employee benefits.
* `/api/offices` - Fetches physical office locations.

### Form Submissions Endpoints (POST)
* `/api/contact` - Accepts `{ name, email, company, country, message }` to log client inquiries.
* `/api/apply` - Accepts `{ name, email, role, resume, message }` to log candidate applications.
* `/api/analytics/visit` - Logs page visits, capturing `{ path, referrer }`.

### Admin Endpoints (Protected)
* `/api/admin/login` (POST) - Validates admin credentials and issues a secure session token.
* `/api/admin/verify` (GET) - Validates active administrative session tokens.
* `/api/contacts` (GET) - Fetches list of all contact inquiries (sorted by date desc).
* `/api/applications` (GET) - Fetches all submitted job applications (sorted by date desc).
* `/api/analytics/visits` (GET) - Fetches visitor logs (sorted by timestamp desc, limit 1000).

---

## 5. Troubleshooting & Tips

* **Database Connection Issues**: If the backend crashes with a database connection error, ensure that MongoDB is running. Open Command Prompt and type `net start MongoDB` or check the service configuration.
* **Ports Already In Use**: If ports `8081` or `5000` are already in use, you can modify the ports in `Front-end/vite.config.ts` (port configuration) or define a `PORT` variable in a backend `.env` file.
* **Environment Configuration**: Modify the environment configurations by creating or modifying `.env` files in both directories.
  * *Front-end environment variable*: `VITE_API_URL` (points to the backend API address).
  * *back-end environment variables*: `MONGO_URI`, `PORT`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
