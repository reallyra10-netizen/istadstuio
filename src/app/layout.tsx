//layout
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import NavbarComponents from "@/components/layout/NavbarComponents";
import FooterComponents from "@/components/layout/FooterComponents";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://istadstudio.vercel.app"),
  title: {
    template: "%s | ISTAD Studio",
    default: "ISTAD Studio - Watch Movies",
  },
  description: "Browse popular movies, top rated films, and now playing cinema titles with storyline overviews, trailers, and cast information.",
  keywords: ["movies", "cinema", "trending movies", "top rated", "trailers", "netflix style", "istad studio"],
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/icon.png?v=2", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/icon.png?v=2",
  },
  openGraph: {
    title: "ISTAD Studio - Watch Movies Online",
    description: "Discover the best trending movies, top rated films, and trailers online.",
    siteName: "ISTAD Studio",
    images: [
      {
        url: "/Thumbernail.jpg",
        width: 1200,
        height: 630,
        alt: "ISTAD Studio Movie Campaigns",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISTAD Studio - Watch Movies Online",
    description: "Discover the best trending movies, top rated films, and trailers online.",
    images: ["/Thumbernail.jpg"],
  },
};

const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_YnJhdmUtc3VuYmlyZC0yMDc1LmNsZXJrLmFjY291bnRzLmRldiQ";

//root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const inner = (
    <>
      <NavbarComponents />
      <main className="flex-1">
        {children}
      </main>
      <FooterComponents />
    </>
  );

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-screen flex flex-col bg-[#141414] text-white">
        <ClerkProvider publishableKey={clerkPublishableKey}>{inner}</ClerkProvider>
      </body>
    </html>
  );
}
