"use client"

import { useState } from "react"
import { Box, Card, HStack, Text, Badge, IconButton, Flex, VStack, Collapsible } from "@chakra-ui/react"
import { Copy, ChevronDown, ChevronUp } from "lucide-react"
import { SearchResult, CharDiff } from "@/types"
import { toaster } from "@/components/ui/toaster"

interface ResultCardProps {
    result: SearchResult;
    index?: number;
}

const ALGORITHM_LABELS = {
    dice: { label: "Dice", color: "cyan", weight: 0.8 },
    hamming: { label: "Hamming", color: "gray", weight: 0.6 },
    phonetic: { label: "Phonetic", color: "purple", weight: 0.7 },
    swap: { label: "Swap", color: "yellow", weight: 0.95 }
} as const;

const DIFF_COLORS = {
    match: undefined,
    insert: "rgba(16, 185, 129, 0.3)",
    delete: "rgba(239, 68, 68, 0.3)",
    change: "rgba(251, 191, 36, 0.3)"
} as const;

function HighlightedWord({ charDiffs, word }: { charDiffs?: CharDiff[]; word: string }) {
    if (!charDiffs || charDiffs.length === 0) {
        return <>{word}</>;
    }

    return (
        <>
            {charDiffs.map((diff, i) => (
                <Text
                    key={i}
                    as="span"
                    bg={DIFF_COLORS[diff.type]}
                    borderRadius={diff.type !== 'match' ? 'sm' : undefined}
                    px={diff.type !== 'match' ? '1px' : undefined}
                >
                    {diff.char}
                </Text>
            ))}
        </>
    );
}

export function ResultCard({ result, index }: ResultCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result.word);
            toaster.create({
                title: `Copied "${result.word}"`,
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
    };

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'exact': return 'green';
            case 'swap': return 'yellow';
            case 'phonetic': return 'purple';
            case 'dice': return 'cyan';
            default: return 'gray';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 0.9) return '#10B981';
        if (score >= 0.7) return '#FBBF24';
        return '#F87171';
    };

    return (
        <Card.Root
            variant="subtle"
            size="sm"
            bg="rgba(13, 21, 38, 0.6)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.08)"
            _hover={{ 
                transform: "translateY(-2px)", 
                borderColor: "rgba(0, 217, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 217, 255, 0.1)"
            }}
            transition="all 0.2s ease"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
        >
            <Card.Body>
                <Flex justify="space-between" align="center">
                    <Box>
                        <HStack mb={1}>
                            <Text fontSize="xl" fontWeight="bold" letterSpacing="wide">
                                <HighlightedWord charDiffs={result.charDiffs} word={result.word} />
                            </Text>
                            <Badge colorPalette={getBadgeColor(result.matchType)} variant="solid">
                                {result.matchType}
                            </Badge>
                        </HStack>
                        <HStack gap={4}>
                            <Text fontSize="xs" color="gray.500">
                                Score: <Text as="span" color={getScoreColor(result.score)} fontWeight="bold">
                                    {(result.score * 100).toFixed(0)}%
                                </Text>
                            </Text>
                            {result.matchType === 'phonetic' && (
                                <Text fontSize="xs" color="purple.300">Sound match</Text>
                            )}
                            {result.matchType === 'swap' && (
                                <Text fontSize="xs" color="yellow.400">Swap detected</Text>
                            )}
                        </HStack>
                    </Box>

                    <HStack gap={1}>
                        {index !== undefined && index < 9 && (
                            <Text
                                fontSize="xs"
                                color="gray.600"
                                bg="whiteAlpha.100"
                                px={2}
                                py={0.5}
                                borderRadius="md"
                                fontFamily="mono"
                            >
                                ⌘{index + 1}
                            </Text>
                        )}
                        <IconButton
                            aria-label="Copy word"
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                        >
                            <Copy size={16} />
                        </IconButton>
                    </HStack>
                </Flex>

                <Collapsible.Root open={isExpanded} onOpenChange={(e) => setIsExpanded(e.open)}>
                    <Collapsible.Trigger asChild>
                        <HStack
                            gap={1}
                            mt={2}
                            cursor="pointer"
                            color="gray.500"
                            _hover={{ color: "gray.300" }}
                            fontSize="xs"
                        >
                            <Text>Show details</Text>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </HStack>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <VStack align="stretch" gap={2} mt={3} pt={3} borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.08)">
                            {(Object.keys(ALGORITHM_LABELS) as Array<keyof typeof ALGORITHM_LABELS>).map((key) => {
                                const score = result.algorithmScores[key];
                                const { label, color, weight } = ALGORITHM_LABELS[key];

                                return (
                                    <HStack key={key} gap={3} fontSize="xs">
                                        <Text w="70px" color="gray.400">{label}</Text>
                                        <Box flex={1} bg="rgba(255, 255, 255, 0.06)" borderRadius="full" h={2} overflow="hidden">
                                            <Box
                                                h="full"
                                                bg={`${color}.400`}
                                                w={`${score * 100}%`}
                                                transition="width 0.3s"
                                                boxShadow={`0 0 8px var(--chakra-colors-${color}-400)`}
                                            />
                                        </Box>
                                        <Text w="40px" textAlign="right" color="gray.500">
                                            {(score * 100).toFixed(0)}%
                                        </Text>
                                        <Text w="50px" textAlign="right" color="gray.600" fontSize="2xs">
                                            ×{weight}
                                        </Text>
                                    </HStack>
                                );
                            })}
                            <Text fontSize="2xs" color="gray.600" mt={1}>
                                Final score uses the highest weighted algorithm result
                            </Text>
                        </VStack>
                    </Collapsible.Content>
                </Collapsible.Root>
            </Card.Body>
        </Card.Root>
    )
}
