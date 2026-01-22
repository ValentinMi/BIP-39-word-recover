import { SimpleGrid, Text, Box, VStack } from "@chakra-ui/react"
import { SearchResult } from "@/types"
import { ResultCard } from "./ResultCard"
import { ResultCardSkeleton } from "./ResultCardSkeleton"
import { OnboardingPanel } from "./OnboardingPanel"

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
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Searching...
                </Text>
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
                py={10} 
                bg="rgba(13, 21, 38, 0.5)" 
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.06)"
            >
                <Text fontSize="lg" fontWeight="medium" mb={2} color="gray.300">No matches found</Text>
                <Text color="gray.500" fontSize="sm">
                    Try adjusting the filters or lowering the similarity threshold.
                </Text>
            </Box>
        )
    }

    if (!inputWord) {
        return onExampleClick ? (
            <OnboardingPanel onExampleClick={onExampleClick} />
        ) : (
            <Box textAlign="center" py={10}>
                <Text color="gray.500">Start typing to find similar BIP39 words</Text>
            </Box>
        )
    }

    return (
        <VStack align="stretch" gap={4}>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Found {results.length} match{results.length !== 1 ? 'es' : ''}
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {results.map((result, index) => (
                    <ResultCard
                        key={result.word}
                        result={result}
                        inputWord={inputWord}
                        index={index}
                    />
                ))}
            </SimpleGrid>
        </VStack>
    )
}
