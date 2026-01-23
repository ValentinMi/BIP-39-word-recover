import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Understanding BIP39 Seed Phrases | BIP39 Word Recovery",
  description:
    "Learn everything about BIP39 seed phrases, mnemonic words, and cryptocurrency wallet security. Educational guide on the 2048 wordlist, checksums, and best practices for protecting your crypto assets.",
  keywords: [
    "BIP39 FAQ",
    "seed phrase guide",
    "mnemonic words explained",
    "crypto wallet security",
    "BIP39 wordlist",
    "seed phrase security",
    "cryptocurrency recovery",
  ],
  openGraph: {
    title: "Understanding BIP39 - Seed Phrase FAQ",
    description:
      "Complete guide to BIP39 seed phrases, mnemonic words, and cryptocurrency wallet security.",
    url: "https://bip39recover.xyz/faq",
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
