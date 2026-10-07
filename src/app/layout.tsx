import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Background3D } from "@/components/Background3D";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.role}`;
const description = profile.summary[0];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  authors: [{ name: profile.name, url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: "Arun Balreddy",
  jobTitle: profile.role,
  url: SITE_URL,
  email: profile.email,
  address: profile.location,
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
  worksFor: {
    "@type": "Organization",
    name: profile.currentRole.company,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Background3D />
        <CustomCursor />
        <SmoothScroll>
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
