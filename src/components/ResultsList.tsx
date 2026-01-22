import { SimpleGrid, Text, Box, VStack, HStack } from "@chakra-ui/react"
import { SearchResult } from "@/types"
import { ResultCard } from "./ResultCard"
import { ResultCardSkeleton } from "./ResultCardSkeleton"
import { OnboardingPanel } from "./OnboardingPanel"
import { Search, AlertCircle } from "lucide-react"

interface ResultsListProps {
    results: SearchResult[];
    inputWord: string;
    isSearching: boolean;
    onExampleClick?: (example: string) => void;
}

export function ResultsList({ results, inputWord, isSearching, onExampleClick }: ResultsListProps) {
    if (isSearching) {
        return (
            <VStack align="stretch" gap={4}>
                <HStack gap={2} fontSize="xs" fontFamily="mono" color="gray.500">
                    <Box
                        w={2}
                        h={2}
                        borderRadius="full"
                        bg="brand.400"
                        className="animate-pulse-glow"
                    />
                    <Text>searching wordlist...</Text>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {[1, 2, 3, 4].map((i) => (
                        <ResultCardSkeleton key={i} />
                    ))}
                </SimpleGrid>
            </VStack>
        )
    }

    if (results.length === 0 && inputWord) {
        return (
            <Box
                textAlign="center"
                py={12}
                px={6}
                bg="rgba(12, 12, 14, 0.5)"
                borderRadius="2xl"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.04)"
                position="relative"
            >
                <VStack gap={4}>
                    <Box
                        w={14}
                        h={14}
                        borderRadius="xl"
                        bg="rgba(239, 68, 68, 0.08)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor="rgba(239, 68, 68, 0.15)"
                    >
                        <AlertCircle size={28} style={{ color: '#EF4444' }} />
                    </Box>
                    <VStack gap={2}>
                        <Text
                            fontSize="lg"
                            fontWeight="600"
                            color="gray.200"
                            fontFamily="heading"
                        >
                            No matches found
                        </Text>
                        <Text color="gray.500" fontSize="sm" maxW="sm">
                            Try adjusting the filters or lowering the similarity threshold
                        </Text>
                    </VStack>
                    <HStack gap={2} fontSize="xs" fontFamily="mono" color="gray.600" mt={2}>
                        <Text>searched for:</Text>
                        <Text color="brand.400" fontWeight="500">&quot;{inputWord}&quot;</Text>
                    </HStack>
                </VStack>
            </Box>
        )
    }

    if (!inputWord) {
        return onExampleClick ? (
            <OnboardingPanel onExampleClick={onExampleClick} />
        ) : (
            <Box
                textAlign="center"
                py={12}
                bg="rgba(12, 12, 14, 0.3)"
                borderRadius="2xl"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.04)"
            >
                <VStack gap={3}>
                    <Search size={24} style={{ color: '#71717A' }} />
                    <Text color="gray.500" fontFamily="mono" fontSize="sm">
                        start typing to find similar BIP39 words
                    </Text>
                </VStack>
            </Box>
        )
    }

    return (
        <VStack align="stretch" gap={4}>
            <HStack justify="space-between" px={1}>
                <HStack gap={2} fontSize="xs" fontFamily="mono" color="gray.500">
                    <Box w={2} h={2} borderRadius="full" bg="green.500" />
                    <Text>
                        found{" "}
                        <Text as="span" color="green.400" fontWeight="600">
                            {results.length}
                        </Text>
                        {" "}match{results.length !== 1 ? 'es' : ''}
                    </Text>
                </HStack>
                <Text fontSize="xs" fontFamily="mono" color="gray.600">
                    query: &quot;{inputWord}&quot;
                </Text>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {results.map((result, index) => (
                    <Box
                        key={result.word}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <ResultCard
                            result={result}
                            index={index}
                        />
                    </Box>
                ))}
            </SimpleGrid>
        </VStack>
    )
}
