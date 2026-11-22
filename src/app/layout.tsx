import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundArt } from "@/components/BackgroundArt";
import { SITE } from "@/lib/site";

const display = Space_Grotesk({ variable: "--nf-display", subsets: ["latin"], weight: ["500", "700"] });
const body = Inter({ variable: "--nf-body", subsets: ["latin"] });
const code = JetBrains_Mono({ variable: "--nf-code", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s · ${SITE.shortName}` },
  description: SITE.tagline,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f0" },
    { media: "(prefers-color-scheme: dark)", color: "#111215" },
  ],
};

// Runs before paint so the saved / system theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${code.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 nb-btn bg-gyellow text-on-color"
        >
          Skip to content
        </a>
        <BackgroundArt />
        <Header />
        <main id="main" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
