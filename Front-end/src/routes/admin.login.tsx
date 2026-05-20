import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import { KeyRound, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import sstLogo from "@/assets/SST.svg";
import { loginAdmin } from "@/api";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Support Studio" },
      { name: "description", content: "Access the Support Studio administrator dashboard." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginAdmin(email, password);
      setIsLoading(false);
      localStorage.setItem("sst_admin_token", response.token);
      toast.success("Authentication successful! Loading dashboard...");
      setTimeout(() => {
        navigate({ to: "/admin/dashboard" });
      }, 1000);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || "Invalid administrative credentials.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px] opacity-60 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-indigo/10 blur-[140px] opacity-60 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-cyan/5 blur-[160px] opacity-40" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Sonner toast provider */}
      <Toaster position="top-center" theme="dark" richColors />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Glow border wrapper */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-primary/30 via-cyan/30 to-indigo/30 blur-sm pointer-events-none" />

        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-surface/50 p-8 md:p-10 backdrop-blur-3xl shadow-2xl">
          {/* Logo / Header */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <img src={sstLogo} alt="Support Studio Logo" className="h-9 w-auto" />
            </motion.div>

            
            <h2 className="text-2xl font-display font-semibold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to manage system activities & submissions.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  Admin Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-cyan transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@supportstudio.com"
                    className="block w-full rounded-2xl pl-11 pr-4 py-3 bg-white/4 border border-white/8 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  Security Code
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-cyan transition-colors">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-2xl pl-11 pr-11 py-3 bg-white/4 border border-white/8 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-cyan transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full rounded-2xl py-3.5 text-sm font-semibold text-white shadow-lg overflow-hidden group hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer"
              style={{ background: "var(--gradient-primary)" }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Validating Session..." : "Authorize Access"}
                {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-muted-foreground border-t border-white/6 pt-6">
            Contact your system administrator for access credentials.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
