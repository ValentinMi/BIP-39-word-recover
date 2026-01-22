"use client"

import { useEffect, useCallback } from "react"
import { Container, VStack, Heading, Text, Box, Flex, HStack, Kbd } from "@chakra-ui/react"
import { SearchInput } from "@/components/SearchInput"
import { SecurityWarning } from "@/components/SecurityWarning"
import { FilterControls } from "@/components/FilterControls"
import { ResultsList } from "@/components/ResultsList"
import { useWordSearch } from "@/lib/hooks/useWordSearch"
import { toaster } from "@/components/ui/toaster"
import { Lock, Keyboard } from "lucide-react"
import { BitmediaAd } from "@/components/BitmediaAd"

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
      bg="linear-gradient(180deg, #0a0e17 0%, #0d1526 50%, #0a1628 100%)"
      py={10}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(ellipse at 50% 0%, rgba(0, 217, 255, 0.08) 0%, transparent 50%)",
        pointerEvents: "none"
      }}
    >
      <Container maxW="container.md" position="relative">
        <VStack gap={8} align="stretch">
          <VStack gap={3} textAlign="center">
            <Flex
              justify="center"
              align="center"
              w={16}
              h={16}
              bg="linear-gradient(135deg, #00D9FF 0%, #0097A7 100%)"
              borderRadius="2xl"
              color="white"
              mb={2}
              boxShadow="0 0 40px rgba(0, 217, 255, 0.4), 0 0 80px rgba(0, 217, 255, 0.2)"
              border="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Lock size={28} />
            </Flex>
            <Heading 
              size="3xl" 
              fontWeight="bold" 
              letterSpacing="tight"
              bgGradient="to-r"
              gradientFrom="white"
              gradientTo="gray.400"
              bgClip="text"
            >
              BIP39 Word Recover
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="lg">
              Find the correct seed phrase word from a typo or misspelling.
              <Text as="span" color="brand.400" fontWeight="medium"> Secure, client-side only.</Text>
            </Text>
          </VStack>

          <SecurityWarning />

          <Box
            bg="rgba(13, 21, 38, 0.8)"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="rgba(0, 217, 255, 0.15)"
            shadow="0 4px 30px rgba(0, 0, 0, 0.3)"
            backdropFilter="blur(20px)"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.5), transparent)",
            }}
          >
            <VStack gap={6}>
              <SearchInput
                value={input}
                onChange={setInput}
                isLoading={isSearching}
                isTyping={isTyping}
              />

              <FilterControls
                filters={filters}
                onChange={setFilters}
              />
            </VStack>
          </Box>

          <ResultsList
            results={results}
            inputWord={input}
            isSearching={isSearching}
            onExampleClick={setInput}
          />

          <HStack justify="center" gap={4} color="gray.500" fontSize="xs">
            <HStack gap={1}>
              <Keyboard size={12} />
              <Text>Shortcuts:</Text>
            </HStack>
            <HStack gap={1}>
              <Kbd size="sm" bg="whiteAlpha.100" borderColor="whiteAlpha.200">Esc</Kbd>
              <Text>Clear</Text>
            </HStack>
            <HStack gap={1}>
              <Kbd size="sm" bg="whiteAlpha.100" borderColor="whiteAlpha.200">⌘1-9</Kbd>
              <Text>Copy result</Text>
            </HStack>
          </HStack>

          <Box display={{ base: "none", md: "block" }}>
            <BitmediaAd size="728x90" />
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            <BitmediaAd size="320x50" />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
