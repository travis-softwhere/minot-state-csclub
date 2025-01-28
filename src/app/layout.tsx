import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import "@/styling/globals.css"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

export const metadata: Metadata = {
  title: "MSU CS Club | Minot State University",
  description: "Welcome to the official website of the Minot State University Computer Science Club! Explore events, resources, and opportunities to grow in the world of tech.",
  applicationName: "MSU CS Club",
  generator: "Next.js 14",
  keywords: ["MSU CS Club", "Computer Science", "Minot State University", "Tech Club", "Programming", "Coding", "University Club"],
  authors: [{ name: "MSU CS Club", url: "https://csclub.minotstate.edu" }],
  creator: "Minot State University Computer Science Club",
  publisher: "Minot State University",
  openGraph: {
    title: "MSU CS Club | Minot State University",
    description: "Join the Minot State University Computer Science Club to explore tech, programming, and innovation. Find events, resources, and connect with like-minded peers.",
    url: "https://csclub.minotstate.edu",
    siteName: "MSU CS Club",
    images: [
      {
        url: "https://csclub.minotstate.edu/og-image.png",
        width: 1200,
        height: 630,
        alt: "MSU CS Club Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MSU CS Club | Minot State University",
    description: "Dive into the world of technology with MSU Computer Science Club. Events, resources, and opportunities await!",
    images: ["https://csclub.minotstate.edu/twitter-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}