import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bip39recover.xyz"),
  title: "BIP39 Word Recovery Tool - Fix Misspelled Seed Phrase Words",
  description:
    "Free, secure tool to recover misspelled BIP39 seed phrase words. Runs entirely in your browser with no data sent to servers. Find the correct mnemonic word from typos using multiple similarity algorithms.",
  keywords: [
    "BIP39",
    "seed phrase",
    "recovery tool",
    "mnemonic",
    "crypto wallet",
    "word recovery",
    "typo fix",
    "bitcoin",
    "ethereum",
  ],
  authors: [{ name: "BIP39 Recover" }],
  openGraph: {
    title: "BIP39 Word Recovery Tool",
    description:
      "Recover misspelled seed phrase words securely in your browser. No data sent to servers.",
    url: "https://bip39recover.xyz",
    siteName: "BIP39 Word Recovery Tool",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIP39 Word Recovery Tool",
    description:
      "Recover misspelled seed phrase words securely in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} antialiased`}>
        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
