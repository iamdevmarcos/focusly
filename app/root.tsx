import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import i18n from "./i18n/config";
import { FocuslyProvider } from "./context/focusly-context";
import { Toaster } from "sonner";
import { NotificationsProvider } from "./context/notifications-context";
import { useEffect } from "react";
import { KbarActionsProvider } from "./context/kbar-actions-context";

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
  { rel: "stylesheet", href: "/styles/sonner.css" },
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language || "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/images/logo.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/images/logo.png" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Focusly" />

        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/images/logo.png" />

        <meta
          name="description"
          content="A modern and easy-to-use Pomodoro to help you get things done as planned. Focusly is your productivity companion."
        />
        <meta
          name="keywords"
          content="Pomodoro, Productivity, Task Management, Focusly, Get Things Done, Time Management"
        />
        <meta name="author" content="Your Name or Company" />
        <link rel="canonical" href="https://yourwebsite.com" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Focusly — Get Things Done, as Planned. 🔥"
        />
        <meta
          property="og:description"
          content="A modern and easy-to-use Pomodoro to help you get things done as planned."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:site_name" content="Focusly" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Focusly — Get Things Done, as Planned. 🔥"
        />
        <meta
          name="twitter:description"
          content="A modern and easy-to-use Pomodoro to help you get things done as planned."
        />
        <meta name="twitter:image" content="/images/logo.png" />
        <meta name="twitter:site" content="@yourhandle" />

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
    <NotificationsProvider>
      <FocuslyProvider>
        <KbarActionsProvider>
          <Outlet />
        </KbarActionsProvider>
      </FocuslyProvider>
    </NotificationsProvider>
  );
}
