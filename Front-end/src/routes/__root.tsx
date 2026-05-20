import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-display font-semibold text-gradient">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Signal lost</h2>
        <p className="mt-3 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="mt-8 inline-flex items-center rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again, or head back home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >Try again</button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Support Studio — Enterprise Digital Transformation, AI & Cloud" },
      { name: "description", content: "Support Studio partners with Fortune 500 leaders to engineer the future of business through AI, cloud, cybersecurity and intelligent enterprise transformation." },
      { property: "og:title", content: "Support Studio — Enterprise Digital Transformation" },
      { property: "og:description", content: "AI, cloud, and intelligent transformation for the world's most ambitious enterprises." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <VisitTracker />
      </div>
    </QueryClientProvider>
  );
}

function VisitTracker() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    // Avoid logging admin actions as general visitor traffic
    if (pathname.startsWith("/admin")) return;

    fetch("http://localhost:5000/api/analytics/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || "",
      }),
    }).catch((err) => console.error("Failed to log visit:", err));
  }, [pathname]);

  return null;
}
