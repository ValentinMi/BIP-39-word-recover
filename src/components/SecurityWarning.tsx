import { Box, Flex, Text, HStack } from "@chakra-ui/react"
import { AlertTriangle, Lock, Wifi } from "lucide-react"

export function SecurityWarning() {
    return (
        <Box
            bg="rgba(245, 185, 66, 0.05)"
            border="1px solid"
            borderColor="rgba(245, 185, 66, 0.15)"
            borderRadius="xl"
            p={{ base: 4, sm: 5 }}
            position="relative"
            overflow="hidden"
        >
            {/* Diagonal stripes decoration */}
            <Box
                position="absolute"
                top={0}
                right={0}
                w="100px"
                h="100%"
                opacity={0.03}
                background="repeating-linear-gradient(45deg, #F5B942, #F5B942 10px, transparent 10px, transparent 20px)"
                pointerEvents="none"
            />

            <Flex gap={4} align="flex-start">
                <Flex
                    w={10}
                    h={10}
                    bg="rgba(245, 185, 66, 0.1)"
                    borderRadius="lg"
                    justify="center"
                    align="center"
                    flexShrink={0}
                    border="1px solid"
                    borderColor="rgba(245, 185, 66, 0.2)"
                >
                    <AlertTriangle size={20} style={{ color: '#F5B942' }} />
                </Flex>

                <Box flex={1}>
                    <HStack gap={2} mb={2}>
                        <Text
                            fontWeight="700"
                            color="brand.400"
                            fontFamily="heading"
                            fontSize="sm"
                            letterSpacing="wide"
                        >
                            SECURITY NOTICE
                        </Text>
                    </HStack>

                    <Text fontSize="sm" color="gray.300" lineHeight="1.7" mb={3}>
                        Never enter your full 12 or 24-word seed phrase on any website.
                        Only use this tool to check{" "}
                        <Text as="span" fontWeight="600" color="brand.300" className="text-highlight">
                            one word at a time
                        </Text>.
                    </Text>

                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        gap={{ base: 2, sm: 4 }}
                        fontSize="xs"
                        fontFamily="mono"
                        color="gray.500"
                    >
                        <HStack gap={1}>
                            <Lock size={12} />
                            <Text>client-side only</Text>
                        </HStack>
                        <HStack gap={1}>
                            <Wifi size={12} style={{ transform: 'rotate(45deg)' }} />
                            <Text>no network requests</Text>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}
