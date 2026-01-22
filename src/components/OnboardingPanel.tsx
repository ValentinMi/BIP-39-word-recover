import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react"
import { Lightbulb } from "lucide-react"

interface OnboardingPanelProps {
    onExampleClick: (example: string) => void;
}

const EXAMPLES = [
    { typo: "abanbon", correct: "abandon" },
    { typo: "fysical", correct: "physical" },
    { typo: "teh", correct: "the" },
];

export function OnboardingPanel({ onExampleClick }: OnboardingPanelProps) {
    return (
        <Box
            textAlign="center"
            py={8}
            px={6}
            bg="rgba(13, 21, 38, 0.5)"
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.06)"
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "200px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent)",
            }}
        >
            <VStack gap={4}>
                <HStack gap={2} color="brand.500">
                    <Lightbulb size={20} />
                    <Text fontWeight="semibold">Try an example</Text>
                </HStack>

                <Text color="gray.400" fontSize="sm" maxW="sm">
                    Click a common typo below to see how the tool finds the correct BIP39 word
                </Text>

                <HStack gap={3} wrap="wrap" justify="center">
                    {EXAMPLES.map(({ typo, correct }) => (
                        <Button
                            key={typo}
                            size="sm"
                            variant="outline"
                            bg="rgba(0, 217, 255, 0.05)"
                            borderColor="rgba(0, 217, 255, 0.2)"
                            color="brand.400"
                            onClick={() => onExampleClick(typo)}
                            _hover={{
                                bg: "rgba(0, 217, 255, 0.15)",
                                borderColor: "brand.500",
                                boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)"
                            }}
                            transition="all 0.2s ease"
                        >
                            {typo}
                            <Text as="span" color="gray.500" fontWeight="normal" ml={1}>
                                → {correct}
                            </Text>
                        </Button>
                    ))}
                </HStack>

                <Text color="gray.500" fontSize="xs" mt={2}>
                    Or start typing your own misspelled word above
                </Text>
            </VStack>
        </Box>
    )
}
