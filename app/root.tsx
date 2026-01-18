import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { FocuslyProvider } from "./context/focusly-context";
import { Toaster } from "sonner";
import { NotificationsProvider } from "./context/notifications-context";
import { useEffect } from "react";
import { KbarActionsProvider } from "./context/kbar-actions-context";
import { TasksProvider } from "./context/tasksContext";
import { ThemeProvider } from "./context/theme-context";
import { YoutubeMusicProvider } from "./context/youtube-music-context";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
  },
  { rel: "stylesheet", href: "/styles/sonner.css" },
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png",
  },
];

export async function loader() {
  return json({
    ENV: {
      GOOGLE_CLOUD_CLIENT_ID: process.env.GOOGLE_CLOUD_CLIENT_ID,
      GOOGLE_CLOUD_API_KEY: process.env.GOOGLE_CLOUD_API_KEY,
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('focusly-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored === 'light' ? 'light' : stored === 'dark' ? 'dark' : (prefersDark ? 'dark' : 'light');
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/images/logo.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/images/logo.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/images/logo.png" />

        <meta
          name="description"
          content="A modern, minimalist, and easy-to-use Pomodoro timer to help you get things done as planned."
        />
        <meta
          name="keywords"
          content="Pomodoro, Productivity, Task Management, Focusly, Get Things Done, Time Management"
        />
        <meta name="author" content="SupaWave" />
        <link rel="canonical" href="https://withfocusly.com/" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Focusly — Get Things Done, as Planned. 🔥"
        />
        <meta
          property="og:description"
          content="A modern, minimalist, and easy-to-use Pomodoro timer to help you get things done as planned."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://withfocusly.com/" />
        <meta property="og:site_name" content="Focusly" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Focusly — Get Things Done, as Planned. 🔥"
        />
        <meta
          name="twitter:description"
          content="A modern, minimalist, and easy-to-use Pomodoro timer to help you get things done as planned."
        />
        <meta name="twitter:image" content="/images/logo.png" />
        <meta name="twitter:site" content="@focuslybr" />
        <script
          async
          src="https://unpkg.com/@material-tailwind/html@latest/scripts/tooltip.js"
        ></script>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
        <script src="https://apis.google.com/js/api.js"></script>

        <Meta />
        <Links />
      </head>

      <body className="font-sans">
        <Toaster position="top-center" richColors />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.log("Falha ao registrar o Service Worker:", error);
        });
    }
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
        }}
      />
      <ThemeProvider>
        <NotificationsProvider>
          <TasksProvider>
            <FocuslyProvider>
              <KbarActionsProvider>
                <YoutubeMusicProvider>
                  <Outlet />
                </YoutubeMusicProvider>
              </KbarActionsProvider>
            </FocuslyProvider>
          </TasksProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </>
  );
}
