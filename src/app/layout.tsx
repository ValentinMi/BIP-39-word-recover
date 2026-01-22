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
  title: "BIP39 Word Recovery Tool",
  description: "Secure, client-side tool to recover misspelled BIP39 seed phrase words.",
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
