import { Box, Text, VStack, HStack, Button, Flex } from "@chakra-ui/react"
import { Sparkles, ArrowRight } from "lucide-react"

interface OnboardingPanelProps {
    onExampleClick: (example: string) => void;
}

const EXAMPLES = [
    { typo: "abanbon", correct: "abandon", hint: "missing letter" },
    { typo: "fysical", correct: "physical", hint: "phonetic" },
    { typo: "teh", correct: "the", hint: "swapped" },
    { typo: "witnesss", correct: "witness", hint: "double letter" },
];

export function OnboardingPanel({ onExampleClick }: OnboardingPanelProps) {
    return (
        <Box
            textAlign="center"
            py={10}
            px={6}
            bg="rgba(12, 12, 14, 0.5)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.04)"
            position="relative"
            overflow="hidden"
        >
            {/* Top gradient line */}
            <Box
                position="absolute"
                top={0}
                left="30%"
                right="30%"
                h="1px"
                bg="linear-gradient(90deg, transparent, rgba(245, 185, 66, 0.3), transparent)"
            />

            {/* Background decoration */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="300px"
                h="300px"
                bg="radial-gradient(circle, rgba(245, 185, 66, 0.03) 0%, transparent 70%)"
                pointerEvents="none"
            />

            <VStack gap={6} position="relative">
                {/* Header */}
                <VStack gap={3}>
                    <Flex
                        w={12}
                        h={12}
                        bg="rgba(245, 185, 66, 0.08)"
                        borderRadius="xl"
                        justify="center"
                        align="center"
                        border="1px solid"
                        borderColor="rgba(245, 185, 66, 0.15)"
                    >
                        <Sparkles size={24} style={{ color: '#F5B942' }} />
                    </Flex>
                    <Text
                        fontFamily="heading"
                        fontWeight="700"
                        fontSize="lg"
                        color="gray.200"
                    >
                        Try an example
                    </Text>
                    <Text color="gray.500" fontSize="sm" maxW="sm" lineHeight="1.6">
                        Click a common typo below to see how the tool finds the correct BIP39 word
                    </Text>
                </VStack>

                {/* Example buttons */}
                <VStack gap={3} w="full" maxW="md">
                    {EXAMPLES.map(({ typo, correct, hint }) => (
                        <Button
                            key={typo}
                            w="full"
                            size="lg"
                            variant="outline"
                            bg="rgba(9, 9, 11, 0.6)"
                            borderColor="rgba(255, 255, 255, 0.06)"
                            color="gray.300"
                            onClick={() => onExampleClick(typo)}
                            _hover={{
                                bg: "rgba(245, 185, 66, 0.08)",
                                borderColor: "rgba(245, 185, 66, 0.2)",
                                color: "white",
                                transform: "translateX(4px)"
                            }}
                            transition="all 0.2s ease"
                            justifyContent="space-between"
                            px={5}
                            h={14}
                            borderRadius="xl"
                        >
                            <HStack gap={3}>
                                <Text fontFamily="mono" fontWeight="600" color="brand.400">
                                    {typo}
                                </Text>
                                <ArrowRight size={14} style={{ color: '#71717A' }} />
                                <Text fontFamily="mono" color="green.400">
                                    {correct}
                                </Text>
                            </HStack>
                            <Text
                                fontSize="xs"
                                fontFamily="mono"
                                color="gray.600"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                {hint}
                            </Text>
                        </Button>
                    ))}
                </VStack>

                {/* Footer hint */}
                <Text color="gray.600" fontSize="xs" fontFamily="mono" mt={2}>
                    {`// or start typing your own misspelled word above`}
                </Text>
            </VStack>
        </Box>
    )
}
