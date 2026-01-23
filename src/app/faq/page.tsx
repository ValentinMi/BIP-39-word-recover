import Link from "next/link"
import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  HStack,
  Flex,
  Grid,
  Code,
} from "@chakra-ui/react"
import {
  BookOpen,
  Key,
  AlertTriangle,
  Hash,
  Layers,
  Lock,
  HelpCircle,
} from "lucide-react"
import { FAQItem } from "@/components/FAQItem"

interface SectionProps {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
  delay?: number
}

function Section({ number, icon, title, description, children, delay = 0 }: SectionProps) {
  return (
    <Box
      className="animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
      opacity={0}
      css={{ animationFillMode: "forwards" }}
    >
      <HStack gap={4} mb={6}>
        <Flex
          w={12}
          h={12}
          bg="linear-gradient(135deg, rgba(245, 185, 66, 0.15) 0%, rgba(245, 185, 66, 0.05) 100%)"
          border="1px solid"
          borderColor="rgba(245, 185, 66, 0.25)"
          borderRadius="xl"
          align="center"
          justify="center"
          color="brand.400"
          flexShrink={0}
        >
          {icon}
        </Flex>
        <Box>
          <HStack gap={2} mb={1}>
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="brand.400"
              fontWeight="600"
              letterSpacing="wider"
            >
              {number}
            </Text>
          </HStack>
          <Heading
            size="lg"
            fontFamily="heading"
            fontWeight="700"
            letterSpacing="-0.02em"
            color="white"
          >
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.500" mt={1}>
            {description}
          </Text>
        </Box>
      </HStack>
      <VStack gap={3} align="stretch" pl={{ base: 0, md: 16 }}>
        {children}
      </VStack>
    </Box>
  )
}

export default function FAQPage() {
  const sampleWords = [
    "abandon", "ability", "able", "about", "above",
    "absent", "absorb", "abstract", "absurd", "abuse",
    "access", "accident"
  ]

  return (
    <Box
      minH="100vh"
      bg="#09090B"
      py={{ base: 6, md: 12 }}
      position="relative"
      className="grid-pattern"
    >
      {/* Ambient glow */}
      <Box
        position="absolute"
        top="-200px"
        left="50%"
        transform="translateX(-50%)"
        w="800px"
        h="600px"
        bg="radial-gradient(ellipse at center, rgba(245, 185, 66, 0.06) 0%, transparent 70%)"
        pointerEvents="none"
        filter="blur(60px)"
      />

      <Container maxW="container.md" position="relative">
        <VStack gap={{ base: 10, md: 16 }} align="stretch">
          {/* Hero */}
          <VStack gap={4} textAlign="center" className="animate-slide-up">
            <Flex
              w={16}
              h={16}
              bg="linear-gradient(135deg, rgba(245, 185, 66, 0.15) 0%, rgba(245, 185, 66, 0.05) 100%)"
              border="1px solid"
              borderColor="rgba(245, 185, 66, 0.3)"
              borderRadius="2xl"
              align="center"
              justify="center"
              color="brand.400"
              className="animate-glow-pulse"
            >
              <BookOpen size={28} strokeWidth={1.5} />
            </Flex>

            <VStack gap={2}>
              <Heading
                size={{ base: "2xl", md: "3xl" }}
                fontFamily="heading"
                fontWeight="800"
                letterSpacing="-0.02em"
              >
                <Text as="span" className="gradient-text">
                  Understanding
                </Text>{" "}
                <Text as="span" className="gradient-text-gold">
                  BIP39
                </Text>
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.400"
                maxW="lg"
                lineHeight="relaxed"
              >
                Everything you need to know about seed phrases, mnemonic words, and how to protect your crypto assets.
              </Text>
            </VStack>
          </VStack>

          {/* Section 01: What is BIP39 */}
          <Section
            number="01"
            icon={<Key size={22} />}
            title="What is BIP39?"
            description="The standard behind your seed phrase"
            delay={100}
          >
            <FAQItem question="What does BIP39 stand for?" defaultOpen>
              <VStack align="stretch" gap={3}>
                <Text>
                  <strong>BIP39</strong> stands for <em>Bitcoin Improvement Proposal 39</em>. It&apos;s a standard that defines how cryptocurrency wallets generate and use mnemonic phrases (also called seed phrases or recovery phrases).
                </Text>
                <Text>
                  Published in 2013, BIP39 has become the universal standard used by virtually all modern cryptocurrency wallets, including MetaMask, Ledger, Trezor, Trust Wallet, and many others.
                </Text>
              </VStack>
            </FAQItem>

            <FAQItem question="How does BIP39 work?">
              <VStack align="stretch" gap={3}>
                <Text>
                  BIP39 works in three main steps:
                </Text>
                <Box as="ol" pl={5} css={{ "& li": { marginBottom: "8px" } }}>
                  <li><strong>Random number generation:</strong> Your wallet generates a random number (entropy) of 128-256 bits.</li>
                  <li><strong>Word conversion:</strong> This entropy is converted into a sequence of 12-24 words from a predefined list of 2048 words.</li>
                  <li><strong>Key derivation:</strong> These words are used to generate your master private key, from which all your wallet addresses are derived.</li>
                </Box>
                <Text color="gray.500" fontSize="xs">
                  The mathematical relationship ensures that anyone with your seed phrase can regenerate your exact wallet and access your funds.
                </Text>
              </VStack>
            </FAQItem>

            <FAQItem question="Why exactly 2048 words?">
              <VStack align="stretch" gap={3}>
                <Text>
                  The number 2048 is equal to 2¹¹ (2 to the power of 11). This means each word represents exactly <strong>11 bits</strong> of entropy.
                </Text>
                <Box
                  bg="rgba(9, 9, 11, 0.8)"
                  border="1px solid"
                  borderColor="rgba(245, 185, 66, 0.15)"
                  borderRadius="lg"
                  p={4}
                  fontFamily="mono"
                  fontSize="sm"
                >
                  <Text color="gray.500" mb={2}>{`// Word count and security level`}</Text>
                  <Text>12 words = 128 bits = 2¹²⁸ combinations</Text>
                  <Text>24 words = 256 bits = 2²⁵⁶ combinations</Text>
                </Box>
                <Text>
                  This design makes it computationally impossible to guess a seed phrase through brute force attacks.
                </Text>
              </VStack>
            </FAQItem>
          </Section>

          {/* Section 02: The Wordlist */}
          <Section
            number="02"
            icon={<Hash size={22} />}
            title="The BIP39 Wordlist"
            description="2048 carefully selected words"
            delay={200}
          >
            <FAQItem question="What words are in the BIP39 list?" defaultOpen>
              <VStack align="stretch" gap={4}>
                <Text>
                  The English BIP39 wordlist contains exactly <strong>2048 words</strong>, carefully selected with specific criteria:
                </Text>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "6px" } }}>
                  <li>Each word is 3-8 characters long</li>
                  <li>The first 4 characters uniquely identify each word</li>
                  <li>Similar-looking words are avoided (no &quot;woman&quot; and &quot;women&quot;)</li>
                  <li>All words are common English words, easy to spell</li>
                </Box>
                <Text fontSize="sm" color="gray.500">
                  Here&apos;s a sample of the first few words (alphabetically):
                </Text>
                <Grid
                  templateColumns="repeat(4, 1fr)"
                  gap={2}
                >
                  {sampleWords.map((word, i) => (
                    <Code
                      key={word}
                      bg="rgba(245, 185, 66, 0.08)"
                      color="brand.400"
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                      fontFamily="mono"
                      textAlign="center"
                      className="animate-fade-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {word}
                    </Code>
                  ))}
                </Grid>
              </VStack>
            </FAQItem>

            <FAQItem question="Are there wordlists in other languages?">
              <VStack align="stretch" gap={3}>
                <Text>
                  Yes! BIP39 officially supports wordlists in multiple languages:
                </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={2} fontSize="sm">
                  {[
                    "English", "Japanese", "Korean", "Spanish",
                    "Chinese (Simplified)", "Chinese (Traditional)",
                    "French", "Italian", "Czech", "Portuguese"
                  ].map((lang) => (
                    <HStack key={lang} gap={2}>
                      <Box w={1.5} h={1.5} borderRadius="full" bg="brand.400" />
                      <Text>{lang}</Text>
                    </HStack>
                  ))}
                </Grid>
                <Text color="gray.500" fontSize="xs" mt={2}>
                  However, English remains the most widely used and compatible across wallets.
                </Text>
              </VStack>
            </FAQItem>

            <FAQItem question="What if I misspell a word?">
              <VStack align="stretch" gap={3}>
                <Text>
                  A misspelled word will cause wallet recovery to <strong>fail completely</strong>. The wallet software will either:
                </Text>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "6px" } }}>
                  <li>Reject the phrase as invalid (if the word isn&apos;t in the wordlist)</li>
                  <li>Generate a completely different wallet (if the typo happens to be another valid word)</li>
                </Box>
                <Box
                  bg="rgba(245, 185, 66, 0.08)"
                  border="1px solid"
                  borderColor="rgba(245, 185, 66, 0.2)"
                  borderRadius="lg"
                  p={4}
                >
                  <HStack gap={2} mb={2}>
                    <AlertTriangle size={16} color="#F5B942" />
                    <Text fontWeight="600" color="brand.400" fontSize="sm">
                      This is why our tool exists
                    </Text>
                  </HStack>
                  <Text fontSize="sm">
                    Our recovery tool helps you find the correct BIP39 word when you&apos;ve made a typo. It uses multiple algorithms to suggest the most likely intended word.
                  </Text>
                </Box>
              </VStack>
            </FAQItem>
          </Section>

          {/* Section 03: Seed Phrase Security */}
          <Section
            number="03"
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L4 6v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            }
            title="Seed Phrase Security"
            description="Protecting your master key"
            delay={300}
          >
            <FAQItem question="Why is my seed phrase so important?" defaultOpen>
              <VStack align="stretch" gap={3}>
                <Text>
                  Your seed phrase is essentially the <strong>master key</strong> to all your cryptocurrency. Anyone who has it can:
                </Text>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "6px" } }}>
                  <li>Access all your wallet addresses</li>
                  <li>Transfer all your funds to their own wallet</li>
                  <li>View your complete transaction history</li>
                </Box>
                <Text>
                  Unlike a password, a seed phrase <strong>cannot be changed or reset</strong>. If compromised, your only option is to create a new wallet and transfer your assets.
                </Text>
              </VStack>
            </FAQItem>

            <FAQItem question="How should I store my seed phrase?">
              <VStack align="stretch" gap={3}>
                <Text fontWeight="600" color="green.400">Do:</Text>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "6px" } }}>
                  <li>Write it on paper and store in a secure location</li>
                  <li>Use a metal backup (fire/water resistant)</li>
                  <li>Consider splitting it across multiple locations</li>
                  <li>Store copies in a bank safe deposit box</li>
                </Box>

                <Text fontWeight="600" color="red.400" mt={2}>Don&apos;t:</Text>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "6px" } }}>
                  <li>Store it digitally (screenshots, notes apps, cloud)</li>
                  <li>Email it to yourself</li>
                  <li>Take a photo of it</li>
                  <li>Enter it on any website (except official wallet recovery)</li>
                  <li>Share it with anyone, ever</li>
                </Box>
              </VStack>
            </FAQItem>

            <FAQItem question="Can someone guess my seed phrase?">
              <VStack align="stretch" gap={3}>
                <Text>
                  No. The mathematics make it practically impossible:
                </Text>
                <Box
                  bg="rgba(9, 9, 11, 0.8)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.08)"
                  borderRadius="lg"
                  p={4}
                  fontFamily="mono"
                  fontSize="sm"
                >
                  <Text color="gray.500" mb={2}>{`// 12-word phrase possibilities`}</Text>
                  <Text>2048¹² = 5,444,517,870,735,015,415,413,993,718,908,291,383,296</Text>
                  <Text color="gray.500" mt={3} mb={2}>{`// That's approximately`}</Text>
                  <Text color="brand.400">5.4 × 10³⁹ combinations</Text>
                </Box>
                <Text fontSize="sm" color="gray.500">
                  Even if you could check 1 trillion phrases per second, it would take longer than the age of the universe to try them all.
                </Text>
              </VStack>
            </FAQItem>
          </Section>

          {/* Section 04: Using This Tool */}
          <Section
            number="04"
            icon={<HelpCircle size={22} />}
            title="Using This Tool"
            description="How our recovery tool helps"
            delay={400}
          >
            <FAQItem question="Is it safe to enter my seed phrase here?" defaultOpen>
              <VStack align="stretch" gap={3}>
                <Box
                  bg="rgba(34, 197, 94, 0.1)"
                  border="1px solid"
                  borderColor="rgba(34, 197, 94, 0.3)"
                  borderRadius="lg"
                  p={4}
                >
                  <HStack gap={2} mb={2}>
                    <Lock size={16} color="#22C55E" />
                    <Text fontWeight="600" color="green.400" fontSize="sm">
                      100% Client-Side Processing
                    </Text>
                  </HStack>
                  <Text fontSize="sm">
                    This tool runs <strong>entirely in your browser</strong>. No data is ever sent to any server. You can verify this by:
                  </Text>
                </Box>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "6px" } }}>
                  <li>Disconnecting from the internet and using the tool offline</li>
                  <li>Checking the network tab in your browser&apos;s developer tools</li>
                  <li>Reviewing the open-source code on GitHub</li>
                </Box>
                <Text color="gray.500" fontSize="sm">
                  However, you should only enter <strong>one word at a time</strong>, never your complete seed phrase.
                </Text>
              </VStack>
            </FAQItem>

            <FAQItem question="How does the word matching work?">
              <VStack align="stretch" gap={3}>
                <Text>
                  Our tool uses multiple algorithms to find the best matches:
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {[
                    { name: "Levenshtein", desc: "Counts character insertions, deletions, and substitutions" },
                    { name: "Hamming", desc: "Compares characters at same positions" },
                    { name: "Phonetic", desc: "Matches words that sound similar" },
                    { name: "Adjacent Swap", desc: "Detects keyboard typos (transposed letters)" },
                  ].map((algo) => (
                    <Box
                      key={algo.name}
                      bg="rgba(20, 20, 22, 0.8)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.06)"
                      borderRadius="lg"
                      p={3}
                    >
                      <Text fontWeight="600" fontSize="sm" color="white" mb={1}>
                        {algo.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {algo.desc}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </VStack>
            </FAQItem>

            <FAQItem question="What if I can't find my word?">
              <VStack align="stretch" gap={3}>
                <Text>
                  If our tool doesn&apos;t find a good match, try these steps:
                </Text>
                <Box as="ol" pl={5} css={{ "& li": { marginBottom: "8px" } }}>
                  <li>Double-check your handwriting - common confusions include: <Code bg="whiteAlpha.100" px={1}>l/1</Code>, <Code bg="whiteAlpha.100" px={1}>O/0</Code>, <Code bg="whiteAlpha.100" px={1}>S/5</Code></li>
                  <li>Try different interpretations of unclear letters</li>
                  <li>Enable all filter options to see more potential matches</li>
                  <li>Consider if you might have written in a different language wordlist</li>
                </Box>
                <Text color="gray.500" fontSize="sm">
                  Remember: the correct word <strong>must</strong> be one of the 2048 BIP39 words. There are no exceptions.
                </Text>
              </VStack>
            </FAQItem>
          </Section>

          {/* Section 05: Advanced Topics */}
          <Section
            number="05"
            icon={<Layers size={22} />}
            title="Advanced Topics"
            description="For the technically curious"
            delay={500}
          >
            <FAQItem question="What is a passphrase (25th word)?">
              <VStack align="stretch" gap={3}>
                <Text>
                  BIP39 supports an optional <strong>passphrase</strong> (sometimes called the &quot;25th word&quot;) that adds an extra layer of security:
                </Text>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "6px" } }}>
                  <li>It can be any string (not limited to the 2048 wordlist)</li>
                  <li>Different passphrases create completely different wallets</li>
                  <li>Provides plausible deniability (decoy wallets)</li>
                </Box>
                <Box
                  bg="rgba(245, 185, 66, 0.08)"
                  border="1px solid"
                  borderColor="rgba(245, 185, 66, 0.2)"
                  borderRadius="lg"
                  p={4}
                >
                  <Text fontSize="sm">
                    <strong>Warning:</strong> If you use a passphrase and forget it, your funds are <strong>permanently lost</strong>. There is no recovery mechanism.
                  </Text>
                </Box>
              </VStack>
            </FAQItem>

            <FAQItem question="What is the checksum?">
              <VStack align="stretch" gap={3}>
                <Text>
                  The last word(s) in your seed phrase include a <strong>checksum</strong> - a verification code that helps detect errors:
                </Text>
                <Box
                  bg="rgba(9, 9, 11, 0.8)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.08)"
                  borderRadius="lg"
                  p={4}
                  fontFamily="mono"
                  fontSize="sm"
                >
                  <Text color="gray.500" mb={2}>{`// Checksum bits per phrase length`}</Text>
                  <Text>12 words → 4 checksum bits</Text>
                  <Text>15 words → 5 checksum bits</Text>
                  <Text>18 words → 6 checksum bits</Text>
                  <Text>24 words → 8 checksum bits</Text>
                </Box>
                <Text fontSize="sm" color="gray.500">
                  This is why wallets can tell you if a seed phrase is invalid - the checksum won&apos;t match if any word is wrong.
                </Text>
              </VStack>
            </FAQItem>

            <FAQItem question="What is BIP32/BIP44?">
              <VStack align="stretch" gap={3}>
                <Text>
                  These are related standards that work together with BIP39:
                </Text>
                <Box as="ul" pl={5} css={{ "& li": { marginBottom: "8px" } }}>
                  <li>
                    <strong>BIP32</strong>: Defines Hierarchical Deterministic (HD) wallets - how to derive multiple addresses from a single seed.
                  </li>
                  <li>
                    <strong>BIP44</strong>: Defines the derivation path structure, allowing one seed to manage multiple cryptocurrencies and accounts.
                  </li>
                </Box>
                <Box
                  bg="rgba(9, 9, 11, 0.8)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.08)"
                  borderRadius="lg"
                  p={4}
                  fontFamily="mono"
                  fontSize="xs"
                >
                  <Text color="gray.500" mb={2}>{`// Example derivation path`}</Text>
                  <Text>m / 44&apos; / 60&apos; / 0&apos; / 0 / 0</Text>
                  <Text color="gray.500" mt={2}>
                    purpose / coin_type / account / change / address_index
                  </Text>
                </Box>
              </VStack>
            </FAQItem>
          </Section>

          {/* Footer CTA */}
          <Box
            textAlign="center"
            py={10}
            className="animate-fade-in"
            style={{ animationDelay: "600ms" }}
            opacity={0}
            css={{ animationFillMode: "forwards" }}
          >
            <Text color="gray.500" mb={4}>
              Ready to recover your word?
            </Text>
            <Link href="/">
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                gap={2}
                bg="linear-gradient(135deg, rgba(245, 185, 66, 0.15) 0%, rgba(245, 185, 66, 0.05) 100%)"
                border="1px solid"
                borderColor="rgba(245, 185, 66, 0.3)"
                color="brand.400"
                px={6}
                py={3}
                borderRadius="xl"
                fontWeight="600"
                transition="all 0.2s ease"
                _hover={{
                  bg: "linear-gradient(135deg, rgba(245, 185, 66, 0.25) 0%, rgba(245, 185, 66, 0.1) 100%)",
                  borderColor: "rgba(245, 185, 66, 0.5)",
                  transform: "translateY(-2px)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L4 6v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Use Recovery Tool
              </Box>
            </Link>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
