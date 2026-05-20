import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchContactSubmissions,
  fetchJobApplications,
  fetchVisits,
  verifyAdminToken,
} from "@/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart3,
  Users,
  Inbox,
  Briefcase,
  LogOut,
  Globe,
  Clock,
  Eye,
  Search,
  CheckCircle,
  FileText,
  MousePointerClick,
  Smartphone,
  Laptop,
  Server,
  HelpCircle,
  Download,
} from "lucide-react";
import sstLogo from "@/assets/SST.svg";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Support Studio Admin" },
    ],
  }),
  component: AdminDashboard,
});

type TabType = "overview" | "contacts" | "careers" | "visits";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [contacts, setContacts] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filters & Searches
  const [contactSearch, setContactSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [visitSearch, setVisitSearch] = useState("");

  // Details Modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Authentication check — verified against backend
  useEffect(() => {
    const token = localStorage.getItem("sst_admin_token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      navigate({ to: "/admin/login" });
      return;
    }
    verifyAdminToken(token)
      .then(() => {
        // token is valid, proceed to load data
        loadData();
      })
      .catch(() => {
        localStorage.removeItem("sst_admin_token");
        toast.error("Session expired. Please login again.");
        navigate({ to: "/admin/login" });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [cData, aData, vData] = await Promise.all([
        fetchContactSubmissions(),
        fetchJobApplications(),
        fetchVisits(),
      ]);
      setContacts(Array.isArray(cData) ? cData : []);
      setApplications(Array.isArray(aData) ? aData : []);
      setVisits(Array.isArray(vData) ? vData : []);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
      toast.error("Error loading server metrics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("sst_admin_token");
    toast.success("Signed out successfully.");
    setTimeout(() => {
      navigate({ to: "/admin/login" });
    }, 800);
  };

  // Process data for charts
  const getPageViewsByPath = () => {
    const paths: Record<string, number> = {};
    visits.forEach((v) => {
      paths[v.path] = (paths[v.path] || 0) + 1;
    });
    return Object.entries(paths)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const getDeviceShare = () => {
    let mobile = 0;
    let desktop = 0;
    let other = 0;
    visits.forEach((v) => {
      const ua = (v.userAgent || "").toLowerCase();
      if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
        mobile++;
      } else if (ua.includes("windows") || ua.includes("macintosh") || ua.includes("linux")) {
        desktop++;
      } else {
        other++;
      }
    });

    // Handle edge case if no visits logged yet
    if (visits.length === 0) {
      return [
        { name: "Desktop", value: 1, color: "#2d8ec5" },
        { name: "Mobile", value: 0, color: "#30cdb0" },
        { name: "Other", value: 0, color: "#a5a5a5" },
      ];
    }

    return [
      { name: "Desktop", value: desktop, color: "#2d8ec5" },
      { name: "Mobile", value: mobile, color: "#30cdb0" },
      { name: "Other", value: other, color: "#6366f1" },
    ];
  };

  const getTrafficOverTime = () => {
    const hours: Record<string, number> = {};
    // Populate last 7 days or hour groups
    visits.slice(0, 100).forEach((v) => {
      const date = new Date(v.timestamp);
      const key = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      hours[key] = (hours[key] || 0) + 1;
    });

    return Object.entries(hours)
      .map(([time, value]) => ({ time, value }))
      .reverse();
  };

  const filteredContacts = contacts.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
      (c.message || "").toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredApps = applications.filter(
    (a) =>
      (a.name || "").toLowerCase().includes(appSearch.toLowerCase()) ||
      (a.email || "").toLowerCase().includes(appSearch.toLowerCase()) ||
      (a.role || "").toLowerCase().includes(appSearch.toLowerCase())
  );

  const filteredVisits = visits.filter(
    (v) =>
      (v.path || "").toLowerCase().includes(visitSearch.toLowerCase()) ||
      (v.ip || "").toLowerCase().includes(visitSearch.toLowerCase()) ||
      (v.userAgent || "").toLowerCase().includes(visitSearch.toLowerCase())
  );

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      <Toaster position="top-right" theme="dark" richColors />

      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/8 bg-surface/30 backdrop-blur-xl flex flex-col shrink-0 md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-white/6">
          <Link to="/" className="flex items-center gap-2">
            <img src={sstLogo} alt="Support Studio Logo" className="h-6 w-auto" />
          </Link>
          <div className="md:hidden">
            <button
              onClick={handleSignOut}
              className="p-2 text-muted-foreground hover:text-red transition"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeTab === "overview"
                ? "bg-primary/10 text-cyan border-l-2 border-cyan"
                : "text-muted-foreground hover:text-foreground hover:bg-white/4"
            }`}
          >
            <BarChart3 className="h-4 w-4" /> System Overview
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeTab === "contacts"
                ? "bg-primary/10 text-cyan border-l-2 border-cyan"
                : "text-muted-foreground hover:text-foreground hover:bg-white/4"
            }`}
          >
            <Inbox className="h-4 w-4" /> Form Submissions
            {contacts.length > 0 && (
              <span className="ml-auto bg-cyan/20 text-cyan text-xs font-semibold px-2 py-0.5 rounded-full">
                {contacts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("careers")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeTab === "careers"
                ? "bg-primary/10 text-cyan border-l-2 border-cyan"
                : "text-muted-foreground hover:text-foreground hover:bg-white/4"
            }`}
          >
            <Briefcase className="h-4 w-4" /> Job Applications
            {applications.length > 0 && (
              <span className="ml-auto bg-indigo/20 text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                {applications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("visits")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeTab === "visits"
                ? "bg-primary/10 text-cyan border-l-2 border-cyan"
                : "text-muted-foreground hover:text-foreground hover:bg-white/4"
            }`}
          >
            <Users className="h-4 w-4" /> Visitor Traffic
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/6 hidden md:block">
          <div className="flex items-center gap-3 px-3 py-2 mb-4 bg-white/4 rounded-xl">
            <div className="h-8 w-8 rounded-full bg-cyan/20 flex items-center justify-center font-mono text-cyan text-sm font-bold">
              A
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold truncate">Portal Admin</div>
              <div className="text-[10px] text-muted-foreground truncate">admin@supportstudio.com</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Space */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/6 mb-8">
          <div>
            <h1 className="text-3xl font-display font-semibold tracking-tight uppercase">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "contacts" && "Contact Submissions"}
              {activeTab === "careers" && "Job Applications"}
              {activeTab === "visits" && "Visitor Analytics"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTab === "overview" && "Real-time metrics, form submissions and traffic flows."}
              {activeTab === "contacts" && "Inquiries submitted via the site contact forms."}
              {activeTab === "careers" && "Candidates applying for open roles at Support Studio."}
              {activeTab === "visits" && "Pageviews, user agent devices and origin IP logging."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold bg-white/6 hover:bg-white/10 transition border border-white/8 cursor-pointer"
            >
              Refresh Data
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/20 transition"
            >
              View Live Website
            </Link>
          </div>
        </header>

        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan border-t-transparent" />
              <div className="text-sm text-muted-foreground font-mono">Syncing metrics...</div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Total Page Views",
                      val: visits.length,
                      icon: Eye,
                      desc: "Recorded page logs",
                      color: "text-cyan bg-cyan/5 border-cyan/10",
                    },
                    {
                      label: "Contact Inquiries",
                      val: contacts.length,
                      icon: Inbox,
                      desc: "Completed inquiries",
                      color: "text-indigo-400 bg-indigo/5 border-indigo/10",
                    },
                    {
                      label: "Job Applicants",
                      val: applications.length,
                      icon: Briefcase,
                      desc: "Job requests",
                      color: "text-emerald-400 bg-emerald/5 border-emerald/10",
                    },
                    {
                      label: "Unique Visitors",
                      val: new Set(visits.map((v) => v.ip)).size,
                      icon: Globe,
                      desc: "Distinct Client IPs",
                      color: "text-purple-400 bg-purple/5 border-purple/10",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`border rounded-2xl p-6 backdrop-blur bg-surface/30 relative overflow-hidden ${s.color}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          {s.label}
                        </span>
                        <s.icon className="h-5 w-5 opacity-60" />
                      </div>
                      <div className="mt-4 text-3xl font-display font-semibold tracking-tight">{s.val}</div>
                      <div className="mt-1 text-[10px] text-muted-foreground">{s.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Charts section */}
                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Traffic Flow */}
                  <div className="lg:col-span-8 border border-white/8 bg-surface/30 backdrop-blur rounded-2xl p-6">
                    <h3 className="text-sm font-semibold tracking-tight mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cyan" /> Traffic Pattern (Recent Activity)
                    </h3>
                    <div className="h-64">
                      {getTrafficOverTime().length === 0 ? (
                        <div className="h-full flex items-center justify-center text-xs text-muted-foreground font-mono">
                          Waiting for site traffic...
                        </div>
                      ) : isMounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={getTrafficOverTime()}>
                            <defs>
                              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-cyan, #30cdb0)" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="var(--color-cyan, #30cdb0)" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="time"
                              stroke="#666"
                              fontSize={10}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis
                              stroke="#666"
                              fontSize={10}
                              tickLine={false}
                              axisLine={false}
                            />
                            <Tooltip
                              contentStyle={{
                                background: "#0a0a0c",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "12px",
                                fontSize: "12px",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="value"
                              name="Views"
                              stroke="#30cdb0"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorVisits)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-muted-foreground font-mono">
                          Loading chart...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Device share */}
                  <div className="lg:col-span-4 border border-white/8 bg-surface/30 backdrop-blur rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight mb-4 flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-indigo-400" /> Device Distribution
                      </h3>
                      <div className="h-48 flex justify-center items-center">
                        {isMounted ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={getDeviceShare()}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {getDeviceShare().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  background: "#0a0a0c",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                  borderRadius: "12px",
                                  fontSize: "10px",
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="text-xs text-muted-foreground font-mono">Loading chart...</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      {getDeviceShare().map((d) => (
                        <div key={d.name} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                            <span className="text-muted-foreground">{d.name}</span>
                          </div>
                          <span className="font-semibold font-mono">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Popular Pages & Recent Logs */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Popular Pages */}
                  <div className="border border-white/8 bg-surface/30 backdrop-blur rounded-2xl p-6">
                    <h3 className="text-sm font-semibold tracking-tight mb-4 flex items-center gap-2">
                      <MousePointerClick className="h-4 w-4 text-emerald-400" /> Popular Page Paths
                    </h3>
                    <div className="space-y-4">
                      {getPageViewsByPath().length === 0 ? (
                        <div className="text-xs text-muted-foreground font-mono">No logs found yet.</div>
                      ) : (
                        getPageViewsByPath().map((path, idx) => {
                          const total = visits.length || 1;
                          const pct = Math.round((path.count / total) * 100);
                          return (
                            <div key={path.name} className="space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="font-mono truncate max-w-xs">{path.name}</span>
                                <span className="font-semibold text-muted-foreground">
                                  {path.count} views ({pct}%)
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-white/4 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-cyan rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Recent Activity Alert */}
                  <div className="border border-white/8 bg-surface/30 backdrop-blur rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight mb-4">Latest Submissions</h3>
                      <div className="space-y-3">
                        {contacts.slice(0, 3).map((c) => (
                          <div key={c._id} className="flex gap-3 text-xs bg-white/4 p-3 rounded-xl">
                            <div className="h-6 w-6 rounded-full bg-cyan/15 text-cyan flex items-center justify-center shrink-0">
                              <Inbox className="h-3 w-3" />
                            </div>
                            <div className="overflow-hidden">
                              <div className="font-semibold truncate">{c.name} ({c.company})</div>
                              <div className="text-[10px] text-muted-foreground truncate">{c.email}</div>
                              <div className="text-[10px] text-muted-foreground mt-1 line-clamp-1 italic">"{c.message}"</div>
                            </div>
                          </div>
                        ))}
                        {contacts.length === 0 && (
                          <div className="text-xs text-muted-foreground font-mono">No contact submissions found.</div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("contacts")}
                      className="mt-6 w-full text-center text-xs font-semibold text-cyan hover:underline"
                    >
                      View All Submissions →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Search Bar */}
                <div className="relative group max-w-md">
                  <Search className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none h-full w-4 text-muted-foreground group-focus-within:text-cyan transition-colors" />
                  <input
                    type="text"
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    placeholder="Search by name, email, company, message content..."
                    className="block w-full rounded-2xl pl-11 pr-4 py-2.5 bg-white/4 border border-white/8 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  />
                </div>

                {/* Submissions Table */}
                <div className="border border-white/8 bg-surface/20 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/8 bg-white/4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          <th className="p-4">Contact Info</th>
                          <th className="p-4">Company & Country</th>
                          <th className="p-4">Message Summary</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/6">
                        {filteredContacts.map((c) => (
                          <tr key={c._id} className="hover:bg-white/2 transition">
                            <td className="p-4">
                              <div className="font-semibold text-foreground">{c.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{c.email}</div>
                            </td>
                            <td className="p-4">
                              <div>{c.company}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{c.country}</div>
                            </td>
                            <td className="p-4 max-w-xs">
                              <p className="truncate text-muted-foreground">{c.message}</p>
                            </td>
                            <td className="p-4 text-xs text-muted-foreground font-mono">
                              {new Date(c.submittedAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => setSelectedItem({ type: "contact", item: c })}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/6 hover:bg-white/10 text-xs font-medium transition cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5" /> View Full
                              </button>
                            </td>
                          </tr>
                        ))}

                        {filteredContacts.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground font-mono">
                              No matching form submissions found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Careers Tab */}
            {activeTab === "careers" && (
              <motion.div
                key="careers"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Search Bar */}
                <div className="relative group max-w-md">
                  <Search className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none h-full w-4 text-muted-foreground group-focus-within:text-cyan transition-colors" />
                  <input
                    type="text"
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    placeholder="Search candidate name, email, target role..."
                    className="block w-full rounded-2xl pl-11 pr-4 py-2.5 bg-white/4 border border-white/8 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  />
                </div>

                {/* Applications Table */}
                <div className="border border-white/8 bg-surface/20 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/8 bg-white/4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          <th className="p-4">Candidate</th>
                          <th className="p-4">Target Role</th>
                          <th className="p-4">Resume / CV</th>
                          <th className="p-4">Applied Date</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/6">
                        {filteredApps.map((a) => (
                          <tr key={a._id} className="hover:bg-white/2 transition">
                            <td className="p-4">
                              <div className="font-semibold text-foreground">{a.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{a.email}</div>
                            </td>
                            <td className="p-4 font-medium text-cyan">{a.role}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2 text-xs max-w-[200px] truncate bg-white/4 px-3 py-1.5 rounded-lg border border-white/6">
                                <FileText className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
                                <span className="truncate">{a.resume}</span>
                              </div>
                            </td>
                            <td className="p-4 text-xs text-muted-foreground font-mono">
                              {new Date(a.appliedAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => setSelectedItem({ type: "career", item: a })}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/6 hover:bg-white/10 text-xs font-medium transition cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5" /> Inspect
                              </button>
                            </td>
                          </tr>
                        ))}

                        {filteredApps.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground font-mono">
                              No matching job applications found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Visitor Traffic Tab */}
            {activeTab === "visits" && (
              <motion.div
                key="visits"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Search Bar */}
                <div className="relative group max-w-md">
                  <Search className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none h-full w-4 text-muted-foreground group-focus-within:text-cyan transition-colors" />
                  <input
                    type="text"
                    value={visitSearch}
                    onChange={(e) => setVisitSearch(e.target.value)}
                    placeholder="Search by path, IP address, user agent..."
                    className="block w-full rounded-2xl pl-11 pr-4 py-2.5 bg-white/4 border border-white/8 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  />
                </div>

                {/* Visitor Logs Table */}
                <div className="border border-white/8 bg-surface/20 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/8 bg-white/4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          <th className="p-4">IP Address</th>
                          <th className="p-4">Target Path</th>
                          <th className="p-4">User Agent / Browser</th>
                          <th className="p-4">Referrer</th>
                          <th className="p-4">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/6 font-mono text-xs">
                        {filteredVisits.map((v) => (
                          <tr key={v._id} className="hover:bg-white/2 transition">
                            <td className="p-4 font-semibold text-cyan">{v.ip}</td>
                            <td className="p-4 text-foreground truncate max-w-xs">{v.path}</td>
                            <td className="p-4 text-muted-foreground max-w-xs truncate">
                              {v.userAgent}
                            </td>
                            <td className="p-4 text-muted-foreground truncate max-w-[150px]">
                              {v.referrer || "Direct"}
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {new Date(v.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}

                        {filteredVisits.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground">
                              No matching visitor logs found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Details Dialog / Inspector Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg overflow-hidden border border-white/8 bg-surface p-8 rounded-3xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/6 pb-4">
                <h3 className="text-lg font-display font-semibold tracking-tight uppercase">
                  {selectedItem.type === "contact" ? "Submission Detail" : "Applicant Review"}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="mt-6 space-y-6 text-sm">
                {selectedItem.type === "contact" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</div>
                        <div className="mt-1 font-semibold break-words">{selectedItem.item.name}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</div>
                        <div className="mt-1 font-semibold text-cyan break-all">{selectedItem.item.email}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Company</div>
                        <div className="mt-1 font-semibold break-words">{selectedItem.item.company}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Country</div>
                        <div className="mt-1 font-semibold break-words">{selectedItem.item.country}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Submitted Message</div>
                      <div className="mt-2 bg-white/4 p-4 rounded-2xl border border-white/6 text-muted-foreground leading-relaxed whitespace-pre-line italic">
                        "{selectedItem.item.message}"
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Candidate</div>
                        <div className="mt-1 font-semibold break-words">{selectedItem.item.name}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Target Role</div>
                        <div className="mt-1 font-semibold text-indigo-400 break-words">{selectedItem.item.role}</div>
                      </div>
                      <div className="col-span-2 min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</div>
                        <div className="mt-1 font-semibold text-cyan break-all">{selectedItem.item.email}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Resume / Portfolio Detail</div>
                      <div className="mt-2 bg-white/4 p-4 rounded-2xl border border-white/6 text-muted-foreground leading-relaxed break-all">
                        {selectedItem.item.resume}
                      </div>
                    </div>

                    {selectedItem.item.message && (
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Cover Message</div>
                        <div className="mt-2 bg-white/4 p-4 rounded-2xl border border-white/6 text-muted-foreground leading-relaxed whitespace-pre-line italic">
                          "{selectedItem.item.message}"
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex justify-end gap-3 border-t border-white/6 pt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-full px-5 py-2.5 text-xs font-semibold bg-white/6 hover:bg-white/10 transition cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
