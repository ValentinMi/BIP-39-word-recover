import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
  other: {
    "bitmedia-site-verification": "391960743a17787c2a75dec0ac2ae62f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
