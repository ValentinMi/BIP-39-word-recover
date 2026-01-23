"use client"

import { useEffect, useCallback } from "react"
import Link from "next/link"
import { Container, VStack, Heading, Text, Box, Flex, HStack, Kbd } from "@chakra-ui/react"
import { SearchInput } from "@/components/SearchInput"
import { SecurityWarning } from "@/components/SecurityWarning"
import { FilterControls } from "@/components/FilterControls"
import { ResultsList } from "@/components/ResultsList"
import { useWordSearch } from "@/lib/hooks/useWordSearch"
import { toaster } from "@/components/ui/toaster"
import { Terminal, Keyboard, BookOpen } from "lucide-react"

export default function Home() {
  const {
    input,
    setInput,
    results,
    isSearching,
    isTyping,
    filters,
    setFilters
  } = useWordSearch();

  const copyResult = useCallback(async (index: number) => {
    if (index >= 0 && index < results.length) {
      const word = results[index].word;
      try {
        await navigator.clipboard.writeText(word);
        toaster.create({
          title: `Copied "${word}"`,
          type: "success",
          duration: 2000,
        });
      } catch {
        toaster.create({
          title: "Failed to copy",
          type: "error",
          duration: 2000,
        });
      }
    }
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInput('');
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        copyResult(index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setInput, copyResult]);

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
        bg="radial-gradient(ellipse at center, rgba(245, 185, 66, 0.08) 0%, transparent 70%)"
        pointerEvents="none"
        filter="blur(60px)"
      />

      {/* Side decorations */}
      <Box
        position="fixed"
        left="20px"
        top="50%"
        transform="translateY(-50%)"
        display={{ base: "none", xl: "block" }}
        className="ascii-pattern"
        opacity={0.4}
      >
        {`╔═══╗\n║ B ║\n║ I ║\n║ P ║\n║ 3 ║\n║ 9 ║\n╚═══╝`}
      </Box>

      <Box
        position="fixed"
        right="20px"
        top="50%"
        transform="translateY(-50%)"
        display={{ base: "none", xl: "block" }}
        className="ascii-pattern"
        opacity={0.4}
      >
        {`╔═══╗\n║ 2 ║\n║ 0 ║\n║ 4 ║\n║ 8 ║\n╚═══╝`}
      </Box>

      <Container maxW="container.md" position="relative">
        <VStack gap={{ base: 6, md: 10 }} align="stretch">
          {/* Hero Section */}
          <VStack
            gap={4}
            textAlign="center"
            className="animate-slide-up"
          >
            {/* Logo/Icon */}
            <Flex
              justify="center"
              align="center"
              w={20}
              h={20}
              bg="linear-gradient(135deg, rgba(245, 185, 66, 0.15) 0%, rgba(245, 185, 66, 0.05) 100%)"
              borderRadius="2xl"
              color="brand.400"
              mb={2}
              border="1px solid"
              borderColor="rgba(245, 185, 66, 0.3)"
              position="relative"
              className="animate-glow-pulse"
              _before={{
                content: '""',
                position: "absolute",
                inset: "-1px",
                borderRadius: "2xl",
                background: "linear-gradient(135deg, rgba(245, 185, 66, 0.4), transparent 50%)",
                zIndex: -1,
                filter: "blur(10px)",
              }}
            >
              <svg
                width="36"
                height="36"
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
            </Flex>

            {/* Terminal-style label */}
            <Flex
              wrap="wrap"
              justify="center"
              gap={{ base: 1.5, sm: 2 }}
              fontSize="xs"
              color="gray.500"
              fontFamily="mono"
              className="animate-fade-in delay-1"
            >
              <HStack gap={2}>
                <Terminal size={12} />
                <Text>bip39-recover v1.0</Text>
              </HStack>
              <HStack gap={2}>
                <Box w="1px" h="12px" bg="gray.700" display={{ base: "none", sm: "block" }} />
                <Text color="green.500">secure</Text>
                <Box w="1px" h="12px" bg="gray.700" />
                <Text>client-side</Text>
              </HStack>
            </Flex>

            {/* Main heading */}
            <Heading
              size={{ base: "3xl", md: "4xl" }}
              fontWeight="800"
              letterSpacing="-0.02em"
              fontFamily="heading"
              lineHeight="1.1"
              className="animate-slide-up delay-2"
            >
              <Text as="span" className="gradient-text">
                BIP39 Word
              </Text>
              <br />
              <Text as="span" className="gradient-text-gold">
                Recovery
              </Text>
            </Heading>

            {/* Subtitle */}
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.400"
              maxW="md"
              lineHeight="1.7"
              className="animate-slide-up delay-3"
            >
              Find the correct seed phrase word from a typo or misspelling.
              <Text as="span" display="block" color="brand.400" fontWeight="500" mt={1} fontFamily="mono" fontSize="sm">
                {`// 2048 words indexed`}
              </Text>
            </Text>
          </VStack>

          {/* Security Warning */}
          <Box className="animate-slide-up delay-4">
            <SecurityWarning />
          </Box>

          {/* Main Search Card */}
          <Box
            bg="rgba(12, 12, 14, 0.8)"
            p={{ base: 5, md: 8 }}
            borderRadius="2xl"
            border="1px solid"
            borderColor="rgba(245, 185, 66, 0.1)"
            shadow="0 4px 60px rgba(0, 0, 0, 0.5)"
            backdropFilter="blur(20px)"
            position="relative"
            className="animate-slide-up delay-5"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: "20%",
              right: "20%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(245, 185, 66, 0.4), transparent)",
            }}
          >
            <VStack gap={6}>
              <SearchInput
                value={input}
                onChange={setInput}
                isSearching={isTyping}
              />

              <FilterControls
                filters={filters}
                onChange={setFilters}
              />
            </VStack>
          </Box>

          {/* Results */}
          <Box className="animate-fade-in delay-6">
            <ResultsList
              results={results}
              inputWord={input}
              isSearching={isSearching}
              onExampleClick={setInput}
            />
          </Box>

          {/* Footer with shortcuts */}
          <VStack
            gap={4}
            py={4}
            borderTop="1px solid"
            borderColor="rgba(255, 255, 255, 0.04)"
          >
            {/* Keyboard shortcuts - hidden on mobile */}
            <HStack
              display={{ base: "none", md: "flex" }}
              justify="center"
              gap={6}
              color="gray.600"
              fontSize="xs"
              fontFamily="mono"
            >
              <HStack gap={2}>
                <Keyboard size={12} />
                <Text color="gray.500">shortcuts:</Text>
              </HStack>
              <HStack gap={1}>
                <Kbd
                  size="sm"
                  bg="rgba(28, 28, 31, 0.8)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  color="gray.400"
                  fontFamily="mono"
                >
                  Esc
                </Kbd>
                <Text>clear</Text>
              </HStack>
              <HStack gap={1}>
                <Kbd
                  size="sm"
                  bg="rgba(28, 28, 31, 0.8)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  color="gray.400"
                  fontFamily="mono"
                >
                  <Text as="span" fontFamily="system-ui">⌘</Text>1-9
                </Kbd>
                <Text>copy</Text>
              </HStack>
            </HStack>

            <Link href="/faq" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HStack
                gap={2}
                bg="rgba(245, 185, 66, 0.08)"
                border="1px solid"
                borderColor="rgba(245, 185, 66, 0.2)"
                color="brand.400"
                fontSize="sm"
                fontWeight="500"
                px={5}
                py={2.5}
                borderRadius="full"
                w={{ base: "full", sm: "auto" }}
                justify="center"
                _hover={{
                  bg: "rgba(245, 185, 66, 0.15)",
                  borderColor: "rgba(245, 185, 66, 0.4)",
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s ease"
              >
                <BookOpen size={16} />
                <Text>Learn about BIP39 & seed phrases</Text>
              </HStack>
            </Link>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
