"use client"

import { useState } from "react"
import { Box, Card, HStack, Text, Badge, IconButton, Flex, VStack, Collapsible } from "@chakra-ui/react"
import { Copy, ChevronDown, ChevronUp, Check } from "lucide-react"
import { SearchResult, CharDiff } from "@/types"
import { toaster } from "@/components/ui/toaster"

interface ResultCardProps {
    result: SearchResult;
    index?: number;
}

const ALGORITHM_LABELS = {
    dice: { label: "DICE", color: "brand", weight: 0.8 },
    hamming: { label: "HAMMING", color: "gray", weight: 0.6 },
    phonetic: { label: "PHONETIC", color: "purple", weight: 0.7 },
    swap: { label: "SWAP", color: "yellow", weight: 0.95 }
} as const;

const DIFF_COLORS = {
    match: undefined,
    insert: "rgba(34, 197, 94, 0.25)",
    delete: "rgba(239, 68, 68, 0.25)",
    change: "rgba(245, 185, 66, 0.25)"
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
                    px={diff.type !== 'match' ? '2px' : undefined}
                    fontWeight={diff.type !== 'match' ? '600' : undefined}
                >
                    {diff.char}
                </Text>
            ))}
        </>
    );
}

export function ResultCard({ result, index }: ResultCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [justCopied, setJustCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result.word);
            setJustCopied(true);
            setTimeout(() => setJustCopied(false), 2000);
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

    const getBadgeStyles = (type: string) => {
        switch (type) {
            case 'exact':
                return { bg: "rgba(34, 197, 94, 0.15)", color: "green.400", borderColor: "rgba(34, 197, 94, 0.3)" };
            case 'swap':
                return { bg: "rgba(250, 204, 21, 0.15)", color: "yellow.400", borderColor: "rgba(250, 204, 21, 0.3)" };
            case 'phonetic':
                return { bg: "rgba(168, 85, 247, 0.15)", color: "purple.400", borderColor: "rgba(168, 85, 247, 0.3)" };
            case 'dice':
                return { bg: "rgba(245, 185, 66, 0.15)", color: "brand.400", borderColor: "rgba(245, 185, 66, 0.3)" };
            default:
                return { bg: "rgba(113, 113, 122, 0.15)", color: "gray.400", borderColor: "rgba(113, 113, 122, 0.3)" };
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 0.9) return '#22C55E';
        if (score >= 0.7) return '#F5B942';
        return '#EF4444';
    };

    const badgeStyles = getBadgeStyles(result.matchType);

    return (
        <Card.Root
            variant="subtle"
            size="sm"
            bg="rgba(12, 12, 14, 0.6)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.06)"
            _hover={{
                transform: "translateY(-2px)",
                borderColor: "rgba(245, 185, 66, 0.2)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(245, 185, 66, 0.05)"
            }}
            transition="all 0.2s ease"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            className="card-hover"
        >
            {/* Top accent line */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="2px"
                bg={`linear-gradient(90deg, transparent, ${getScoreColor(result.score)}40, transparent)`}
            />

            <Card.Body p={{ base: 4, sm: 5 }}>
                <Flex justify="space-between" align="flex-start" gap={{ base: 2, sm: 4 }}>
                    <Box flex={1} minW={0}>
                        <Flex
                            direction={{ base: "column", sm: "row" }}
                            align={{ base: "flex-start", sm: "center" }}
                            gap={{ base: 1.5, sm: 3 }}
                            mb={2}
                        >
                            <Text
                                fontSize={{ base: "lg", sm: "xl" }}
                                fontWeight="700"
                                letterSpacing="wide"
                                fontFamily="mono"
                            >
                                <HighlightedWord charDiffs={result.charDiffs} word={result.word} />
                            </Text>
                            <Badge
                                variant="outline"
                                size="sm"
                                px={2}
                                py={0.5}
                                borderRadius="md"
                                fontSize="2xs"
                                fontWeight="600"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                fontFamily="mono"
                                {...badgeStyles}
                                border="1px solid"
                            >
                                {result.matchType}
                            </Badge>
                        </Flex>

                        <Flex wrap="wrap" gap={{ base: 2, sm: 4 }} fontSize="xs" fontFamily="mono">
                            <HStack gap={1}>
                                <Text color="gray.600">score:</Text>
                                <Text color={getScoreColor(result.score)} fontWeight="600">
                                    {(result.score * 100).toFixed(0)}%
                                </Text>
                            </HStack>
                            {result.matchType === 'phonetic' && (
                                <HStack gap={1}>
                                    <Box w={1} h={1} borderRadius="full" bg="purple.400" />
                                    <Text color="purple.400">sound match</Text>
                                </HStack>
                            )}
                            {result.matchType === 'swap' && (
                                <HStack gap={1}>
                                    <Box w={1} h={1} borderRadius="full" bg="yellow.400" />
                                    <Text color="yellow.400">swap detected</Text>
                                </HStack>
                            )}
                        </Flex>
                    </Box>

                    <HStack gap={2} flexShrink={0}>
                        {index !== undefined && index < 9 && (
                            <Text
                                display={{ base: "none", md: "block" }}
                                fontSize="xs"
                                color="gray.600"
                                bg="rgba(28, 28, 31, 0.8)"
                                px={2}
                                py={1}
                                borderRadius="md"
                                fontFamily="mono"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.06)"
                            >
                                <Text as="span" fontFamily="system-ui">⌘</Text>{index + 1}
                            </Text>
                        )}
                        <IconButton
                            aria-label="Copy word"
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            color={justCopied ? "green.400" : "gray.500"}
                            _hover={{ color: "brand.400", bg: "rgba(245, 185, 66, 0.1)" }}
                            transition="all 0.2s ease"
                        >
                            {justCopied ? <Check size={16} /> : <Copy size={16} />}
                        </IconButton>
                    </HStack>
                </Flex>

                <Collapsible.Root open={isExpanded} onOpenChange={(e) => setIsExpanded(e.open)}>
                    <Collapsible.Trigger asChild>
                        <HStack
                            gap={1}
                            mt={3}
                            cursor="pointer"
                            color="gray.600"
                            _hover={{ color: "gray.400" }}
                            fontSize="xs"
                            fontFamily="mono"
                            transition="color 0.2s ease"
                        >
                            <Text>{isExpanded ? 'hide' : 'show'} details</Text>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </HStack>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <VStack
                            align="stretch"
                            gap={3}
                            mt={4}
                            pt={4}
                            borderTop="1px solid"
                            borderColor="rgba(255, 255, 255, 0.06)"
                        >
                            {(Object.keys(ALGORITHM_LABELS) as Array<keyof typeof ALGORITHM_LABELS>).map((key) => {
                                const score = result.algorithmScores[key];
                                const { label, color, weight } = ALGORITHM_LABELS[key];

                                return (
                                    <HStack key={key} gap={{ base: 2, sm: 3 }} fontSize="xs" fontFamily="mono">
                                        <Text w={{ base: "60px", sm: "80px" }} color="gray.500" letterSpacing="wider" fontSize={{ base: "2xs", sm: "xs" }}>{label}</Text>
                                        <Box
                                            flex={1}
                                            bg="rgba(255, 255, 255, 0.04)"
                                            borderRadius="full"
                                            h="6px"
                                            overflow="hidden"
                                            position="relative"
                                            minW="60px"
                                        >
                                            <Box
                                                h="full"
                                                bg={`${color}.400`}
                                                w={`${score * 100}%`}
                                                transition="width 0.4s ease-out"
                                                borderRadius="full"
                                                position="relative"
                                                _after={{
                                                    content: '""',
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                                    borderRadius: "full",
                                                }}
                                            />
                                        </Box>
                                        <Text w={{ base: "28px", sm: "35px" }} textAlign="right" color="gray.500" fontSize={{ base: "2xs", sm: "xs" }}>
                                            {(score * 100).toFixed(0)}%
                                        </Text>
                                        <Text display={{ base: "none", sm: "block" }} w="40px" textAlign="right" color="gray.700" fontSize="2xs">
                                            x{weight}
                                        </Text>
                                    </HStack>
                                );
                            })}
                            <Text fontSize="2xs" color="gray.700" mt={1} fontStyle="italic" display={{ base: "none", sm: "block" }}>
                                {`// final score = max(algorithm_score * weight)`}
                            </Text>
                        </VStack>
                    </Collapsible.Content>
                </Collapsible.Root>
            </Card.Body>
        </Card.Root>
    )
}
